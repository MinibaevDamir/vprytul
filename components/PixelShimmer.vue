<script lang="ts">
// Піксельні SVG макета — одна path із горизонтальних смуг однакової висоти
// (M x y H x V y H x V y Z) на рівномірній сітці. Розкладаємо смуги на клітинки
// один раз на файл. cells: колонка, рядок, скільки сусідів по хресту порожні
// (0…4) і маска порожніх сусідів, куди піксель може зрушити (1 — вгору,
// 2 — вниз, 4 — вліво, 8 — вправо). Положення клітинки рахуємо від цілих
// індексів сітки, а не від дробових координат svg: краї сусідніх клітинок
// збігаються точно, і між ними не проступають волосяні шви.
type Art = {
  vb: number[]
  color: string
  // лівий верхній кут сітки та розмір клітинки в координатах svg
  x0: number
  y0: number
  gw: number
  gh: number
  cells: Int16Array
}

const cache = new Map<string, Promise<Art>>()

function parseArt(svg: string): Art {
  const vb = /viewBox="([^"]+)"/.exec(svg)![1].split(/[\s,]+/).map(Number)
  const tag = /<path\b[^>]*>/.exec(svg)![0]
  const d = / d="([^"]+)"/.exec(tag)![1]
  const color = / fill="([^"]+)"/.exec(tag)?.[1] ?? '#000'

  const rects: number[][] = []
  const re = /M(-?[\d.]+)[ ,](-?[\d.]+)H(-?[\d.]+)V(-?[\d.]+)H(-?[\d.]+)V(-?[\d.]+)Z/g
  let cw = Infinity
  let ch = Infinity
  for (let m; (m = re.exec(d)); ) {
    const [x0, y0, x1, y1] = [+m[1], +m[2], +m[3], +m[4]]
    const r = [Math.min(x0, x1), Math.min(y0, y1), Math.abs(x1 - x0), Math.abs(y1 - y0)]
    cw = Math.min(cw, r[2])
    ch = Math.min(ch, r[3])
    rects.push(r)
  }

  // крок сітки — з повного розміру арту: координати в svg округлені до тисячних,
  // тож найвужча смуга трохи менша за справжню клітинку
  const x0 = Math.min(...rects.map((r) => r[0]))
  const y0 = Math.min(...rects.map((r) => r[1]))
  const cols = Math.round((Math.max(...rects.map((r) => r[0] + r[2])) - x0) / cw)
  const rows = Math.round((Math.max(...rects.map((r) => r[1] + r[3])) - y0) / ch)
  const gw = (Math.max(...rects.map((r) => r[0] + r[2])) - x0) / cols
  const gh = (Math.max(...rects.map((r) => r[1] + r[3])) - y0) / rows

  const raw: number[][] = []
  for (const [x, y, w] of rects) {
    const k = Math.round((x - x0) / gw)
    const r = Math.round((y - y0) / gh)
    const n = Math.max(1, Math.round(w / gw))
    for (let i = 0; i < n; i++) raw.push([k + i, r])
  }

  // сусід за межами арту вважається заповненим — там фон продовжується
  // суцільною заливкою (hero, підвал), і туди пікселі не тікають
  const filled = new Set(raw.map(([k, r]) => r * 65536 + k))
  const has = (r: number, k: number) =>
    r < 0 || k < 0 || r >= rows || k >= cols || filled.has(r * 65536 + k)

  const out: number[] = []
  for (const [k, r] of raw) {
    const free = [!has(r - 1, k), !has(r + 1, k), !has(r, k - 1), !has(r, k + 1)]
    const empty = free.filter(Boolean).length
    const mask = free.reduce((m, f, i) => (f ? m | (1 << i) : m), 0)
    out.push(k, r, empty, mask)
  }
  return { vb, color, x0, y0, gw, gh, cells: new Int16Array(out) }
}

function loadArt(src: string) {
  if (!cache.has(src)) cache.set(src, fetch(src).then((r) => r.text()).then(parseArt))
  return cache.get(src)!
}
</script>

