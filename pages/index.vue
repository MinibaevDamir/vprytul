<script setup lang="ts">
const { siteUrl, guideUrl } = useRuntimeConfig().public;
const { trackGuideOpen } = useAnalytics();

const title = "Впритул — застосунок Благодійного фонду Сергія Притули";
const description =
  "Впритул: зменшуй дистанцію до дії та людей. Застосунок Фонду Притули — гейміфікація благодійності: щоденні квести, донати за підпискою, голосування та закрита спільнота. Завантажуй в App Store і Google Play.";

useSeoMeta({
  title,
  description,
  keywords:
    "впритул застосунок, додаток фонду притули, гейміфікація благодійності, квести, донати, благодійний фонд сергія притули",
  ogTitle: title,
  ogDescription: description,
  ogType: "website",
  ogUrl: siteUrl,
  ogImage: `${siteUrl}/og.png`,
  ogLocale: "uk_UA",
  twitterCard: "summary_large_image",
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: `${siteUrl}/og.png`,
});

useHead({
  // фон полотна під сторінкою — колір верху hero, див. html.is-landing у main.css
  htmlAttrs: { class: "is-landing" },
  link: [{ rel: "canonical", href: siteUrl }],
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "MobileApplication",
        name: "Впритул",
        operatingSystem: "iOS, Android",
        applicationCategory: "LifestyleApplication",
        description,
        author: {
          "@type": "NGO",
          name: "Благодійний фонд Сергія Притули",
          url: "https://prytulafoundation.org",
        },
      }),
    },
  ],
});

// Довжина прокрутки стрічки телефона (від PhoneMockup) — на неї hero
// подовжується вниз, поки sticky-блок стоїть і «гортається» екран телефона
const phoneScroll = ref(0);

// Ілюстрації розміщені як у макеті (805:2405): x/y — зсув від лівого верхнього
// кута рамки механіки (1049×570). На вужчих екранах ідуть у потік.
// m — мобільний макет (660:2284): ширина ілюстрації (для нових ілюстрацій —
// у тій самій пропорції до десктопу, що й у макеті), ширина першого абзацу і
// піксельна «хмара» фону на стику рамок (x/y — від лівого верхнього кута рамки).
const features = [
  {
    id: "quests",
    title: "Квести",
    side: "left",
    paras: [
      "Завдання, які приносять користь тут і зараз, із нарахуванням балів за успішне виконання",
      "Участь у всеукраїнських та локальних акціях і заходах: донація крові, плетіння сіток, допомога в притулках для тварин, розбір сміття після прильотів, толоки.",
    ],
    art: { src: "/img/art-quests.svg", w: 474.304, h: 356.369, x: 555, y: 78 },
    m: {
      w: 292.7,
      p1w: 329,
      cloud: { src: "/img/cloud-2.svg", x: -50, y: -80.7, w: 410, h: 200, r: 180 },
    },
  },
  {
    id: "learning",
    title: "Навчання",
    side: "right",
    paras: [
      "Інтерактивні та практичні освітні кампанії, перевірені фахівцями Фонду та профільними експертами",
      "Оборонні технології, перша домедична допомога, кібербезпека, основи OSINT, правовий навігатор, ментальне здоров’я і багато іншого",
    ],
    art: { src: "/img/art-learning.svg", w: 440.323, h: 457.639, x: 23, y: 62.8 },
    m: {
      w: 306.4,
      p1w: 295,
      cloud: { src: "/img/cloud-3.svg", x: -355, y: -227.6, w: 1068, h: 388 },
    },
  },
  {
    id: "donations",
    title: "Донати",
    side: "left",
    paras: [
      "Підтримка разово або за підпискою. Бо донат — це база, і тут ми не вигадали нічого нового!",
      "Донати за напрямами: мілітарний, гуманітарний, інституційний. А також усі актуальні збори Фонду, що регулярно оновлюються",
    ],
    art: { src: "/img/art-donations.svg", w: 302.126, h: 478.362, x: 596, y: 31.2 },
    m: {
      w: 210.3,
      p1w: 329,
      cloud: { src: "/img/cloud-4.svg", x: -601, y: -230.1, w: 1048, h: 400 },
    },
  },
  {
    id: "community",
    title: "Спільнота",
    side: "right",
    paras: [
      "Гуртування по осередках. Обговорення ініціатив та проблем своєї громади, пошук та втілення рішень",
      "Загальний та окремі чати за регіонами для спілкування та обміну досвідом. Зустрічі з однодумцями на офлайн-подіях Фонду або партнерів",
    ],
    art: { src: "/img/art-community.svg", w: 461, h: 449.328, x: 33, y: 67.3 },
    m: {
      w: 320.8,
      p1w: 329,
      cloud: { src: "/img/cloud-3.svg", x: -297, y: -257.9, w: 1068, h: 388 },
    },
  },
  {
    id: "voting",
    title: "Голосування",
    side: "left",
    paras: [
      "Участь у прийнятті важливих рішень спільноти, адже складні питання не вирішуються одноосібно",
      "Обрання тем освітніх кампаній та запрошених експертів, вибір напрямів активностей. Назви зборів та амбасадорів, які підтримуватимуть цей збір",
    ],
    art: { src: "/img/art-voting.svg", w: 421.746, h: 378.711, x: 592, y: 97 },
    m: {
      w: 293.5,
      p1w: 322,
      cloud: { src: "/img/cloud-3.svg", x: -576, y: -249.8, w: 1068, h: 388 },
    },
  },
];

