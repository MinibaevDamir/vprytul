/**
 * Директива v-reveal — плавна поява елемента при потраплянні у вьюпорт.
 * Значення (число) — затримка появи в мс, для стаґеру карток: v-reveal="90".
 * Стилі .reveal / .is-rev — в assets/css/main.css. Поважає prefers-reduced-motion.
 */
let io: IntersectionObserver | null = null

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive<HTMLElement, number | undefined>('reveal', {
    mounted(el, binding) {
      if (
        !('IntersectionObserver' in window) ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      )
        return

      io ??= new IntersectionObserver(
        (entries, observer) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue
            entry.target.classList.add('is-rev')
            observer.unobserve(entry.target)
          }
        },
        { rootMargin: '0px 0px -8% 0px', threshold: 0.1 }
      )

      if (binding.value) el.style.setProperty('--reveal-delay', `${binding.value}ms`)
      el.classList.add('reveal')
      io.observe(el)
    },
    unmounted(el) {
      io?.unobserve(el)
    },
    getSSRProps: () => ({})
  })
})
