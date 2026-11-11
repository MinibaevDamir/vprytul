<script setup lang="ts">
// Сторінка документа (Figma 719:2158 — десктоп, 660:2907 — мобільний).
// Текст документа передається в слот: h2 — розділи, p — пункти,
// p.sub — підпункти, ul — переліки, table — таблиці.
// lang — мова документа (англійські версії живуть під /en/…), alt — шлях до
// версії іншою мовою: з нього в шапці робиться перемикач UA/EN.
const props = withDefaults(
  defineProps<{ title: string; description: string; path: string; lang?: 'uk' | 'en'; alt?: string }>(),
  { lang: 'uk', alt: undefined }
)

const { siteUrl } = useRuntimeConfig().public

const ui = {
  uk: {
    brand: 'Впритул',
    home: '← На головну',
    homeLabel: 'Впритул — на головну',
    meta: 'Документ застосунку «Впритул» Благодійного фонду Сергія Притули',
    locale: 'uk_UA',
    other: { lang: 'en', label: 'EN', title: 'English version' }
  },
  en: {
    brand: 'VPRYTUL',
    home: '← Home',
    homeLabel: 'VPRYTUL — home',
    meta: 'A document of the VPRYTUL app by the Serhiy Prytula Charity Foundation',
    locale: 'en_US',
    other: { lang: 'uk', label: 'UA', title: 'Українська версія' }
  }
}[props.lang]

const pageTitle = `${props.title} — ${ui.brand}`

useSeoMeta({
  title: pageTitle,
  description: props.description,
  ogTitle: pageTitle,
  ogDescription: props.description,
  ogType: 'article',
  ogUrl: `${siteUrl}${props.path}`,
  ogLocale: ui.locale
})

useHead({
  htmlAttrs: { lang: props.lang },
  link: [
    { rel: 'canonical', href: `${siteUrl}${props.path}` },
    ...(props.alt
      ? [
          { rel: 'alternate', hreflang: props.lang, href: `${siteUrl}${props.path}` },
          { rel: 'alternate', hreflang: ui.other.lang, href: `${siteUrl}${props.alt}` }
        ]
      : [])
  ],
  bodyAttrs: { class: 'is-paper' }
})
</script>

<template>
  <div class="legal">
    <header class="legal__bar">
      <NuxtLink to="/" class="legal__logo" :aria-label="ui.homeLabel">
        <img src="/img/logo-mark.svg" width="104" height="45" alt="" />
      </NuxtLink>
      <nav class="legal__nav">
        <NuxtLink
          v-if="alt"
          :to="alt"
          class="legal__lang"
          :hreflang="ui.other.lang"
          :lang="ui.other.lang"
          :title="ui.other.title"
          :aria-label="ui.other.title"
          >{{ ui.other.label }}</NuxtLink
        >
        <NuxtLink to="/" class="legal__back">{{ ui.home }}</NuxtLink>
      </nav>
    </header>

    <main class="legal__main">
      <h1 class="legal__title">{{ title }}</h1>
      <p class="legal__meta">{{ ui.meta }}</p>
      <div class="legal__body">
        <slot />
      </div>
    </main>
  </div>
</template>

<style scoped>
.legal {
  min-height: 100dvh;
  background: var(--paper);
  color: var(--bg);
}

/* ---------- Шапка: 90px, логотип 104×45, посилання на головну ---------- */
.legal__bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 90px;
  /* як у макеті: зліва 17px на 402px екрані і 96px на 1440px,
     справа 26.6px і 82px */
  padding-left: clamp(17px, 7.61vw - 13.6px, 96px);
  padding-right: clamp(26.6px, 5.337vw + 5.15px, 82px);
  background: var(--bg);
}

.legal__logo img {
  width: 104px;
  height: 45px;
}

.legal__nav {
  display: flex;
  align-items: center;
  gap: 20px;
}

.legal__back {
  font-size: 16px;
  line-height: normal;
  color: var(--mist);
  text-decoration: none;
  transition: color 0.15s ease;
}

.legal__back:hover,
.legal__lang:hover {
  color: var(--orange);
}

/* Перемикач мови — як бейдж EN у футері головної */
.legal__lang {
  font-size: 12px;
  line-height: 1;
  letter-spacing: 0.04em;
  color: var(--mist);
  text-decoration: none;
  border: 1px solid rgba(203, 204, 198, 0.4);
  border-radius: 4px;
  padding: 5px 7px 4px;
  transition: color 0.15s ease, border-color 0.15s ease;
}

.legal__lang:hover {
  border-color: var(--orange);
}

/* ---------- Документ: колонка 1040px ---------- */
.legal__main {
  max-width: calc(1040px + 2 * 36px);
  margin-inline: auto;
  padding: 60px 36px 96px;
}

.legal__title {
  margin: 0;
  font-weight: 700;
  font-size: 28px;
  line-height: 32px;
}

.legal__meta {
  margin: 20px 0 0;
  font-size: 12px;
  line-height: normal;
}

.legal__body {
  margin-top: 23px;
  font-size: 16px;
  line-height: 1.5;
}

.legal__body :slotted(p),
.legal__body :slotted(ul) {
  margin: 0 0 12px;
}

.legal__body :slotted(:first-child) {
  margin-top: 0;
}

.legal__body :slotted(h2) {
  margin: 36px 0 12px;
  font-weight: 700;
  font-size: 20px;
  line-height: 1.3;
}

.legal__body :slotted(.sub) {
  padding-left: 28px;
}

.legal__body :slotted(ul) {
  padding-left: 24px;
}

.legal__body :slotted(li + li) {
  margin-top: 6px;
}

.legal__body :slotted(strong) {
  font-weight: 700;
}

.legal__body :slotted(a) {
  color: inherit;
  text-underline-offset: 2px;
}

.legal__body :slotted(a:hover) {
  color: var(--orange);
}

/* Широкі таблиці на вузьких екранах гортаються вбік */
.legal__body :slotted(.legal-table) {
  margin: 20px 0 24px;
  overflow-x: auto;
}

.legal__body :slotted(table) {
  width: 100%;
  min-width: 720px;
  border-collapse: collapse;
  font-size: 14px;
  line-height: 1.45;
}

.legal__body :slotted(th),
.legal__body :slotted(td) {
  padding: 10px 12px;
  border: 1px solid rgba(26, 26, 25, 0.18);
  text-align: left;
  vertical-align: top;
}

.legal__body :slotted(thead th) {
  background: rgba(26, 26, 25, 0.06);
}

.legal__body :slotted(tbody th) {
  font-weight: 700;
}

@media (max-width: 700px) {
  .legal__main {
    padding: 29px 36.5px 64px;
  }
}
</style>
