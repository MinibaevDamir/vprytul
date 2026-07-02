<script setup lang="ts">
withDefaults(defineProps<{ color?: string }>(), { color: 'currentColor' })
</script>

<template>
  <!-- Знак »« — «впритул»: дві групи шевронів, що сходяться -->
  <svg viewBox="0 0 88 40" fill="none" aria-hidden="true">
    <path d="M4 4l16 16L4 36" :stroke="color" stroke-width="9" />
    <path d="M24 4l16 16-16 16" :stroke="color" stroke-width="9" />
    <path d="M84 4L68 20l16 16" :stroke="color" stroke-width="9" />
    <path d="M64 4L48 20l16 16" :stroke="color" stroke-width="9" />
  </svg>
</template>
