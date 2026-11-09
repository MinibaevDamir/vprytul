<script lang="ts">
// Піксельні SVG макета — одна path із горизонтальних смуг однакової висоти
// (M x y H x V y H x V y Z). Розкладаємо смуги на клітинки один раз на файл.
// cells: x, y, w, h, «розсипаність» клітинки 0…1 — скільки сусідів по хресту
// порожні (0–1 порожніх → 0, усі 4 → 1) — і маска порожніх сусідів, куди
// піксель може зрушити (1 — вгору, 2 — вниз, 4 — вліво, 8 — вправо).
// Шумлять лише розсипані пікселі, щільна маса лишається суцільною, як у макеті.
type Art = { vb: number[]; color: string; cells: Float32Array }

const cache = new Map<string, Promise<Art>>()

function parseArt(svg: string): Art {
  const vb = /viewBox="([^"]+)"/.exec(svg)![1].split(/[\s,]+/).map(Number)
  const tag = /<path\b[^>]*>/.exec(svg)![0]
  const d = / d="([^"]+)"/.exec(tag)![1]
  const color = / fill="([^"]+)"/.exec(tag)?.[1] ?? '#000'

  const rects: number[][] = []
  const re = /M(-?[\d.]+)[ ,](-?[\d.]+)H(-?[\d.]+)V(-?[\d.]+)H(-?[\d.]+)V(-?[\d.]+)Z/g
  let cw = Infinity
  for (let m; (m = re.exec(d)); ) {
    const [x0, y0, x1, y1] = [+m[1], +m[2], +m[3], +m[4]]
    const r = [Math.min(x0, x1), Math.min(y0, y1), Math.abs(x1 - x0), Math.abs(y1 - y0)]
    cw = Math.min(cw, r[2])
    rects.push(r)
  }

  const raw: number[][] = []
  let ch = Infinity
  for (const [x, y, w, h] of rects) {
    const n = Math.max(1, Math.round(w / cw))
    ch = Math.min(ch, h)
    for (let i = 0; i < n; i++) raw.push([x + (i * w) / n, y, w / n, h])
  }

  // сітка клітинок; сусід за межами арту вважається заповненим — там фон
  // продовжується суцільною заливкою (hero, підвал), і туди пікселі не тікають
  const minX = Math.min(...raw.map((c) => c[0]))
  const minY = Math.min(...raw.map((c) => c[1]))
  const col = (c: number[]) => Math.round((c[0] - minX) / cw)
  const row = (c: number[]) => Math.round((c[1] - minY) / ch)
  const maxCol = Math.max(...raw.map(col))
  const maxRow = Math.max(...raw.map(row))
  const filled = new Set(raw.map((c) => row(c) * 65536 + col(c)))
  const has = (r: number, k: number) =>
    r < 0 || k < 0 || r > maxRow || k > maxCol || filled.has(r * 65536 + k)

  const out: number[] = []
  for (const c of raw) {
    const r = row(c)
    const k = col(c)
    const free = [!has(r - 1, k), !has(r + 1, k), !has(r, k - 1), !has(r, k + 1)]
    const empty = free.filter(Boolean).length
    const mask = free.reduce((m, f, i) => (f ? m | (1 << i) : m), 0)
    out.push(c[0], c[1], c[2], c[3], Math.max(0, empty - 1) / 3, mask)
  }
  return { vb, color, cells: new Float32Array(out) }
}

function loadArt(src: string) {
  if (!cache.has(src)) cache.set(src, fetch(src).then((r) => r.text()).then(parseArt))
  return cache.get(src)!
}
</script>

