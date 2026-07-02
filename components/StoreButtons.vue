<script setup lang="ts">
withDefaults(defineProps<{ tone?: 'light' | 'dark' }>(), { tone: 'light' })

const { appStoreUrl, playStoreUrl } = useRuntimeConfig().public
const { trackStoreClick } = useAnalytics()

// Поки застосунок на рев'ю в маркетах, кнопки ведуть на сторінку Фонду.
const appStoreHref = appStoreUrl || 'https://prytulafoundation.org/'
const playStoreHref = playStoreUrl || 'https://prytulafoundation.org/'
</script>

<template>
  <div class="stores" :class="`stores--${tone}`">
    <a
      class="stores__btn"
      :href="appStoreHref"
      rel="noopener"
      data-store="app_store"
      @click="trackStoreClick('app_store')"
    >
      <svg class="stores__icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path
          d="M17.05 12.54c-.03-2.5 2.04-3.7 2.13-3.76-1.16-1.7-2.97-1.93-3.61-1.96-1.54-.15-3 .9-3.78.9-.77 0-1.98-.88-3.25-.85-1.67.02-3.22.97-4.08 2.47-1.74 3.02-.44 7.49 1.25 9.94.83 1.2 1.82 2.55 3.12 2.5 1.25-.05 1.72-.8 3.24-.8 1.5 0 1.94.8 3.26.78 1.35-.02 2.2-1.22 3.02-2.42.95-1.39 1.34-2.73 1.36-2.8-.03-.02-2.61-1-2.66-4Z"
        />
        <path
          d="M14.56 5.2c.69-.83 1.15-1.99 1.02-3.15-.99.04-2.18.66-2.89 1.49-.63.73-1.19 1.91-1.04 3.04 1.1.09 2.23-.56 2.91-1.38Z"
        />
      </svg>
      <span class="stores__text">
        <small>Завантажити в</small>
        App Store
      </span>
    </a>

    <a
      class="stores__btn"
      :href="playStoreHref"
      rel="noopener"
      data-store="google_play"
      @click="trackStoreClick('google_play')"
    >
      <svg class="stores__icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M3.6 1.9c-.36.38-.57.96-.57 1.72v16.76c0 .76.21 1.34.58 1.7l.09.09 9.39-9.39v-.21L3.7 1.8l-.1.1Z" />
        <path d="m16.22 15.9-3.13-3.12v-.21l3.13-3.13.07.04 3.71 2.11c1.06.6 1.06 1.58 0 2.18l-3.7 2.1-.08.04Z" />
        <path d="m16.3 15.86-3.2-3.2-9.5 9.5c.35.37.93.42 1.58.05l11.12-6.35" />
        <path d="M16.3 8.61 5.18 2.29c-.65-.38-1.23-.32-1.58.05l9.5 9.5 3.2-3.23Z" />
      </svg>
      <span class="stores__text">
        <small>Доступно в</small>
        Google Play
      </span>
    </a>
  </div>
</template>

<style scoped>
.stores {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}

.stores__btn {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 12px 22px;
  border-radius: 14px;
  text-decoration: none;
  transition: transform 0.15s ease, background-color 0.15s ease, color 0.15s ease;
}

.stores__btn:hover {
  transform: translateY(-2px);
}

.stores__btn:active {
  transform: translateY(0);
}

.stores--light .stores__btn {
  background: var(--paper);
  color: var(--ink);
}

.stores--light .stores__btn:hover {
  background: var(--orange);
}

.stores--dark .stores__btn {
  background: var(--ink);
  color: var(--paper);
}

.stores--dark .stores__btn:hover {
  background: var(--orange);
  color: var(--ink);
}

.stores__icon {
  width: 26px;
  height: 26px;
  flex: none;
}

.stores__text {
  display: flex;
  flex-direction: column;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.05rem;
  line-height: 1.15;
}

.stores__text small {
  font-family: var(--font-body);
  font-weight: 400;
  font-size: 0.68rem;
  opacity: 0.75;
}
</style>