// Кутові мітки рамки механіки: лівий/правий верхній, лівий/правий нижній
const marks = ["tl", "tr", "bl", "br"];

// Документи — окремі сторінки, англійські версії під /en/… (зі сторінок
// документа на них веде перемикач UA/EN).
// Бейджі EN тимчасово приховані — щоб повернути, достатньо true
const showEnglishDocs = false;
const legalDocs = [
  {
    label: "Умови використання",
    to: "/terms-of-use",
    hrefEn: "/en/terms-of-use",
  },
  {
    label: "Політика конфіденційності",
    to: "/privacy-policy",
    hrefEn: "/en/privacy-policy",
  },
  {
    label: "Політика захисту даних",
    to: "/data-protection-policy",
    hrefEn: "/en/data-protection-policy",
  },
];
</script>


<template>
  <div class="page">
    <!-- БЛОК 1: ГОЛОВНИЙ ЕКРАН -->
    <section
      class="hero"
      data-phone-pin
      :style="{ '--phone-scroll': `${phoneScroll}px` }"
    >
      <div class="hero__sticky">
        <!-- піксельний перехід фону: десктоп — дизеринг, мобільний — «хмара» -->
        <PixelShimmer
          class="hero__dither"
          src="/img/bg-hero.svg"
          :view="[0, 1715, 1440, 537]"
          tile
        />
        <PixelShimmer class="hero__cloud" src="/img/cloud-1.svg" />
        <div class="container hero__inner">
          <div class="hero__copy">
            <h1 class="hero__title">
              <picture>
                <!-- на мобільному логотип в один рядок -->
                <source
                  media="(max-width: 700px)"
                  srcset="/img/logo-line.svg"
                  width="322"
                  height="37"
                />
                <img
                  class="hero__logo"
                  src="/img/logo.svg"
                  width="550"
                  height="238"
                  alt="Впритул"
                />
              </picture>
              <span class="hero__slogan">до дії та людей</span>
            </h1>
            <StoreButtons class="hero__stores" />
            <p class="hero__lead">
              Навички цивільної стійкості, спільнота підтримки і системна
              благодійність – в єдиному цифровому сервісі
            </p>
            <p class="hero__text">
              Ми створили цей застосунок, щоб гуртувати суспільство навколо
              системної підтримки Сил оборони України, готуватися бути надійною
              опорою для себе й інших, діяти впевнено та разом розвивати свої
              громади — щодня, а не від кризи до кризи
            </p>
          </div>

          <!-- обгортка — слот телефона: на мобільному він займає висоту,
               що лишилась у першому екрані -->
          <div class="hero__phone">
            <PhoneMockup class="hero__device" @range="phoneScroll = $event" />
          </div>
        </div>
      </div>
      <div class="hero__spacer" aria-hidden="true" />
    </section>

    <!-- БЛОК 2: КЛЮЧОВІ МЕХАНІКИ -->
    <section class="features" aria-labelledby="features-title">
      <div class="container">
        <h2 id="features-title" class="features__title">Що всередині</h2>

        <ul class="features__list">
          <li
            v-for="f in features"
            :key="f.id"
            v-reveal.mark
            class="feature"
            :class="`feature--${f.side}`"
            :style="{
              '--p1w': `${f.m.p1w}px`,
              '--cx': `${f.m.cloud.x}px`,
              '--cy': `${f.m.cloud.y}px`,
              '--cw': `${f.m.cloud.w}px`,
              '--ch': `${f.m.cloud.h}px`,
            }"
          >
            <span
              v-for="c in marks"
              :key="c"
              class="feature__mark"
              :class="`feature__mark--${c}`"
              aria-hidden="true"
            />
            <!-- «хмари» між блоками статичні: джитер лише вгорі й унизу сторінки -->
            <PixelShimmer
              class="feature__cloud"
              :src="f.m.cloud.src"
              :flip="f.m.cloud.r === 180"
              still
            />
            <div v-reveal class="feature__copy">
              <h3 class="feature__title">{{ f.title }}</h3>
              <p v-for="(p, i) in f.paras" :key="i" class="feature__text">
                {{ p }}
              </p>
            </div>
            <img
              v-reveal="120"
              class="feature__art"
              :src="f.art.src"
              :width="f.art.w"
              :height="f.art.h"
              :style="{
                '--x': `${f.art.x}px`,
                '--y': `${f.art.y}px`,
                '--mw': `${f.m.w}px`,
              }"
              alt=""
              loading="lazy"
              decoding="async"
            />
          </li>
        </ul>
      </div>
    </section>

    <div class="finale">
      <PixelShimmer
        class="finale__dither"
        src="/img/bg-finale.svg"
        tile
      />
      <PixelShimmer class="finale__cloud" src="/img/cloud-4.svg" />
      <!-- ФІНАЛЬНИЙ ЗАКЛИК -->
      <section class="cta" aria-labelledby="cta-title">
        <div class="container cta__inner">
          <h2 id="cta-title" v-reveal class="cta__title">
            <!-- у мобільному макеті рядки без розділових знаків -->
            Зменшуй дистанцію<span class="cta__punct">.</span><br />
            будь впритул<span class="cta__punct">.</span><br />
            завантажуй застосунок<span class="cta__punct">!</span>
          </h2>
          <StoreButtons v-reveal="120" size="lg" class="cta__stores" />
          <PixelShimmer class="cta__chevrons" src="/img/chevrons.svg" still />
        </div>
      </section>

      <!-- БЛОК 4: ЮРИДИЧНИЙ ПІДВАЛ -->
      <footer class="footer">
        <div class="container footer__inner">
          <p class="footer__warning">
            «Впритул» — офіційний цифровий сервіс Благодійного фонду Сергія
            Притули. Застосунок доступний до завантаження з офіційних маркетів
            App Store та Google Play. Фонд ніколи не просить паролі чи повні
            дані карток. Персональні дані користувачів захищені та обробляються
            відповідно до законодавства України.
          </p>

          <nav class="footer__links" aria-label="Документи">
            <a
              class="footer__link"
              :href="guideUrl"
              target="_blank"
              rel="noopener"
              @click="trackGuideOpen()"
              >Користувацький гід</a
            >
            <span v-for="doc in legalDocs" :key="doc.label" class="footer__doc">
              <NuxtLink class="footer__link" :to="doc.to">{{
                doc.label
              }}</NuxtLink>
              <a
                v-if="showEnglishDocs"
                class="footer__lang"
                :href="doc.hrefEn"
                rel="noopener"
                hreflang="en"
                :aria-label="`${doc.label} — English version`"
                >EN</a
              >
            </span>
          </nav>

          <img
            class="footer__divider"
            src="/img/divider.svg"
            width="1059"
            height="1"
            alt=""
          />

          <p class="footer__copy">
            © {{ new Date().getFullYear() }} Благодійний фонд Сергія Притули
          </p>
          <a
            class="footer__link footer__site"
            href="https://prytulafoundation.org"
            rel="noopener"
            >prytulafoundation.org</a
          >
        </div>
      </footer>
    </div>
  </div>