<script setup lang="ts">
// Піксельний декор із разовим «джитером»: щойно арт уперше з'являється в
// кадрі, пікселі на краях маси жваво перескакують на сусідні порожні клітинки,
// активність згасає за ~2 с, усі повертаються на місця — і далі арт нерухомий.
// Розмір і положення блоку задає батьківський CSS — canvas малює арт
// розтягнутим на блок (як img) або, з tile, у нативному масштабі з повтором
// по горизонталі (як background repeat-x). Для prefers-reduced-motion і з
// still — одразу статичний кадр.
const props = withDefaults(
  defineProps<{
    src: string
    /** фрагмент viewBox [x, y, w, h], якщо потрібна лише частина svg */
    view?: number[]
    tile?: boolean
    /** сила джитера: множник імовірності, що піксель зрушить */
    amount?: number
    /** повернути арт на 180° (як у макеті для однієї з «хмар») */
    flip?: boolean
    /** без джитера — статичний арт */
    still?: boolean
  }>(),
  { tile: false, amount: 1, flip: false, still: false }
)

const rootEl = ref<HTMLElement | null>(null)
const canvasEl = ref<HTMLCanvasElement | null>(null)
const ready = ref(false)

const STRIDE = 4

// Профілі джитера. calm — за замовчуванням: ~9 кроків на секунду, активність
// згасає за ~2 с. hard — пробний «вжух-вжух і статика» (вмикається параметром
// ?noise=hard в адресі): два короткі різкі сплески по ~0.4 с з частотою 25
// кроків на секунду, у яких смикаються й пікселі щільного краю, і одразу стоп.
// tick — крок, мс; ticks — тривалість активної фази в кроках, далі пікселі
// лише повертаються; move — імовірність за крок на піку найрозсипанішому
// пікселю (4 порожні сусіди) зрушити, далі пропорційно числу порожніх сусідів,
// але не менше floor; back — імовірність зрушеному повернутися
type Profile = {
  tick: number
  ticks: number
  move: number
  floor: number
  back: number
  energy: (t: number) => number
}

const PROFILES: Record<'calm' | 'hard', Profile> = {
  calm: {
    tick: 110,
    ticks: 18,
    move: 0.55,
    floor: 0,
    back: 0.45,
    energy: (t) => Math.min(1, 1.6 * (1 - t)) ** 2
  },
  hard: {
    tick: 40,
    ticks: 26,
    move: 1,
    floor: 0.5,
    back: 0.7,
    energy: (t) => (t < 0.4 ? 1 : t < 0.6 ? 0 : 1)
  }
}

let profile = PROFILES.calm
// зсув на клітинку за напрямом стану: 0 — на місці, 1 — вгору, 2 — вниз,
// 3 — вліво, 4 — вправо
const DX = [0, 0, 0, -1, 1]
const DY = [0, -1, 1, 0, 0]

let art: Art | null = null
let vw = 0
let vh = 0
// індекси клітинок сітки (k — колонка, r — рядок; для flip від'ємні) і
// положення нульового індексу та крок сітки в координатах view
let X0 = 0
let Y0 = 0
let gw = 0
let gh = 0
// на клітинку: k, r, кількість порожніх сусідів, маска сусідів
let cells: Int16Array | null = null
let n = 0
// індекси клітинок на краю маси (є куди зрушити) і поточний стан кожної
let loose: Uint32Array = new Uint32Array(0)
let state: Uint8Array = new Uint8Array(0)
let moved = 0
let step = 0

let ctx: CanvasRenderingContext2D | null = null
let dpr = 1
let boxW = 0
let boxH = 0
let visL = 0
let visR = 0
let sized = ''
let raf = 0
let lastTick = 0
let visible = false
let done = false
let io: IntersectionObserver | null = null
let ro: ResizeObserver | null = null

function prepare(a: Art) {
  const [vx, vy, w, h] = props.view ?? a.vb
  vw = w
  vh = h
  gw = a.gw
  gh = a.gh
  // з flip клітинка k займає [X0 + k·gw, X0 + (k+1)·gw] з k = −(col+1)
  X0 = props.flip ? w - (a.x0 - vx) : a.x0 - vx
  Y0 = props.flip ? h - (a.y0 - vy) : a.y0 - vy
  const src = a.cells
  const tmp: number[] = []
  const idx: number[] = []
  for (let i = 0; i < src.length; i += STRIDE) {
    const k = props.flip ? -src[i] - 1 : src[i]
    const r = props.flip ? -src[i + 1] - 1 : src[i + 1]
    const x = X0 + k * gw
    const y = Y0 + r * gh
    if (x + gw <= 0 || x >= w || y + gh <= 0 || y >= h) continue
    let mask = src[i + 3]
    if (props.flip) {
      // разом з артом міняються місцями вгору/вниз і вліво/вправо
      mask = ((mask & 1) << 1) | ((mask & 2) >> 1) | ((mask & 4) << 1) | ((mask & 8) >> 1)
    }
    if (mask) idx.push(tmp.length / STRIDE)
    tmp.push(k, r, src[i + 2], mask)
  }
  cells = new Int16Array(tmp)
  n = tmp.length / STRIDE
  loose = new Uint32Array(idx)
  state = new Uint8Array(n)
}

