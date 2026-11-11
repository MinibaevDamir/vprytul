<script setup lang="ts">
// Мокап iPhone 16 Light з «Домашньою сторінкою» застосунку (Figma 805:2423).
// Усі розміри задані в одиницях макета: --u = 1/372 ширини телефона, тож мокап
// масштабується від ширини контейнера. Стрічка екрана довша за вьюпорт телефона
// і скрабиться 1:1 зі скролом сторінки. Якщо є предок [data-phone-pin] (hero
// тримає його sticky на висоту стрічки), спершу «прогортається» телефон, і лише
// потім їде сторінка; довжину прокрутки віддаємо нагору подією range.
const emit = defineEmits<{ (e: 'range', px: number): void }>()

const viewportEl = ref<HTMLElement | null>(null)
const feedEl = ref<HTMLElement | null>(null)
const shift = ref(0)

let pinEl: HTMLElement | null = null
let maxShift = 0
let raf = 0
let ro: ResizeObserver | null = null

const apply = () => {
  const scrolled = pinEl ? -pinEl.getBoundingClientRect().top : window.scrollY
  shift.value = -Math.round(Math.min(maxShift, Math.max(0, scrolled)))
}

const onScroll = () => {
  cancelAnimationFrame(raf)
  raf = requestAnimationFrame(apply)
}

