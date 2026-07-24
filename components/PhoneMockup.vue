<script setup lang="ts">
// Мокап смартфона з «Домашньою сторінкою» застосунку (Figma, фрейм 144:7210).
// Ассети експортовані з макета в public/phone/. Стрічка екрана довша за вьюпорт
// телефона і скрабиться 1:1 зі скролом сторінки. Якщо є предок [data-phone-pin]
// (hero тримає його sticky на висоту стрічки), спершу «прогортається» телефон,
// і лише потім їде сторінка; довжину прокрутки віддаємо нагору подією range.
// Секції стрічки плавно проявляються, коли в'їжджають у вьюпорт телефона.
const emit = defineEmits<{ (e: 'range', px: number): void }>()

const viewportEl = ref<HTMLElement | null>(null)
const feedEl = ref<HTMLElement | null>(null)
const shift = ref(0)

let pinEl: HTMLElement | null = null
let maxShift = 0
let raf = 0
let ro: ResizeObserver | null = null

const apply = () => {
  if (!viewportEl.value || !feedEl.value) return
  const scrolled = pinEl ? -pinEl.getBoundingClientRect().top : window.scrollY
  shift.value = -Math.round(Math.min(maxShift, Math.max(0, scrolled)))
  const limit = -shift.value + viewportEl.value.clientHeight * 0.92
  feedEl.value.querySelectorAll<HTMLElement>('.scr-section').forEach((s) => {
    if (s.offsetTop < limit) s.classList.add('is-in')
  })
}

const onScroll = () => {
  cancelAnimationFrame(raf)
  raf = requestAnimationFrame(apply)
}

const measure = () => {
  if (!viewportEl.value || !feedEl.value) return
  maxShift = Math.max(0, feedEl.value.scrollHeight - viewportEl.value.clientHeight)
  emit('range', maxShift)
  apply()
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  pinEl = viewportEl.value?.closest<HTMLElement>('[data-phone-pin]') ?? null
  feedEl.value?.classList.add('scr-feed--anim')
  // кадр паузи, щоб приховані секції встигли відмалюватися і поява йшла з переходом
  requestAnimationFrame(measure)
  ro = new ResizeObserver(measure)
  if (feedEl.value) ro.observe(feedEl.value)
  if (viewportEl.value) ro.observe(viewportEl.value)
  window.addEventListener('resize', measure, { passive: true })
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  ro?.disconnect()
  window.removeEventListener('resize', measure)
  window.removeEventListener('scroll', onScroll)
})

const products = [
  { img: '/phone/product-tee.jpg', name: 'Футболка Впритул', price: 500 },
  { img: '/phone/product-tote.jpg', name: 'Шопер Впритул', price: 380 },
  { img: '/phone/product-patch.jpg', name: 'Патч Впритул', price: 15 },
  { img: '/phone/product-tote2.jpg', name: 'Шопер Впритул', price: 50 },
  { img: '/phone/product-patch.jpg', name: 'Патч Впритул', price: 15 }
]
</script>

