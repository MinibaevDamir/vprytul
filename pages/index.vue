<script setup lang="ts">
const { guideUrl, siteUrl } = useRuntimeConfig().public
const { trackGuideOpen } = useAnalytics()

const title = 'Впритул — застосунок Благодійного фонду Сергія Притули'
const description =
  'Впритул: зменшуй дистанцію до дії та людей. Застосунок Фонду Притули — гейміфікація благодійності: щоденні квести, донати за підпискою, голосування та закрита спільнота. Завантажуй в App Store і Google Play.'

useSeoMeta({
  title,
  description,
  keywords:
    'впритул застосунок, додаток фонду притули, гейміфікація благодійності, квести, донати, благодійний фонд сергія притули',
  ogTitle: title,
  ogDescription: description,
  ogType: 'website',
  ogUrl: siteUrl,
  ogImage: `${siteUrl}/og.png`,
  ogLocale: 'uk_UA',
  twitterCard: 'summary_large_image',
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: `${siteUrl}/og.png`
})

useHead({
  link: [{ rel: 'canonical', href: siteUrl }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'MobileApplication',
        name: 'Впритул',
        operatingSystem: 'iOS, Android',
        applicationCategory: 'LifestyleApplication',
        description,
        author: {
          '@type': 'NGO',
          name: 'Благодійний фонд Сергія Притули',
          url: 'https://prytulafoundation.org'
        }
      })
    }
  ]
})

const features = [
  {
    id: 'quests',
    title: 'Квести та місії',
    text: 'Щоденні завдання, інформаційні та вірусні квести. Мікро-дії, які конвертуються в реальну допомогу.'
  },
  {
    id: 'donations',
    title: 'Система донатів',
    text: 'Підписка на регулярні донати — так само легко, як створити банку. Бали участі нараховуються автоматично.'
  },
  {
    id: 'voting',
    title: 'Голосування та рейтинг',
    text: 'Бали за активність підсилюють вагу твого голосу в рішеннях Фонду. Допомагаєш більше — впливаєш більше.'
  },
  {
    id: 'community',
    title: 'Спільнота',
    text: 'Закриті чати однодумців, прямий зв’язок із командою Фонду та детальні звіти про кожну зібрану гривню.'
  }
]
</script>