const measure = () => {
  if (!viewportEl.value || !feedEl.value) return
  maxShift = Math.max(0, feedEl.value.offsetHeight - viewportEl.value.clientHeight)
  emit('range', maxShift)
  apply()
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  pinEl = viewportEl.value?.closest<HTMLElement>('[data-phone-pin]') ?? null
  measure()
  ro = new ResizeObserver(measure)
  if (feedEl.value) ro.observe(feedEl.value)
  if (viewportEl.value) ro.observe(viewportEl.value)
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  ro?.disconnect()
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <div
    class="phone"
    role="img"
    aria-label="Домашня сторінка застосунку Впритул: гарячий квест, кампанії, голосування, новини та квести"
  >
    <div class="phone__body" aria-hidden="true">
      <span class="phone__btn phone__btn--action" />
      <span class="phone__btn phone__btn--vol-up" />
      <span class="phone__btn phone__btn--vol-down" />
      <span class="phone__btn phone__btn--power" />

      <div class="phone__frame">
        <span class="phone__cutout phone__cutout--top" />
        <span class="phone__cutout phone__cutout--left" />
        <span class="phone__cutout phone__cutout--left-low" />
        <span class="phone__cutout phone__cutout--bottom" />
        <span class="phone__cutout phone__cutout--right-low" />
      </div>
      <div class="phone__bezel" />

      <div class="phone__screen">
        <div ref="viewportEl" class="phone__viewport">
          <div ref="feedEl" class="phone__feed" :style="{ transform: `translateY(${shift}px)` }">
            <img class="phone__shot" src="/phone/screen-home.png" width="957" height="4096" alt="" />
          </div>

          <!-- Хедер і нижня панель застосунку закріплені (Figma 805:2423): це ті
               самі ділянки скріншота на початку й у кінці стрічки, поверх неї -->
          <div class="phone__pin phone__pin--head">
            <div class="phone__feed">
              <img class="phone__shot" src="/phone/screen-home.png" width="957" height="4096" alt="" />
            </div>
          </div>
          <div class="phone__pin phone__pin--tabs">
            <div class="phone__feed">
              <img class="phone__shot" src="/phone/screen-home.png" width="957" height="4096" alt="" />
            </div>
          </div>
        </div>
      </div>

      <img class="phone__island" src="/phone/dynamic-island.svg" width="109.529" height="30.5897" alt="" />
      <span class="phone__time">9:41</span>
      <img class="phone__status" src="/phone/status-right.svg" width="74.4012" height="12.8277" alt="" />
      <span class="phone__home" />
    </div>
  </div>
</template>

<style scoped>
.phone {
  container-type: inline-size;
  width: 100%;
  user-select: none;
}

/* Одиниця макета: ширина телефона в Figma — 372px. Висота корпусу — теж в
   одиницях, а не aspect-ratio на .phone: iOS Safari у flex-колонці мобільного
   hero робив блок вищим, і рамка виходила з-під екрана товстим «підборіддям» */
.phone__body {
  --u: calc(100cqw / 372);
  position: relative;
  width: 100%;
  height: calc(774.589 * var(--u));
  filter: drop-shadow(0 calc(6.349 * var(--u)) calc(3.175 * var(--u)) rgba(0, 0, 0, 0.25));
}

.phone__body > * {
  position: absolute;
}

/* ---------- Бічні кнопки ---------- */
.phone__btn {
  --h: 55.257;
  --fade: 7.143%;
  left: calc(-2.96 * var(--u));
  width: calc(4.934 * var(--u));
  height: calc(var(--h) * var(--u));
  overflow: hidden;
  border-radius: calc(1.973 * var(--u)) 0 0 calc(1.973 * var(--u));
  background:
    linear-gradient(to bottom, rgba(0, 0, 0, 0.76), rgba(0, 0, 0, 0) var(--fade)),
    linear-gradient(to bottom, rgba(0, 0, 0, 0) calc(100% - var(--fade)), rgba(0, 0, 0, 0.48)),
    linear-gradient(to left, #000, rgba(174, 174, 174, 0) 70%),
    #f0ece3;
}

/* відблиск і тінь уздовж ребра кнопки */
.phone__btn::before,
.phone__btn::after {
  content: '';
  position: absolute;
  width: calc(0.987 * var(--u));
  border-radius: calc(0.987 * var(--u));
}

.phone__btn::before {
  left: calc(0.99 * var(--u));
  top: calc(2.96 * var(--u));
  bottom: calc(2 * var(--u));
  background: rgba(255, 255, 255, 0.8);
  filter: blur(calc(0.493 * var(--u)));
}

.phone__btn::after {
  left: 0;
  top: 0;
  bottom: 0;
  background: #61605d;
  filter: blur(calc(0.987 * var(--u)));
}

.phone__btn--action {
  --h: 30.589;
  --fade: 9.677%;
  top: calc(147.02 * var(--u));
}

.phone__btn--vol-up {
  top: calc(206.22 * var(--u));
}

.phone__btn--vol-down {
  top: calc(278.25 * var(--u));
}

.phone__btn--power {
  --h: 94.727;
  --fade: 4.545%;
  left: calc(370.03 * var(--u));
  top: calc(248.65 * var(--u));
  transform: rotate(180deg);
}

/* ---------- Титанова рамка ---------- */
.phone__frame {
  inset: 0;
  overflow: hidden;
  border-radius: calc(61.178 * var(--u));
  background: #e7e3bf;
}

.phone__frame::before,
.phone__frame::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  border-style: solid;
}

.phone__frame::before {
  border-width: calc(2.96 * var(--u));
  border-color: #c3c3c3;
  filter: blur(calc(1.973 * var(--u)));
}

.phone__frame::after {
  border-width: calc(0.987 * var(--u));
  border-color: #524b40;
  filter: blur(calc(0.987 * var(--u)));
}

.phone__cutout {
  position: absolute;
  z-index: 1;
  width: calc(3.947 * var(--u));
  height: calc(5.92 * var(--u));
}

.phone__cutout--top {
  left: calc(289.12 * var(--u));
  top: 0;
  width: calc(5.92 * var(--u));
  height: calc(3.947 * var(--u));
  background: linear-gradient(to bottom, #817e73, #c3beac);
}

.phone__cutout--left {
  left: 0;
  top: calc(79.93 * var(--u));
  background: linear-gradient(to right, #817e73, #c3beac);
}

.phone__cutout--left-low {
  left: 0;
  top: calc(688.74 * var(--u));
  background: linear-gradient(to right, #817e73, #c3beac);
}

.phone__cutout--bottom {
  left: calc(62.16 * var(--u));
  top: calc(770.64 * var(--u));
  width: calc(4.934 * var(--u));
  height: calc(3.947 * var(--u));
  background: linear-gradient(to top, #817e73, #c3beac);
}

.phone__cutout--right-low {
  left: calc(368.05 * var(--u));
  top: calc(688.74 * var(--u));
  background: linear-gradient(to left, #817e73, #c3beac);
}

/* ---------- Чорна рамка екрана ---------- */
.phone__bezel {
  inset: calc(3.95 * var(--u));
  overflow: hidden;
  border-radius: calc(57.231 * var(--u));
  background: #000100;
}

.phone__bezel::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  border: calc(3.947 * var(--u)) solid #879194;
  filter: blur(calc(3.454 * var(--u)));
}

/* ---------- Екран ---------- */
.phone__screen {
  left: calc(11.84 * var(--u));
  top: calc(11.84 * var(--u));
  width: calc(348.318 * var(--u));
  height: calc(750.907 * var(--u));
  overflow: hidden;
  border-radius: calc(51.31 * var(--u));
  background: #fff;
}

/* Стрічка починається під статус-баром і скрабиться всередині цього вікна */
.phone__viewport {
  position: absolute;
  inset: calc(27.63 * var(--u)) 0 0;
  overflow: hidden;
}

.phone__feed {
  position: relative;
  height: calc(1450.504 * var(--u));
  overflow: hidden;
  will-change: transform;
}

.phone__shot {
  position: absolute;
  left: -0.04%;
  top: -1.97%;
  width: 100.08%;
  height: 102.86%;
  max-width: none;
}

/* ---------- Закріплені хедер і нижня панель ----------
   Вікна поверх стрічки з тим самим скріншотом у положенні на старті (хедер)
   і в кінці прокрутки (панель), тож стрічка ховається під ними. Межі — з PNG:
   хедер із лінією під ним — рядки 0–255, панель — від лінії на рядку 3863;
   у одиницях стрічки (4096px = 1491.99u, верх PNG на −28.575u) це 64.68u
   від верху і 71.93u від низу */
.phone__pin {
  position: absolute;
  left: 0;
  right: 0;
  overflow: hidden;
}

.phone__pin--head {
  top: 0;
  height: calc(64.68 * var(--u));
}

.phone__pin--tabs {
  bottom: 0;
  height: calc(71.93 * var(--u));
}

.phone__pin .phone__feed {
  will-change: auto;
}

.phone__pin--tabs .phone__feed {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
}

/* ---------- Статус-бар і жести ---------- */
.phone__island {
  left: calc(131.25 * var(--u));
  top: calc(23.68 * var(--u));
  width: calc(109.528 * var(--u));
  height: calc(30.589 * var(--u));
}

.phone__time {
  left: calc(68.31 * var(--u));
  top: calc(28.61 * var(--u));
  transform: translateX(-50%);
  font-family: -apple-system, 'SF Pro Text', system-ui, sans-serif;
  font-weight: 600;
  font-size: calc(16.77 * var(--u));
  line-height: calc(21.708 * var(--u));
  letter-spacing: calc(-0.8 * var(--u));
  color: #0d0d0e;
}

.phone__status {
  left: calc(265.37 * var(--u));
  top: calc(32.56 * var(--u));
  width: calc(74.398 * var(--u));
  height: calc(12.828 * var(--u));
}

.phone__home {
  left: calc(113.96 * var(--u));
  top: calc(751.9 * var(--u));
  width: calc(142.09 * var(--u));
  height: calc(4.934 * var(--u));
  border-radius: calc(98.674 * var(--u));
  background: #000;
}
</style>