<template>
  <div
    class="phone"
    role="img"
    aria-label="Домашня сторінка застосунку Впритул: гарячий квест «Зроби донат — збий шахед», голосування, топ-пропозиції та новини"
  >
    <div class="phone__screen" aria-hidden="true">
      <div class="scr-status">
        <img class="scr-status__time" src="/phone/status-time.svg" alt="" />
        <img class="scr-status__right" src="/phone/status-right.svg" alt="" />
      </div>

      <div class="scr-header">
        <BrandLogo class="scr-header__logo" />
        <span class="scr-points">
          <span class="scr-points__part">
            <img src="/phone/ic-points.svg" alt="" />
            105
          </span>
          <span class="scr-points__div" />
          <span class="scr-points__part">
            <img src="/phone/ic-coins.svg" alt="" />
            105
          </span>
        </span>
        <span class="scr-header__actions">
          <img src="/phone/ic-chat.svg" alt="" />
          <img src="/phone/ic-bell.svg" alt="" />
        </span>
      </div>

      <div ref="viewportEl" class="scr-viewport">
        <div ref="feedEl" class="scr-feed" :style="{ transform: `translateY(${shift}px)` }">
          <section class="scr-section">
            <div class="scr-subtitle">
              <img class="scr-subtitle__ico" src="/phone/ic-fire.svg" alt="" />
              <span class="scr-subtitle__text">Гарячий квест</span>
            </div>
            <div class="scr-quest">
              <span class="scr-quest__badge"><img src="/phone/ic-fire-white.svg" alt="" /></span>
              <img class="scr-quest__banner" src="/phone/quest-banner.jpg" alt="" />
              <span class="scr-quest__title">Зроби донат - збий шахед!</span>
              <span class="scr-quest__rewards">Rewards</span>
              <span class="scr-quest__chips">
                <span class="scr-chip scr-chip--points"><img src="/phone/ic-points-sm.svg" alt="" />+1</span>
                <span class="scr-chip scr-chip--coins"><img src="/phone/ic-coins-sm.svg" alt="" />+1</span>
              </span>
            </div>
          </section>

          <section class="scr-section">
            <div class="scr-subtitle">
              <span class="scr-subtitle__text">Голосування</span>
              <span class="scr-more">Переглянути всі<img src="/phone/ic-chevron.svg" alt="" /></span>
            </div>
            <div class="scr-vote">
              <span class="scr-vote__ico"><img src="/phone/ic-voting.svg" alt="" /></span>
              <span class="scr-vote__text">Обери назву майбутнього збору!</span>
              <img class="scr-vote__chev" src="/phone/ic-chevron.svg" alt="" />
            </div>
          </section>

          <section class="scr-section">
            <div class="scr-subtitle">
              <img class="scr-subtitle__ico" src="/phone/ic-fire.svg" alt="" />
              <span class="scr-subtitle__text">Топ-пропозиції</span>
              <span class="scr-more">Переглянути всі<img src="/phone/ic-chevron.svg" alt="" /></span>
            </div>
            <div class="scr-products">
              <div v-for="(p, i) in products" :key="i" class="scr-product">
                <img class="scr-product__img" :src="p.img" alt="" />
                <span class="scr-product__name">{{ p.name }}</span>
                <span class="scr-product__price">
                  {{ p.price }}
                  <img src="/phone/ic-coins-24.svg" alt="" />
                </span>
              </div>
            </div>
          </section>

          <section class="scr-section scr-section--tight">
            <div class="scr-subtitle">
              <span class="scr-subtitle__text">Новини</span>
              <span class="scr-more">Переглянути всі<img src="/phone/ic-chevron.svg" alt="" /></span>
            </div>
            <div class="scr-news">
              <img class="scr-news__img" src="/phone/news-cover.jpg" alt="" />
              <span class="scr-news__title">73 мільйони гривень за два дні — done!🔥</span>
              <span class="scr-news__date">19 Січня 2025</span>
            </div>
          </section>

          <section class="scr-section scr-section--tight">
            <div class="scr-subtitle">
              <span class="scr-subtitle__text">Кампанії</span>
              <span class="scr-more">Переглянути всі<img src="/phone/ic-chevron.svg" alt="" /></span>
            </div>
            <div class="scr-campaign">
              <img class="scr-campaign__img" src="/phone/campaign-cover.jpg" alt="" />
              <span class="scr-campaign__title">Єдинозбір</span>
            </div>
          </section>
        </div>
      </div>

      <div class="scr-tabbar">
        <div class="scr-tabbar__tabs">
          <span class="scr-tab is-active">
            <span class="scr-tab__ico"><img class="scr-tab__ic-home" src="/phone/ic-tab-home.svg" alt="" /></span>
            Головна
          </span>
          <span class="scr-tab">
            <span class="scr-tab__ico"><img class="scr-tab__ic-quests" src="/phone/ic-tab-quests.svg" alt="" /></span>
            Квести
          </span>
          <span class="scr-tab scr-tab--donate">
            <span class="scr-tab__ico"><img class="scr-tab__ic-donate" src="/phone/ic-tab-donate.svg" alt="" /></span>
            Донат
          </span>
          <span class="scr-tab">
            <span class="scr-tab__ico"><img class="scr-tab__ic-ratings" src="/phone/ic-tab-ratings.svg" alt="" /></span>
            Рейтинги
          </span>
          <span class="scr-tab">
            <span class="scr-tab__ico"><img class="scr-tab__ic-profile" src="/phone/ic-tab-profile.svg" alt="" /></span>
            Профіль
          </span>
        </div>
        <div class="scr-tabbar__home" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.phone {
  /* Палітра design-системи застосунку (не лендінгу) — з макета */
  --scr-orange: #ff9200;
  --scr-bg: #f2f2f1;
  --scr-line: #e3e4de;
  --scr-line-strong: #d2d3cd;
  --scr-muted: #525252;
  --scr-black: #181917;

  width: min(320px, 78vw);
  aspect-ratio: 320 / 660;
  padding: 12px;
  background: #0d0d0c;
  border-radius: 48px;
  box-shadow:
    0 0 0 2px rgba(215, 216, 211, 0.18),
    0 40px 80px rgba(0, 0, 0, 0.55);
}