</template>

<style scoped>
/* Координати у коментарях — з макета 1440px (Figma 699:1785) */

/* Піксельні «хмари» фону виходять за краї екрана */
.page {
  overflow-x: clip;
}

/* ---------- Hero ---------- */
.hero {
  position: relative;
}

/* Власний шар, щоб фон-дизеринг лягав під контент, але над фоном сторінки */
.hero__sticky {
  position: relative;
  isolation: isolate;
  display: flex;
  flex-direction: column;
}

/* Фон hero: суцільний #323232, що внизу розсипається «пікселями» і
   заходить на 216px у секцію механік (як у макеті до y≈1197).
   Суцільна частина — тут, піксельна смуга 1440×537 — PixelShimmer */
.hero__sticky::before {
  content: "";
  position: absolute;
  inset: 0 0 calc(537px - 216px);
  z-index: -1;
  pointer-events: none;
  background: var(--surface);
}

.hero__dither {
  position: absolute;
  left: 0;
  right: 0;
  bottom: -216px;
  height: 537px;
  z-index: -1;
}

.hero__cloud {
  display: none;
}

/* Подовжує hero на довжину стрічки телефона: поки sticky-блок стоїть,
   скрол «витрачається» на прогортання екрана */
.hero__spacer {
  display: none;
}

