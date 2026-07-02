/**
 * Підключає Google Analytics 4 і Facebook Pixel, лише якщо задані
 * NUXT_PUBLIC_GA_MEASUREMENT_ID / NUXT_PUBLIC_FB_PIXEL_ID.
 */
export default defineNuxtPlugin(() => {
  const { gaMeasurementId, fbPixelId } = useRuntimeConfig().public

  if (gaMeasurementId) {
    const s = document.createElement('script')
    s.async = true
    s.src = `https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`
    document.head.appendChild(s)

    window.dataLayer = window.dataLayer || []
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer!.push(args)
    }
    window.gtag('js', new Date())
    window.gtag('config', gaMeasurementId)
  }

  if (fbPixelId) {
    /* eslint-disable */
    ;(function (f: any, b: Document, e: string, v: string) {
      if (f.fbq) return
      const n: any = (f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
      })
      if (!f._fbq) f._fbq = n
      n.push = n
      n.loaded = true
      n.version = '2.0'
      n.queue = []
      const t = b.createElement(e) as HTMLScriptElement
      t.async = true
      t.src = v
      const x = b.getElementsByTagName(e)[0]
      x.parentNode!.insertBefore(t, x)
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js')
    /* eslint-enable */
    window.fbq?.('init', fbPixelId)
    window.fbq?.('track', 'PageView')
  }
})