.phone__screen {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-radius: 38px;
  color: #000;
  /* Екран відтворює UI застосунку — системний шрифт iOS (SF Pro у макеті) */
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, sans-serif;
}

.scr-status {
  flex: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 35px;
  padding: 6px 12px 0 26px;
}

.scr-status__time {
  width: 23px;
  height: 9px;
}

.scr-status__right {
  width: 53px;
  height: 9px;
}

.scr-header {
  flex: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  height: 45px;
  padding: 0 13px;
  border-bottom: 1px solid var(--scr-line);
}

.scr-header__logo {
  width: 44px;
  height: auto;
  flex: none;
}

.scr-header__logo :deep(path) {
  fill: var(--scr-black);
}

.scr-points {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 6px;
  border: 1px solid var(--scr-line-strong);
  border-radius: 20px;
  font-size: 14px;
  line-height: 1.4;
}

.scr-points__part {
  display: inline-flex;
  align-items: center;
  gap: 2px;
}

.scr-points__part img {
  width: 14px;
  height: 14px;
}

.scr-points__div {
  width: 1px;
  align-self: stretch;
  background: var(--scr-line-strong);
}

.scr-header__actions {
  display: inline-flex;
  align-items: center;
  gap: 15px;
}

.scr-header__actions img {
  width: 16px;
  height: 17px;
  object-fit: contain;
}

/* Стрічка, що підкручується зі скролом сторінки */
.scr-viewport {
  flex: 1;
  min-height: 0;
  overflow: hidden;
  background: var(--scr-bg);
}

.scr-feed {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 19px;
  padding: 13px;
  will-change: transform;
}

.scr-feed--anim .scr-section {
  opacity: 0;
  transform: translateY(16px);
  transition:
    opacity 0.55s ease,
    transform 0.55s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.scr-feed--anim .scr-section.is-in {
  opacity: 1;
  transform: none;
}

.scr-section {
  display: flex;
  flex-direction: column;
  gap: 13px;
}

.scr-section--tight {
  gap: 6px;
}

.scr-subtitle {
  display: flex;
  align-items: center;
  gap: 6px;
}

.scr-subtitle__ico {
  width: 12px;
  height: 17px;
}

.scr-subtitle__text {
  flex: 1;
  min-width: 0;
  font-size: 13px;
  font-weight: 700;
  line-height: 1.2;
}

.scr-more {
  display: inline-flex;
  align-items: center;
  font-size: 13px;
  font-weight: 400;
  line-height: 1.3;
  color: var(--scr-muted);
  white-space: nowrap;
}

.scr-more img {
  width: 6px;
  height: 10px;
  margin-left: 6px;
}

.scr-quest {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 13px;
  background: #fff;
  border: 2.5px solid var(--scr-orange);
}

.scr-quest__badge {
  position: absolute;
  top: -14px;
  right: 19px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  background: var(--scr-orange);
  border-radius: 999px;
}

.scr-quest__badge img {
  width: 12px;
  height: 17px;
}

.scr-quest__banner {
  width: 100%;
  height: 106px;
  object-fit: cover;
  border-radius: 3px;
}

.scr-quest__title {
  font-size: 13px;
  font-weight: 700;
  line-height: 1.2;
}

.scr-quest__rewards {
  padding-bottom: 2px;
  font-size: 11px;
  font-weight: 600;
  line-height: 1.3;
  color: var(--scr-black);
}

.scr-quest__chips {
  display: flex;
  gap: 6px;
}

.scr-chip {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  height: 19px;
  padding: 3px;
  border-radius: 5px;
  font-size: 11px;
  font-weight: 600;
}

.scr-chip img {
  width: 13px;
  height: 13px;
}

.scr-chip--points {
  background: #fff2e1;
}

.scr-chip--coins {
  background: var(--scr-line);
}

.scr-vote {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 13px;
  background: #fff;
}

.scr-vote__ico {
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--scr-line-strong);
}