.hero__inner {
  width: 100%;
  display: grid;
  grid-template-columns: minmax(0, 550px) var(--phone-w);
  justify-content: space-between;
  align-items: center;
  /* лівий край тексту і правий край телефона — як у макеті */
  padding-left: calc(24px + 5px);
  padding-right: calc(24px + 13px);
  --phone-w: 372px;
}

@media (min-width: 901px) {
  .hero__sticky {
    position: sticky;
    top: 0;
    min-height: 100dvh;
  }

  .hero__inner {
    flex: 1;
    padding-block: 40px;
    /* телефон не вищий за пін-вьюпорт */
    --phone-w: min(372px, calc((100dvh - 80px) * 0.48025));
  }

  .hero__spacer {
    display: block;
    height: var(--phone-scroll, 0px);
  }
}

.hero__copy {
  container-type: inline-size;
}

.hero__title {
  margin: 0;
  font-weight: 400;
}

.hero__logo {
  width: 100%;
  height: auto;
}

/* 64px при ширині колонки 550px; на вужчих — пропорційно логотипу */
.hero__slogan {
  display: block;
  margin-left: calc(5 / 550 * 100cqi);
  font-family: var(--font-display);
  font-weight: 800;
  font-size: calc(64 / 550 * 100cqi);
  line-height: normal;
  text-transform: uppercase;
  white-space: nowrap;
  color: var(--cream);
}

.hero__stores {
  margin-top: 19px;
}

.hero__lead,
.hero__text {
  margin: 0;
  font-size: 16px;
  line-height: normal;
  color: var(--cream);
}

.hero__lead {
  margin-top: 27px;
}

.hero__text {
  margin-top: 65px;
  margin-left: -3px;
}

.hero__phone {
  width: var(--phone-w);
  justify-self: end;
}

/* ---------- Механіки ---------- */
.features {
  position: relative;
  z-index: 1;
  padding-top: 74px;
}

.features__title {
  margin: 0 0 82px 2px;
  font-family: var(--font-display);
  font-weight: 800;
  font-size: clamp(40px, 6.667vw, 96px);
  line-height: normal;
  text-transform: uppercase;
  color: var(--mist);
}

.features__list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.feature {
  position: relative;
  min-height: 570px;
}

/* Кутові мітки рамки — кути ассета з макета в нативному розмірі. Кожна мітка
   показує лівий верхній кут svg, решта — його дзеркала (scale), тож сусідні
   рамки разом дають мітки «├ ┤», як у макеті */
.feature__mark {
  position: absolute;
  width: 23px;
  height: 23px;
  background: url("/img/frame-corners.svg") left top / auto no-repeat;
  pointer-events: none;
}

.feature__mark--tl {
  left: -2px;
  top: -2px;
}

.feature__mark--tr {
  right: -2px;
  top: -2px;
  scale: -1 1;
}

.feature__mark--bl {
  left: -2px;
  bottom: -2px;
  scale: 1 -1;
}

.feature__mark--br {
  right: -2px;
  bottom: -2px;
  scale: -1;
}

/* Мітки «наводяться», як рамка фокусу у видошукачі камери: коли рамка
   потрапляє в кадр (v-reveal.mark), мітки вилазять ззовні, проскакують трохи
   всередину, фіксуються й двічі блимають. Зсув — transform у системі мітки:
   для дзеркальних міток той самий translate веде у свій бік. Без v-reveal
   (prefers-reduced-motion) мітки просто стоять на місці */