<template>
  <div class="page">
    <!-- ШАПКА -->
    <header class="topbar">
      <div class="container topbar__inner">
        <BrandLogo tone="light" class="topbar__logo" />
        <a class="topbar__link" href="https://prytulafoundation.org" rel="noopener">
          Проєкт Благодійного фонду Сергія Притули
        </a>
      </div>
    </header>

    <!-- БЛОК 1: ГОЛОВНИЙ ЕКРАН -->
    <section class="hero">
      <div class="container hero__inner">
        <div class="hero__copy">
          <p class="hero__eyebrow">
            <span class="hero__chev hero__chev--in"><ChevronMark /></span>
            Застосунок, що грає за перемогу
          </p>
          <h1 class="hero__title">
            Впритул<span class="hero__title-colon">:</span><br />
            зменшуй дистанцію<br />
            <span class="hero__title-accent">до дії та людей</span>
          </h1>
          <p class="hero__sub">
            Твій персональний простір гейміфікованої допомоги, закрита спільнота однодумців та
            єдине вікно для системної підтримки Фонду.
          </p>
          <StoreButtons tone="light" class="hero__stores" />
          <p class="hero__note">Безплатно. Для iOS та Android.</p>
        </div>

        <div class="hero__visual">
          <PhoneMockup class="hero__phone" />
        </div>
      </div>
      <BarcodeStrip class="hero__barcode" />
    </section>

    <!-- БЛОК 2: ПРО ПРОЄКТ ТА КЛЮЧОВІ МЕХАНІКИ -->
    <section class="features" aria-labelledby="features-title">
      <div class="container">
        <TapeLabel>Що всередині</TapeLabel>
        <h2 id="features-title" class="features__title">
          Допомога, зібрана<br />в один застосунок
        </h2>

        <ul class="features__grid">
          <li v-for="f in features" :key="f.id" class="feature">
            <span class="feature__icon" aria-hidden="true">
              <svg v-if="f.id === 'quests'" viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="14" r="10" stroke="currentColor" stroke-width="2.2" />
                <circle cx="14" cy="14" r="5.5" stroke="currentColor" stroke-width="2.2" />
                <circle cx="14" cy="14" r="1.6" fill="currentColor" />
              </svg>
              <svg v-else-if="f.id === 'donations'" viewBox="0 0 28 28" fill="none">
                <path
                  d="M14 23s-8.4-5.2-10.4-10A5.8 5.8 0 0 1 14 8.6 5.8 5.8 0 0 1 24.4 13c-2 4.8-10.4 10-10.4 10Z"
                  stroke="currentColor"
                  stroke-width="2.2"
                  stroke-linejoin="round"
                />
                <path d="M9 13.5h3l1.5-3 2 5 1.5-2.5h2" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round" />
              </svg>
              <svg v-else-if="f.id === 'voting'" viewBox="0 0 28 28" fill="none">
                <rect x="4" y="11" width="20" height="13" rx="2" stroke="currentColor" stroke-width="2.2" />
                <path d="M9.5 11V7.8A2.8 2.8 0 0 1 12.3 5h3.4a2.8 2.8 0 0 1 2.8 2.8V11" stroke="currentColor" stroke-width="2.2" />
                <path d="m10 17 2.7 2.7L18.5 14" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <svg v-else viewBox="0 0 28 28" fill="none">
                <path
                  d="M4 8.5A3.5 3.5 0 0 1 7.5 5h9A3.5 3.5 0 0 1 20 8.5v4a3.5 3.5 0 0 1-3.5 3.5H10l-4.4 3.6c-.7.5-1.6 0-1.6-.8V8.5Z"
                  stroke="currentColor"
                  stroke-width="2.2"
                  stroke-linejoin="round"
                />
                <path d="M22.5 11.5c.9.6 1.5 1.6 1.5 2.8v7.4c0 .8-1 1.3-1.6.8L18.5 19H15a3.5 3.5 0 0 1-2.4-1" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round" />
              </svg>
            </span>
            <h3 class="feature__title">{{ f.title }}</h3>
            <p class="feature__text">{{ f.text }}</p>
          </li>
        </ul>
      </div>
    </section>

    <!-- БЛОК 3: КОРИСТУВАЦЬКИЙ ГІД -->
    <section class="guide" aria-labelledby="guide-title">
      <div class="container guide__inner">
        <div class="guide__copy">
          <h2 id="guide-title" class="guide__title">Користувацький гід</h2>
          <p class="guide__text">
            Покроковий мануал: як зареєструватися, проходити квести, підключити підписку на донати
            й голосувати за рішення Фонду.
          </p>
        </div>
        <a
          v-if="guideUrl"
          class="guide__btn"
          :href="guideUrl"
          target="_blank"
          rel="noopener"
          @click="trackGuideOpen()"
        >
          Прочитати гід
          <ChevronMark class="guide__btn-chev" />
        </a>
        <span v-else class="guide__btn guide__btn--soon" aria-disabled="true">
          Гід з’явиться тут із релізом застосунку
        </span>
      </div>
    </section>

    <!-- ФІНАЛЬНИЙ ЗАКЛИК -->
    <section class="cta" aria-labelledby="cta-title">
      <div class="container cta__inner">
        <span class="cta__chev"><ChevronMark /></span>
        <h2 id="cta-title" class="cta__title">Будь впритул<br />до перемоги</h2>
        <p class="cta__text">Встанови застосунок — і кожна твоя дія працюватиме на результат.</p>
        <StoreButtons tone="light" />
      </div>
      <BarcodeStrip class="cta__barcode" />
    </section>

    <!-- БЛОК 4: ЮРИДИЧНИЙ ПІДВАЛ -->
    <footer class="footer">
      <div class="container">
        <div class="footer__warning">
          <BrandLogo tone="light" class="footer__logo" />
          <p>
            «Впритул» — офіційний цифровий сервіс Благодійного фонду Сергія Притули. Завантажуйте
            застосунок лише з офіційних маркетів App Store та Google Play. Фонд ніколи не просить
            ваші паролі чи повні дані карток. Персональні дані користувачів захищені та
            обробляються відповідно до законодавства України.
          </p>
        </div>

        <nav class="footer__links" aria-label="Правові документи">
          <NuxtLink to="/privacy-policy">Політика конфіденційності</NuxtLink>
          <NuxtLink to="/terms-of-use">Умови використання</NuxtLink>
          <NuxtLink to="/data-protection">Політика захисту даних</NuxtLink>
          <NuxtLink to="/license">Ліцензійні документи</NuxtLink>
        </nav>

        <div class="footer__bottom">
          <span>© {{ new Date().getFullYear() }} Благодійний фонд Сергія Притули</span>
          <a href="https://prytulafoundation.org" rel="noopener">prytulafoundation.org</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* ---------- Шапка ---------- */