// один крок джитера: поки триває активна фаза, частина крайових пікселів
// зсувається на сусідню порожню клітинку (що більше порожніх сусідів, то
// частіше), зсунуті здебільшого повертаються; активність згасає до нуля
function tick() {
  if (!cells) return
  const t = step / profile.ticks
  const energy = t < 1 ? profile.energy(t) : 0
  for (const i of loose) {
    if (state[i]) {
      if (energy === 0 || Math.random() < profile.back) {
        state[i] = 0
        moved--
      }
      continue
    }
    const weight = Math.max(cells[i * STRIDE + 2] / 4, profile.floor)
    if (Math.random() >= profile.move * props.amount * energy * weight) continue
    const mask = cells[i * STRIDE + 3]
    let options = 0
    for (let b = 0; b < 4; b++) if (mask & (1 << b)) options++
    let pick = Math.floor(Math.random() * options)
    for (let b = 0; b < 4; b++) {
      if (!(mask & (1 << b))) continue
      if (pick-- === 0) {
        state[i] = b + 1
        moved++
        break
      }
    }
  }
  step++
  if (t >= 1 && moved === 0) finish()
}

function finish() {
  done = true
  io?.disconnect()
}

function measure() {
  const root = rootEl.value
  const canvas = canvasEl.value
  if (!root || !canvas) return
  const rect = root.getBoundingClientRect()
  // canvas покриває лише ту частину блоку, що в межах сторінки по горизонталі
  const pageW = document.documentElement.clientWidth
  const l = Math.min(Math.max(0, -rect.left), rect.width)
  const r = Math.max(l, Math.min(rect.width, pageW - rect.left))
  const d = Math.min(window.devicePixelRatio || 1, 3)
  // iOS Safari шле resize при кожному згортанні панелей під час скролу, а
  // присвоєння розміру очищає canvas — перемальовуємо лише за реальних змін
  const key = `${rect.width} ${rect.height} ${l} ${r} ${d}`
  if (key === sized) return
  sized = key
  boxW = rect.width
  boxH = rect.height
  visL = l
  visR = r
  dpr = d
  canvas.style.marginLeft = `${visL}px`
  canvas.style.width = `${visR - visL}px`
  canvas.width = Math.round((visR - visL) * dpr)
  canvas.height = Math.round(boxH * dpr)
  ctx = canvas.getContext('2d')
  draw()
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
    // межі клітинок у пікселях пристрою — одна функція від цілого індексу,
    // тож сусідні клітинки стикуються без щілин
    const ex = (k: number) => Math.round((ox + (X0 + k * gw) * sx - visL) * dpr + 1e-6)
    const ey = (r: number) => Math.round((Y0 + r * gh) * sy * dpr + 1e-6)
    for (let i = 0; i < n; i++) {
      const o = i * STRIDE
      const s = state[i]
      const k = cells[o] + DX[s]
      const r = cells[o + 1] + DY[s]
      const left = ox + (X0 + k * gw) * sx
      if (left + gw * sx < visL || left > visR) continue
      const L = ex(k)
      const T = ey(r)
      ctx.rect(L, T, ex(k + 1) - L, ey(r + 1) - T)
    }
  }
  ctx.fill()
  ready.value = true
}

// арт підвантажується із запасом (rootMargin), а джитер стартує, лише коли
// блок справді у вьюпорті — щоб його встигли побачити
function inView() {
  const rect = rootEl.value!.getBoundingClientRect()
  return rect.bottom > 0 && rect.top < window.innerHeight
}

function loop(now: number) {
  if (now - lastTick >= profile.tick && (step > 0 || inView())) {
    lastTick = now
    tick()
    draw()
  }
  raf = visible && !done ? requestAnimationFrame(loop) : 0
}

let loading: Promise<void> | null = null

async function show() {
  loading ??= loadArt(props.src).then((a) => {
    art = a
    prepare(a)
    sized = ''
    measure()
  })
  await loading
  if (!done && !raf && visible) raf = requestAnimationFrame(loop)
}

onMounted(() => {
  done = props.still || window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (new URLSearchParams(location.search).get('noise') === 'hard') profile = PROFILES.hard
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
