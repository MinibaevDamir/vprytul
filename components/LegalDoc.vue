<script setup lang="ts">
const props = defineProps<{
  title: string
  description: string
}>()

const { siteUrl } = useRuntimeConfig().public
const route = useRoute()

useSeoMeta({
  title: `${props.title} — Впритул`,
  description: props.description,
  ogTitle: `${props.title} — Впритул`,
  ogDescription: props.description,
  robots: 'noindex, follow'
})

useHead({
  link: [{ rel: 'canonical', href: `${siteUrl}${route.path}` }]
})
</script>

<template>
  <div class="legal">
    <header class="legal__topbar">
      <div class="legal__container legal__topbar-inner">
        <NuxtLink to="/" class="legal__home" aria-label="На головну">
          <BrandLogo tone="light" class="legal__logo" />
        </NuxtLink>
        <NuxtLink to="/" class="legal__back">← На головну</NuxtLink>
      </div>
    </header>

    <main class="legal__container legal__main">
      <h1 class="legal__title">{{ title }}</h1>
      <p class="legal__updated">Документ застосунку «Впритул» Благодійного фонду Сергія Притули</p>

      <div class="legal__body">
        <slot>
          <p>
            Фінальну редакцію документа зараз погоджують юристи Фонду. Повний текст буде
            опубліковано на цій сторінці до релізу застосунку в App Store та Google Play.
          </p>
          <p>
            Якщо у вас є питання щодо обробки персональних даних чи умов використання сервісу,
            напишіть нам через форму на сайті
            <a href="https://prytulafoundation.org" rel="noopener">prytulafoundation.org</a>.
          </p>
        </slot>
      </div>
    </main>

    <footer class="legal__footer">
      <div class="legal__container">
        © {{ new Date().getFullYear() }} Благодійний фонд Сергія Притули
      </div>
    </footer>
  </div>
</template>

<style scoped>
.legal {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--paper);
}

.legal__container {
  width: 100%;
  max-width: 820px;
  margin-inline: auto;
  padding-inline: 24px;
}

.legal__topbar {
  background: var(--ink);
}

.legal__topbar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-block: 18px;
}

.legal__home {
  text-decoration: none;
}

.legal__logo {
  font-size: 20px;
}

.legal__back {
  color: var(--bone);
  font-size: 0.85rem;
  text-decoration: none;
}

.legal__back:hover {
  color: var(--orange);
}

.legal__main {
  flex: 1;
  padding-block: 56px 72px;
}

.legal__title {
  margin: 0 0 10px;
  font-family: var(--font-display);
  font-weight: 900;
  font-size: clamp(1.7rem, 3.4vw, 2.5rem);
  line-height: 1.08;
  text-transform: uppercase;
}

.legal__updated {
  margin: 0 0 36px;
  font-size: 0.8rem;
  color: var(--ash);
}

.legal__body {
  font-size: 0.95rem;
  line-height: 1.85;
}

.legal__body :deep(a) {
  color: var(--ember);
}

.legal__footer {
  background: var(--ink);
  color: rgba(215, 216, 211, 0.6);
  font-size: 0.75rem;
  padding-block: 24px;
}
</style>