.topbar {
  background: var(--ink);
}

.topbar__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-block: 20px;
}

.topbar__logo {
  font-size: 22px;
}

.topbar__link {
  color: var(--bone);
  font-size: 0.8rem;
  text-decoration: none;
  border-bottom: 1px solid rgba(215, 216, 211, 0.35);
  padding-bottom: 2px;
  transition: color 0.15s ease, border-color 0.15s ease;
}

.topbar__link:hover {
  color: var(--orange);
  border-color: var(--orange);
}

/* ---------- Hero ---------- */
.hero {
  background: var(--ink);
  color: var(--bone);
  position: relative;
  overflow: hidden;
}

.hero__inner {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
  align-items: center;
  gap: 48px;
  padding-block: 72px 96px;
}

.hero__eyebrow {
  display: flex;
  align-items: center;
  gap: 14px;
  margin: 0 0 28px;
  font-family: var(--font-display);
  font-weight: 500;
  font-size: 0.85rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--orange);
}

.hero__chev {
  width: 44px;
  color: var(--orange);
}

.hero__chev--in :deep(svg) {
  overflow: visible;
}

.hero__chev--in :deep(path:nth-child(1)),
.hero__chev--in :deep(path:nth-child(2)) {
  animation: chev-left 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) both;
}

.hero__chev--in :deep(path:nth-child(3)),
.hero__chev--in :deep(path:nth-child(4)) {
  animation: chev-right 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) both;
}