<script setup lang="ts">
// Піксельний декор із легким «шумом»: розсипані пікселі зрідка перескакують
// на сусідню порожню клітинку сітки й повертаються, решта арту нерухома.
// Розмір і положення блоку задає батьківський CSS — canvas малює арт
// розтягнутим на блок (як img) або, з tile, у нативному масштабі з повтором
// по горизонталі (як background repeat-x). Анімується лише у кадрі;
// для prefers-reduced-motion — статичний кадр.
const props = withDefaults(
  defineProps<{
    src: string
    /** фрагмент viewBox [x, y, w, h], якщо потрібна лише частина svg */
    view?: number[]
    tile?: boolean
    /** сила шуму: множник імовірності, що піксель зрушить */
    amount?: number
    /** повернути арт на 180° (як у макеті для однієї з «хмар») */
    flip?: boolean
  }>(),
  { tile: false, amount: 1, flip: false }
)

const rootEl = ref<HTMLElement | null>(null)
const canvasEl = ref<HTMLCanvasElement | null>(null)
const ready = ref(false)

const STRIDE = 6
// шум крокує дискретно, 4 рази на секунду — як повільна піксельна анімація
const TICK_MS = 250
// імовірність за крок: розсипаному пікселю зрушити (у середньому раз на ~17 с)
// і зрушеному — повернутися (тримається ~2 с)
const MOVE = 0.015
const BACK = 0.12
// зсув на клітинку за напрямом стану: 0 — на місці, 1 — вгору, 2 — вниз,
// 3 — вліво, 4 — вправо
const DX = [0, 0, 0, -1, 1]
const DY = [0, -1, 1, 0, 0]

let art: Art | null = null
let vw = 0
let vh = 0
// на клітинку: x, y, w, h (у координатах view), розсипаність, маска сусідів
let cells: Float32Array | null = null
let n = 0
// індекси розсипаних клітинок і поточний стан кожної клітинки
let loose: Uint32Array = new Uint32Array(0)
let state: Uint8Array = new Uint8Array(0)

let ctx: CanvasRenderingContext2D | null = null
let dpr = 1
let boxW = 0
let boxH = 0
let visL = 0
let visR = 0
let raf = 0
let lastTick = 0
let visible = false
let reduced = false
let io: IntersectionObserver | null = null
let ro: ResizeObserver | null = null

function prepare(a: Art) {
  const [vx, vy, w, h] = props.view ?? a.vb
  vw = w
  vh = h
  const src = a.cells
  const tmp: number[] = []
  const idx: number[] = []
  for (let i = 0; i < src.length; i += 6) {
    let x = src[i] - vx
    let y = src[i + 1] - vy
    const cw = src[i + 2]
    const ch = src[i + 3]
    if (x + cw <= 0 || x >= w || y + ch <= 0 || y >= h) continue
    let mask = src[i + 5]
    if (props.flip) {
      x = w - x - cw
      y = h - y - ch
      // разом з артом міняються місцями вгору/вниз і вліво/вправо
      mask = ((mask & 1) << 1) | ((mask & 2) >> 1) | ((mask & 4) << 1) | ((mask & 8) >> 1)
    }
    if (src[i + 4] > 0) idx.push(tmp.length / STRIDE)
    tmp.push(x, y, cw, ch, src[i + 4], mask)
  }
  cells = new Float32Array(tmp)
  n = tmp.length / STRIDE
  loose = new Uint32Array(idx)
  state = new Uint8Array(n)
}

// один крок шуму: частина розсипаних пікселів зсувається на сусідню порожню
// клітинку, зсунуті здебільшого повертаються на місце
function tick() {
  if (!cells) return
  for (const i of loose) {
    if (state[i]) {
      if (Math.random() < BACK) state[i] = 0
      continue
    }
    if (Math.random() >= MOVE * props.amount * cells[i * STRIDE + 4]) continue
    const mask = cells[i * STRIDE + 5]
    let options = 0
    for (let b = 0; b < 4; b++) if (mask & (1 << b)) options++
    let pick = Math.floor(Math.random() * options)
    for (let b = 0; b < 4; b++) {
      if (!(mask & (1 << b))) continue
      if (pick-- === 0) {
        state[i] = b + 1
        break
      }
    }
  }
}

