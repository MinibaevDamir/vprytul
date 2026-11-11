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
      guideUrl: 'https://user.vprytul.app/help', // користувацький гід (мануал від розробника)
      siteUrl: 'https://vprytul.prytulafoundation.org'
    }
  },

  app: {
    head: {
      htmlAttrs: { lang: 'uk' },
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#323232' }
      ],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }]
    }
  },

  // Vercel: zero-config деплой через `nuxt build` (пресет vercel визначається автоматично).
  // Пререндер оголошуємо через routeRules — так сторінки потрапляють у .vercel/output
  // як статичні асети з коректним кешуванням, див. https://vercel.com/docs/frameworks/full-stack/nuxt
  routeRules: {
    '/': { prerender: true },
    // стара адреса гіда — гід тепер на сайті застосунку
    '/user-guide': { redirect: { to: 'https://user.vprytul.app/help', statusCode: 301 } },
    '/privacy-policy': { prerender: true },
    '/terms-of-use': { prerender: true },
    '/data-protection-policy': { prerender: true },
    '/en/privacy-policy': { prerender: true },
    '/en/data-protection-policy': { prerender: true }
  }
})