.feature.reveal-mark .feature__mark {
  opacity: 0;
}

.feature.reveal-mark.is-rev .feature__mark {
  opacity: 1;
  animation: viewfinder 1.1s cubic-bezier(0.2, 0.8, 0.2, 1) both;
}

@keyframes viewfinder {
  0% {
    transform: translate(-34px, -34px);
    opacity: 0;
  }
  12% {
    opacity: 1;
  }
  42% {
    transform: translate(8px, 8px);
  }
  58% {
    transform: none;
    opacity: 1;
  }
  68% {
    opacity: 0.15;
  }
  76% {
    opacity: 1;
  }
  84% {
    opacity: 0.15;
  }
  92%,
  100% {
    transform: none;
    opacity: 1;
  }
}

.feature__copy {
  max-width: 451px;
}

.feature__title {
  margin: 0;
  font-family: var(--font-display);
  font-weight: 900;
  font-size: 64px;
  line-height: normal;
  text-transform: uppercase;
  color: var(--orange);
}

.feature__text {
  margin: 0;
  font-size: 20px;
  line-height: normal;
  color: var(--mist);
}

.feature__title + .feature__text {
  margin-top: 36px;
}

.feature__text + .feature__text {
  margin-top: 60px;
}

.feature__art {
  max-width: 100%;
  height: auto;
}

@media (min-width: 1100px) {
  .feature {
    height: 570px;
    padding: 83px 39px 0;
  }

  .feature--right .feature__copy {
    margin-left: 518px;
  }

  .feature__art {
    position: absolute;
    left: var(--x);
    top: var(--y);
    max-width: none;
  }

  /* У макеті два абзаци ширші за колонку */
  .feature:nth-child(4) .feature__text:first-of-type {
    margin-right: -11px;
  }

  .feature:last-child .feature__text:last-of-type {
    margin-right: -39px;
  }
}

@media (max-width: 1099px) {
  .feature {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    align-items: center;
    gap: 40px;
    padding: 64px 40px;
  }

  .feature--right .feature__art {
    order: -1;
  }

  .feature__art {
    justify-self: center;
  }

  .feature__title {
    font-size: clamp(36px, 5.8vw, 64px);
  }

  .feature__text {
    font-size: 18px;
  }

  .feature__title + .feature__text {
    margin-top: 28px;
  }

  .feature__text + .feature__text {
    margin-top: 24px;
  }
}

/* ---------- Фінальний заклик і підвал ---------- */
.finale {
  position: relative;
  z-index: 0;
  padding-top: 142px;
}

/* Фон підвалу: «пікселі» з y≈3890 (PixelShimmer, смуга 1440×537) стають
   суцільним #323232 до кінця сторінки */
.finale::before {
  content: "";
  position: absolute;
  inset: calc(537px - 222px) 0 0;
  z-index: -1;
  pointer-events: none;
  background: var(--surface);
}

.finale__dither {
  position: absolute;
  left: 0;
  right: 0;
  top: -222px;
  height: 537px;
  z-index: -1;
}

.finale__cloud,
.feature__cloud {
  display: none;
}

.cta__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.cta__title {
  margin: 0;
  font-family: var(--font-display);
  font-weight: 800;
  font-size: clamp(26px, 4.444vw, 64px);
  line-height: 0.9375;
  text-transform: uppercase;
  color: var(--orange);
}

.cta__stores {
  justify-content: center;
  margin-top: 47px;
}

.cta__chevrons {
  margin-top: 46px;
  width: 635px;
  max-width: 100%;
  aspect-ratio: 635 / 259;
}

.footer {
  padding: 46px 0 96px;
}

.footer__inner {
  padding-inline: calc(24px + 12px);
}

.footer__warning {
  margin: 0;
  font-size: 14px;
  line-height: normal;
}

.footer__links {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  /* мінімальний проміжок: чотири посилання з бейджами EN мають влізти в рядок */
  gap: 16px;
  margin-top: 37px;
}

