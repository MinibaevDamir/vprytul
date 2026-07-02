<script setup lang="ts">
// Штрих-код — мотив з онбордингу застосунку. Ширини смуг детерміновані,
// щоб SSR і клієнт рендерили однаково.
const bars: { x: number; w: number; h: number }[] = []
let x = 0
const seq = [3, 7, 2, 9, 4, 2, 11, 3, 5, 2, 8, 4, 2, 6, 10, 2, 4, 7, 3, 2]
let i = 0
while (x < 1200) {
  const w = seq[i % seq.length]
  const gap = seq[(i + 7) % seq.length]
  const h = 24 + ((i * 37) % 40)
  bars.push({ x, w, h })
  x += w + gap
  i++
}
</script>

<template>
  <svg class="barcode" viewBox="0 0 1200 64" preserveAspectRatio="xMidYMin slice" aria-hidden="true">
    <rect v-for="(b, idx) in bars" :key="idx" :x="b.x" y="0" :width="b.w" :height="b.h" fill="currentColor" />
  </svg>
</template>

<style scoped>
.barcode {
  display: block;
  width: 100%;
  height: 64px;
}
</style>
