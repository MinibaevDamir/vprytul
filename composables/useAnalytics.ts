type StoreName = 'app_store' | 'google_play'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

/**
 * Трекінг конверсійних подій (ТЗ, розділ 3): кліки по кнопках маркетів
 * надсилаються в GA4 та Facebook Pixel, коли ідентифікатори налаштовані.
 */
export function useAnalytics() {
  function trackStoreClick(store: StoreName) {
    if (import.meta.server) return

    window.gtag?.('event', 'store_button_click', {
      store,
      event_category: 'conversion',
      event_label: store
    })

    window.fbq?.('trackCustom', 'StoreButtonClick', { store })
  }

  function trackGuideOpen() {
    if (import.meta.server) return
    window.gtag?.('event', 'guide_open', { event_category: 'engagement' })
    window.fbq?.('trackCustom', 'GuideOpen')
  }

  return { trackStoreClick, trackGuideOpen }
}
