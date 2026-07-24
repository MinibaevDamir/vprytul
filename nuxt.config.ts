export default defineNuxtConfig({
  compatibilityDate: '2026-07-01',

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    public: {
      // Заповнюються через env на Vercel: NUXT_PUBLIC_*
      gaMeasurementId: '', // NUXT_PUBLIC_GA_MEASUREMENT_ID
      fbPixelId: '', // NUXT_PUBLIC_FB_PIXEL_ID
      appStoreUrl: '', // NUXT_PUBLIC_APP_STORE_URL — пряме посилання після рев'ю
      playStoreUrl: '', // NUXT_PUBLIC_PLAY_STORE_URL
      guideUrl: '', // NUXT_PUBLIC_GUIDE_URL — PDF-мануал, додамо згодом
      siteUrl: 'https://vprytul.prytulafoundation.org'
    }
  },

  app: {
    head: {
      htmlAttrs: { lang: 'uk' },
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#1D1D1B' }
      ],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }]
    }
  },

  // Vercel: zero-config деплой через `nuxt build` (пресет vercel визначається автоматично).
  // Пререндер оголошуємо через routeRules — так сторінки потрапляють у .vercel/output
  // як статичні асети з коректним кешуванням, див. https://vercel.com/docs/frameworks/full-stack/nuxt
  routeRules: {
    '/': { prerender: true }
  }
})