function measure() {
  const root = rootEl.value
  const canvas = canvasEl.value
  if (!root || !canvas) return
  const rect = root.getBoundingClientRect()
  boxW = rect.width
  boxH = rect.height
  // canvas покриває лише ту частину блоку, що в межах сторінки по горизонталі
  const pageW = document.documentElement.clientWidth
  visL = Math.min(Math.max(0, -rect.left), boxW)
  visR = Math.max(visL, Math.min(boxW, pageW - rect.left))
  dpr = Math.min(window.devicePixelRatio || 1, 2)
  canvas.style.marginLeft = `${visL}px`
  canvas.style.width = `${visR - visL}px`
  canvas.width = Math.round((visR - visL) * dpr)
  canvas.height = Math.round(boxH * dpr)
  ctx = canvas.getContext('2d')
  if (!raf) draw()
}

function draw() {
  if (!ctx || !cells || !art || !boxW || !boxH) return
  const sx = props.tile ? 1 : boxW / vw
  const sy = props.tile ? 1 : boxH / vh
  // зсуви плиток: розтягнутий арт — одна плитка; tile — по центру з повтором
  const offsets: number[] = []
  if (props.tile) {
    let ox = (boxW - vw) / 2
    while (ox > 0) ox -= vw
    for (; ox < boxW; ox += vw) offsets.push(ox)
  } else offsets.push(0)

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  ctx.fillStyle = art.color
  ctx.beginPath()
  for (const ox of offsets) {
    for (let i = 0; i < n; i++) {
      const o = i * STRIDE
      const s = state[i]
      const x = cells[o] + DX[s] * cells[o + 2]
      const y = cells[o + 1] + DY[s] * cells[o + 3]
      const left = ox + x * sx
      const right = left + cells[o + 2] * sx
      if (right < visL || left > visR) continue

      // межі клітинки в пікселях пристрою: сусідні клітинки стикуються без щілин
      const L = Math.round((left - visL) * dpr)
      const R = Math.round((right - visL) * dpr)
      const T = Math.round(y * sy * dpr)
      const B = Math.round((y + cells[o + 3]) * sy * dpr)
      ctx.rect(L, T, R - L, B - T)
    }
  }
  ctx.fill()
  ready.value = true
}

function loop(now: number) {
  if (now - lastTick >= TICK_MS) {
    lastTick = now
    tick()
    draw()
  }
  raf = visible ? requestAnimationFrame(loop) : 0
}

let loading: Promise<void> | null = null

async function show() {
  loading ??= loadArt(props.src).then((a) => {
    art = a
    prepare(a)
    measure()
  })
  await loading
  if (!reduced && !raf && visible) raf = requestAnimationFrame(loop)
}

onMounted(() => {
  reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  io = new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting
      if (visible) show()
    },
    { rootMargin: '120px 0px' }
  )
  if (rootEl.value) io.observe(rootEl.value)
  ro = new ResizeObserver(measure)
  if (rootEl.value) ro.observe(rootEl.value)
  window.addEventListener('resize', measure, { passive: true })
})

onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  io?.disconnect()
  ro?.disconnect()
  window.removeEventListener('resize', measure)
})
</script>

<template>
  <div ref="rootEl" class="pixels" :class="{ 'is-ready': ready }" aria-hidden="true">
    <canvas ref="canvasEl" class="pixels__canvas" />
  </div>
</template>

<style scoped>
.pixels {
  pointer-events: none;
}

/* арт малює JS, тож він проявляється, щойно завантажився, а не вискакує */
.pixels__canvas {
  display: block;
  height: 100%;
  opacity: 0;
  transition: opacity 0.6s ease;
}

.is-ready .pixels__canvas {
  opacity: 1;
}

@media (prefers-reduced-motion: reduce) {
  .pixels__canvas {
    transition: none;
  }
}
</style>