@keyframes chev-left {
  from {
    transform: translateX(-26px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes chev-right {
  from {
    transform: translateX(26px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.hero__title {
  margin: 0;
  font-family: var(--font-display);
  font-weight: 900;
  font-size: clamp(2.4rem, 5.4vw, 4.3rem);
  line-height: 1.02;
  text-transform: uppercase;
  color: var(--paper);
  letter-spacing: 0.01em;
}

.hero__title-colon {
  color: var(--orange);
}

.hero__title-accent {
  color: var(--orange);
}

.hero__sub {
  max-width: 46ch;
  margin: 28px 0 36px;
  font-size: 1.02rem;
  line-height: 1.75;
  color: var(--bone);
}

.hero__note {
  margin: 18px 0 0;
  font-size: 0.78rem;
  color: rgba(215, 216, 211, 0.6);
}

.hero__visual {
  display: flex;
  justify-content: center;
}

.hero__phone {
  transform: rotate(2deg);
}

.hero__barcode {
  color: rgba(215, 216, 211, 0.28);
}

/* ---------- Features ---------- */
.features {
  background: var(--paper);
  padding-block: 88px 96px;
}

.features__title {
  margin: 26px 0 48px;
  font-family: var(--font-display);
  font-weight: 900;
  font-size: clamp(1.8rem, 3.6vw, 2.8rem);
  line-height: 1.05;
  text-transform: uppercase;
}

.features__grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 20px;
}

.feature {
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: var(--radius-card);
  padding: 28px 24px 30px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.feature:hover {
  transform: translateY(-6px);
  box-shadow: 0 22px 44px rgba(29, 29, 27, 0.1);
}

.feature__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: var(--orange);
  color: var(--ink);
}

.feature__icon svg {
  width: 28px;
  height: 28px;
}

.feature__title {
  margin: 22px 0 10px;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.08rem;
  line-height: 1.25;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

.feature__text {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.7;
  color: var(--ash);
}

/* ---------- Guide ---------- */
.guide {
  background: var(--orange);
  color: var(--ink);
}

.guide__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
  padding-block: 56px;
}

.guide__title {
  margin: 0 0 12px;
  font-family: var(--font-display);
  font-weight: 900;
  font-size: clamp(1.5rem, 2.8vw, 2.1rem);
  text-transform: uppercase;
}

.guide__text {
  margin: 0;
  max-width: 52ch;
  font-size: 0.95rem;
  line-height: 1.7;
}

.guide__btn {
  flex: none;
  display: inline-flex;
  align-items: center;
  gap: 14px;
  padding: 18px 30px;
  background: var(--ink);
  color: var(--paper);
  border-radius: 14px;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  text-decoration: none;
  transition: transform 0.15s ease;
}

.guide__btn:hover {
  transform: translateY(-2px);
}

.guide__btn-chev {
  width: 34px;
  color: var(--orange);
}

.guide__btn--soon {
  background: rgba(29, 29, 27, 0.12);
  color: var(--ink);
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 0.85rem;
  text-transform: none;
  letter-spacing: 0;
  cursor: default;
}

/* ---------- Фінальний CTA ---------- */
.cta {
  background: var(--ink);
  color: var(--bone);
  position: relative;
}

.cta__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-block: 88px 72px;
}

.cta__chev {
  width: 64px;
  color: var(--orange);
  margin-bottom: 26px;
}

.cta__title {
  margin: 0;
  font-family: var(--font-display);
  font-weight: 900;
  font-size: clamp(2rem, 4.6vw, 3.4rem);
  line-height: 1.04;
  text-transform: uppercase;
  color: var(--paper);
}

.cta__text {
  margin: 20px 0 36px;
  max-width: 44ch;
  color: var(--bone);
  font-size: 0.98rem;
  line-height: 1.7;
}

.cta__barcode {
  color: rgba(215, 216, 211, 0.14);
  transform: scaleY(-1);
}

/* ---------- Footer ---------- */
.footer {
  background: var(--ink);
  color: var(--bone);
  padding-block: 64px 40px;
  border-top: 1px solid rgba(215, 216, 211, 0.14);
}

.footer__warning {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 36px;
  align-items: start;
  max-width: 880px;
}

.footer__logo {
  font-size: 26px;
}

.footer__warning p {
  margin: 0;
  font-size: 0.85rem;
  line-height: 1.8;
  color: rgba(215, 216, 211, 0.8);
}

.footer__links {
  display: flex;
  flex-wrap: wrap;
  gap: 12px 36px;
  margin-top: 44px;
  padding-top: 28px;
  border-top: 1px solid rgba(215, 216, 211, 0.16);
}

.footer__links a {
  color: var(--bone);
  font-size: 0.85rem;
  text-decoration: none;
  border-bottom: 1px solid rgba(215, 216, 211, 0.3);
  padding-bottom: 2px;
  transition: color 0.15s ease, border-color 0.15s ease;
}

.footer__links a:hover {
  color: var(--orange);
  border-color: var(--orange);
}

.footer__bottom {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 12px;
  margin-top: 40px;
  font-size: 0.75rem;
  color: rgba(215, 216, 211, 0.55);
}

.footer__bottom a {
  color: inherit;
  text-decoration: none;
}

.footer__bottom a:hover {
  color: var(--orange);
}

/* ---------- Адаптив ---------- */
@media (max-width: 900px) {
  .hero__inner {
    grid-template-columns: 1fr;
    padding-block: 56px 72px;
  }

  .hero__phone {
    transform: none;
  }

  .features__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .guide__inner {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 560px) {
  .features__grid {
    grid-template-columns: 1fr;
  }

  .footer__warning {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .topbar__link {
    display: none;
  }
}
</style>
