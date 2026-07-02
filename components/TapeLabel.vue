<template>
  <!-- Помаранчева стрічка-наліпка зі стенсильним текстом, як у шаблонах Фонду -->
  <span class="tape">
    <slot />
  </span>
</template>

<style scoped>
.tape {
  display: inline-block;
  padding: 0.35em 0.9em;
  background: var(--orange);
  color: var(--ink);
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 0.85rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  transform: rotate(-1.5deg);
}
</style>