.scr-vote__ico img {
  width: 17px;
  height: 14px;
}

.scr-vote__text {
  flex: 1;
  min-width: 0;
  font-size: 13px;
  font-weight: 600;
  line-height: 1.3;
}

.scr-vote__chev {
  width: 6px;
  height: 10px;
}

.scr-products {
  display: flex;
  gap: 6px;
  margin-right: -13px;
  overflow: hidden;
}

.scr-product {
  flex: none;
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 122px;
  padding: 13px;
  background: #fff;
  border: 1px solid var(--scr-line-strong);
}

.scr-product__img {
  width: 96px;
  height: 96px;
  object-fit: cover;
}

.scr-product__name {
  height: 28px;
  overflow: hidden;
  font-size: 11px;
  font-weight: 600;
  line-height: 1.3;
  color: var(--scr-black);
}

.scr-product__price {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-size: 14px;
  font-weight: 700;
  color: var(--scr-black);
}

.scr-product__price img {
  width: 17px;
  height: 17px;
}

.scr-news {
  display: flex;
  flex-direction: column;
  padding: 6px;
  background: #fff;
}

.scr-news__img {
  width: 100%;
  height: 138px;
  object-fit: cover;
}

.scr-news__title {
  padding-top: 6px;
  font-size: 13px;
  font-weight: 700;
  line-height: 1.2;
}

.scr-news__date {
  padding-top: 6px;
  font-size: 10px;
  line-height: 13px;
  color: #1a1a1a;
}

.scr-campaign {
  display: flex;
  flex-direction: column;
  padding: 6px 6px 13px;
  background: #fff;
}

.scr-campaign__img {
  width: 100%;
  height: 137px;
  object-fit: cover;
  border-radius: 5px;
}

.scr-campaign__title {
  padding-top: 13px;
  font-size: 13px;
  font-weight: 700;
  line-height: 1.2;
  color: #1d2127;
}

.scr-tabbar {
  flex: none;
  display: flex;
  flex-direction: column;
  background: #fff;
  border-top: 1px solid var(--scr-line);
}

.scr-tabbar__tabs {
  display: flex;
  align-items: center;
}

.scr-tab {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 33px;
  font-size: 9px;
  font-weight: 700;
  line-height: 1.3;
  color: #000;
}

.scr-tab__ico {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
}

.scr-tab__ic-home {
  width: 17px;
  height: 17px;
}

.scr-tab__ic-quests {
  width: 20px;
  height: 19px;
}

.scr-tab__ic-donate {
  width: 17px;
  height: 16px;
}

.scr-tab__ic-ratings {
  width: 20px;
  height: 17px;
}

.scr-tab__ic-profile {
  width: 15px;
  height: 19px;
}

.scr-tab.is-active {
  color: var(--scr-orange);
}

.scr-tab--donate {
  flex: none;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #000;
  color: #fff;
}

.scr-tabbar__home {
  position: relative;
  height: 22px;
}

.scr-tabbar__home::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 6px;
  width: 114px;
  height: 4px;
  transform: translateX(-50%);
  border-radius: 999px;
  background: #000;
}
</style>