.footer__doc {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.footer__link {
  font-size: 16px;
  line-height: normal;
  color: var(--cream);
  text-decoration: underline;
  text-decoration-skip-ink: none;
  transition: color 0.15s ease;
}

.footer__link:hover,
.footer__lang:hover {
  color: var(--orange);
}

.footer__lang {
  font-size: 11px;
  line-height: 1;
  letter-spacing: 0.04em;
  color: var(--mist);
  text-decoration: none;
  border: 1px solid rgba(203, 204, 198, 0.4);
  border-radius: 4px;
  padding: 3px 5px 2px;
  transition: color 0.15s ease, border-color 0.15s ease;
}

.footer__lang:hover {
  border-color: var(--orange);
}

/* Лінія в макеті на 5px ширша за текстовий блок з кожного боку */
.footer__divider {
  width: calc(100% + 34px);
  max-width: none;
  height: 1px;
  margin: 49px -17px 0;
}

.footer__copy {
  margin: 50px 0 0;
  font-size: 16px;
  line-height: normal;
}

.footer__site {
  display: inline-block;
  margin-top: 22px;
}

/* ---------- Адаптив ---------- */
@media (max-width: 900px) {
  .hero__inner {
    grid-template-columns: minmax(0, 1fr);
    justify-items: center;
    gap: 56px;
    padding: 56px 24px 72px;
    --phone-w: min(320px, 82vw);
  }

  .hero__copy {
    width: min(100%, 550px);
  }

  .hero__phone {
    justify-self: center;
  }

  .features {
    padding-top: 40px;
  }

  .features__title {
    margin-bottom: 48px;
  }

  .finale {
    padding-top: 96px;
  }

  .footer__inner {
    padding-inline: 24px;
  }

  .footer__divider {
    width: 100%;
    margin-inline: 0;
  }
}
/* ---------- Мобільний макет (Figma 660:2284, екран 402px) ----------
   Відступи — з макета; --col — ширина текстової колонки (322px на 402px) */
@media (max-width: 700px) {
  .page {
    --col: min(100vw - 80px, 480px);
  }

  /* Фон hero — лише піксельна «хмара» вгорі, без суцільної підкладки */
  .hero__sticky::before,
  .hero__dither {
    display: none;
  }

  .hero__cloud {
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 855px;
    height: 319px;
    z-index: -1;
  }

  /* Порядок як у макеті: логотип, слоган, телефон, кнопки, тексти.
     Перший екран — логотип, телефон, кнопки і перший абзац з однаковими
     відступами --gap між усім (і від країв екрана); другий абзац — уже за
     краєм. Висота — svh, з розгорнутими панелями браузера, як при відкритті
     сторінки: vh в iOS рахує без панелей (низ ховався під ними), а dvh
     змінюється під час скролу і смикав би мокап. */
  .hero__inner {
    --screen: 100vh;
    --gap: clamp(10px, var(--screen) * 0.024, 20px);
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: auto minmax(0, 1fr) auto auto;
    justify-items: stretch;
    gap: 0;
    max-width: calc(480px + 80px);
    padding: var(--gap) 40px 0;
  }

  @supports (height: 100svh) {
    .hero__inner {
      --screen: 100svh;
    }
  }

  /* Задає першим чотирьом рядам висоту екрана; гнучкий ряд телефона
     забирає все, що лишилось після логотипа, кнопок і абзацу */
  .hero__inner::before {
    content: "";
    grid-area: 1 / 1 / 5;
    height: calc(var(--screen) - 2 * var(--gap));
    pointer-events: none;
  }

  .hero__copy {
    display: contents;
  }

  .hero__title {
    grid-area: 1 / 1;
  }

  .hero__slogan {
    margin-left: 0;
    font-size: calc(var(--col) * 0.1168);
    color: var(--mist);
  }

  /* Слот телефона: висота — від ряду, телефон вписаний у неї (372 × 774.589).
     Межі — 0.4…0.9 ширини колонки (у макеті 0.7278): на високих екранах
     телефон росте, щоб відступи лишались однаковими, а на дуже низьких
     абзац іде за край */
  .hero__phone {
    grid-area: 2 / 1;
    align-self: stretch;
    width: auto;
    min-height: calc(var(--col) * 0.4 * 774.589 / 372);
    margin-top: var(--gap);
    display: flex;
    align-items: center;
    justify-content: center;
    container-type: size;
  }

  .hero__device {
    flex: none;
    width: min(100cqh * 372 / 774.589, var(--col) * 0.9);
  }

  .hero__inner .hero__stores {
    grid-area: 3 / 1;
    flex-wrap: nowrap;
    margin-top: var(--gap);
    gap: 7.56px;
    /* дві кнопки на всю ширину колонки */
    font-size: calc((var(--col) - 7.56px) / 5.36);
    --stores-bg: var(--mist);
  }

  .hero__lead,
  .hero__text {
    margin-right: -7px;
    color: var(--mist);
  }

  .hero__lead {
    grid-area: 4 / 1;
    margin-top: var(--gap);
  }

  .hero__text {
    grid-area: 5 / 1;
    margin-top: 92px;
    margin-left: 0;
  }

  /* Механіки: рамка на всю ширину, текст по центру, ілюстрація посередині,
     другий абзац унизу рамки */
  .features {
    padding-top: 111px;
  }

  .features > .container {
    max-width: calc(480px + 84px);
    padding-inline: 42px;
  }

  .features__title {
    margin: 0 0 91px -2px;
    font-size: 44px;
    white-space: nowrap;
  }

  .feature {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0;
    min-height: min(734px, 182.6vw);
    padding: 20px 0 10px;
  }

  .feature + .feature {
    margin-top: 140px;
  }

  /* піксельна «хмара» на стику рамок */
  .feature__cloud {
    display: block;
    position: absolute;
    z-index: -1;
    left: var(--cx);
    top: var(--cy);
    width: var(--cw);
    height: var(--ch);
  }

  .feature__copy {
    display: contents;
  }

  .feature__title {
    font-size: 40px;
    text-align: center;
  }

  .feature__title + .feature__text {
    order: 1;
    width: min(var(--p1w), 100% + 11px);
    margin-top: 12px;
    font-size: 16px;
    text-align: center;
  }

  .feature .feature__art {
    order: 2;
    width: var(--mw);
    max-width: calc(100% + 30px);
    margin-block: auto;
  }

  .feature__text + .feature__text {
    order: 3;
    align-self: stretch;
    margin-top: 24px;
    padding-inline: 10px;
    font-size: 14px;
  }

  /* Фінал: без суцільної підкладки, лише «хмара» за заголовком */
  .finale {
    padding-top: 200px;
  }

  .finale::before,
  .finale__dither {
    display: none;
  }

  .finale__cloud {
    display: block;
    position: absolute;
    left: -364px;
    top: -111px;
    width: 1048px;
    height: 400px;
    z-index: -1;
  }

  /* Заклик збільшено відносно макета (там 20px): найдовший рядок
     «завантажуй застосунок» (~13.2em, з запасом 13.4em) — на всю ширину
     контейнера, рядки не переносяться */
  .cta__title {
    font-size: calc(min(100vw - 48px, 552px) / 13.4);
    line-height: 1;
    white-space: nowrap;
  }

  .cta__punct {
    display: none;
  }

  /* кнопки — як у hero: дві на всю ширину текстової колонки */
  .cta__inner .cta__stores {
    flex-wrap: nowrap;
    margin-top: 14px;
    gap: 7.56px;
    font-size: calc((var(--col) - 7.56px) / 5.36);
    --stores-bg: var(--mist);
  }

  /* Шеврони в межах екрана, по ширині кнопок (у макеті 432px — на телефоні
     крайні обрізалися краями екрана). Арт — сітка 157×64 клітинки, тож
     314×128 дає рівно 2px на клітинку: пікселі однакові на будь-якому dpr.
     Висота явна, без aspect-ratio — iOS Safari у flex-колонці рахує його неточно */
  .cta__chevrons {
    width: 314px;
    height: 128px;
    max-width: none;
    aspect-ratio: auto;
    margin-top: 18.4px;
  }

  .footer {
    padding: 37.5px 0 64px;
    color: var(--mist);
  }

  .footer__inner {
    max-width: calc(480px + 76px);
    padding-inline: 38px;
  }

  .footer__links {
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
    margin-top: 53px;
  }

  .footer__link {
    color: var(--mist);
  }

  .footer__divider {
    width: 100%;
    margin: 30px 0 0;
  }

  .footer__copy {
    margin: 29px 0 0 -3px;
    font-size: 14px;
    white-space: nowrap;
  }

  .footer__site {
    margin-top: 24px;
    font-size: 14px;
  }
}
</style>
