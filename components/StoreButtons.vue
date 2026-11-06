<script setup lang="ts">
// Розміри з макета: md — hero (268×81), lg — фінальний заклик (289×87).
// На мобільному сторінка перевизначає масштаб через font-size і колір через --stores-bg.
withDefaults(defineProps<{ size?: 'md' | 'lg' }>(), { size: 'md' })

const { appStoreUrl, playStoreUrl } = useRuntimeConfig().public
const { trackStoreClick } = useAnalytics()

// Поки застосунок на рев'ю в маркетах, кнопки ведуть на сторінку Фонду.
const appStoreHref = appStoreUrl || 'https://prytulafoundation.org/'
const playStoreHref = playStoreUrl || 'https://prytulafoundation.org/'
</script>

<template>
  <div class="stores" :class="`stores--${size}`">
    <a
      class="stores__btn stores__btn--apple"
      :href="appStoreHref"
      rel="noopener"
      data-store="app_store"
      @click="trackStoreClick('app_store')"
    >
      <img class="stores__icon" src="/img/ic-apple.svg" width="45.8284" height="56.4042" alt="" />
      <span class="stores__text">
        <small>Завантажити в</small>
        App Store
      </span>
    </a>

    <a
      class="stores__btn stores__btn--google"
      :href="playStoreHref"
      rel="noopener"
      data-store="google_play"
      @click="trackStoreClick('google_play')"
    >
      <img class="stores__icon" src="/img/ic-google-play.svg" width="40.9986" height="45.6601" alt="" />
      <span class="stores__text">
        <small>Доступно в</small>
        Google Play
      </span>
    </a>
  </div>
</template>

<style scoped>
/* Розміри — у пікселях hero-кнопки макета, поділених на 100: font-size .stores
   задає масштаб (100px = 1:1), тож сторінка може масштабувати кнопки цілком */
.stores {
  --label: 0.5667em;
  --name: 0.2167em;
  display: flex;
  flex-wrap: wrap;
  gap: 0.125em;
  font-size: 100px;
}

.stores--lg {
  --label: 0.5833em;
  --name: 0.222em;
  gap: 0.2022em;
  font-size: 108.12px;
}

.stores__btn {
  display: inline-flex;
  align-items: center;
  width: 2.68em;
  height: 0.81em;
  padding-left: calc(var(--pad) * 0.01em);
  gap: calc(var(--gap) * 0.01em);
  border-radius: 0.218em;
  background: var(--stores-bg, var(--cream));
  color: var(--ink);
  text-decoration: none;
  transition: transform 0.15s ease, background-color 0.15s ease;
}

.stores__btn--apple {
  --pad: 26.87;
  --gap: 24.3;
  --icon-w: 42.39;
  --icon-h: 52.17;
}

.stores__btn--google {
  --pad: 32.07;
  --gap: 17;
  --icon-w: 38.11;
  --icon-h: 42.44;
}

.stores__btn:hover {
  transform: translateY(-2px);
  background: var(--orange);
}

.stores__btn:active {
  transform: translateY(0);
}

.stores__icon {
  flex: none;
  width: calc(var(--icon-w) * 0.01em);
  height: calc(var(--icon-h) * 0.01em);
}

/* У макеті яблуко оптично підняте на ~3px над центром кнопки */
.stores__btn--apple .stores__icon {
  transform: translateY(-0.03em);
}

.stores__text {
  display: flex;
  flex-direction: column;
  font-weight: 700;
  font-size: var(--name);
  line-height: 1.15;
  text-align: left;
  white-space: nowrap;
}

.stores__text small {
  font-weight: 400;
  font-size: var(--label);
  line-height: 1.2;
}
</style>
