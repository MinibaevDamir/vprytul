/**
 * Директива v-reveal — плавна поява елемента при потраплянні у вьюпорт.
 * Значення (число) — затримка появи в мс, для стаґеру карток: v-reveal="90".
 * v-reveal.mark — лише позначає появу (клас .reveal-mark, потім .is-rev), а
 * анімує елемент сам: так «наводяться» кутові мітки механік. Спрацьовує, коли
 * в кадрі чверть елемента — рамки високі, мітки мають бути добре видно.
 * Стилі .reveal / .is-rev — в assets/css/main.css. Поважає prefers-reduced-motion.
 */
let io: IntersectionObserver | null = null
let ioMark: IntersectionObserver | null = null

const onEnter: IntersectionObserverCallback = (entries, observer) => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue
    entry.target.classList.add('is-rev')
    observer.unobserve(entry.target)
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive<HTMLElement, number | undefined>('reveal', {
    mounted(el, binding) {
      if (
        !('IntersectionObserver' in window) ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      )
        return

      if (binding.modifiers.mark) {
        ioMark ??= new IntersectionObserver(onEnter, {
          rootMargin: '0px 0px -8% 0px',
          threshold: 0.25
        })
        el.classList.add('reveal-mark')
        ioMark.observe(el)
        return
      }

      io ??= new IntersectionObserver(onEnter, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 })

      if (binding.value) el.style.setProperty('--reveal-delay', `${binding.value}ms`)
      el.classList.add('reveal')
      io.observe(el)
    },
    unmounted(el) {
      io?.unobserve(el)
      ioMark?.unobserve(el)
    },
    getSSRProps: () => ({})
  })
})
