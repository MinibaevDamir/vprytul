<script setup lang="ts">
withDefaults(defineProps<{ tone?: 'light' | 'dark' | 'orange' }>(), { tone: 'light' })
</script>

<template>
  <!-- Логотип «ВПРИ»«ТУЛ»: два рядки з квадратом-шевроном, як у брендбуку застосунку -->
  <span class="brand-logo" :class="`brand-logo--${tone}`">
    <span class="brand-logo__row">ВПРИ</span>
    <span class="brand-logo__row brand-logo__row--second">
      <span class="brand-logo__mark">
        <ChevronMark class="brand-logo__chevrons" />
      </span>
      ТУЛ
    </span>
  </span>
</template>

<style scoped>
.brand-logo {
  display: inline-flex;
  flex-direction: column;
  font-family: var(--font-display);
  font-weight: 900;
  line-height: 0.92;
  letter-spacing: 0.02em;
  font-size: 1em;
  user-select: none;
}

.brand-logo--light {
  color: var(--bone);
}
.brand-logo--dark {
  color: var(--ink);
}
.brand-logo--orange {
  color: var(--orange);
}

.brand-logo__row {
  display: inline-flex;
  align-items: center;
  gap: 0.12em;
}

.brand-logo__mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 0.86em;
  height: 0.86em;
  background: currentColor;
  border-radius: 0.06em;
}

.brand-logo__chevrons {
  width: 70%;
  height: auto;
}

.brand-logo--light .brand-logo__chevrons :deep(path) {
  stroke: var(--ink);
}
.brand-logo--dark .brand-logo__chevrons :deep(path) {
  stroke: var(--paper);
}
.brand-logo--orange .brand-logo__chevrons :deep(path) {
  stroke: var(--ink);
}
</style>
