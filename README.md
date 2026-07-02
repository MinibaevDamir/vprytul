# Впритул — лендінг застосунку

Цільова сторінка мобільного застосунку «Впритул» Благодійного фонду Сергія Притули.
Nuxt 3, без UI-фреймворків, готова до деплою на Vercel.

## Структура за ТЗ

| Блок ТЗ | Реалізація |
| --- | --- |
| Блок 1 — Hero | `pages/index.vue` (H1-слоган, мокап смартфона `components/PhoneMockup.vue`, кнопки App Store / Google Play `components/StoreButtons.vue`) |
| Блок 2 — Механіки | 4 картки: квести, донати, голосування/рейтинг, спільнота |
| Блок 3 — Гід | Секція «Користувацький гід»; кнопка вмикається змінною `NUXT_PUBLIC_GUIDE_URL` |
| Блок 4 — Юридичний підвал | Футер + окремі сторінки `/privacy-policy`, `/terms-of-use`, `/data-protection`, `/license` |
| SEO | `useSeoMeta` (title/description/keywords/OG/Twitter), JSON-LD MobileApplication, `robots.txt`, `sitemap.xml`, канонічні URL |
| Аналітика | GA4 + Facebook Pixel (`plugins/analytics.client.ts`), події кліків по маркетах (`composables/useAnalytics.ts`: `store_button_click`, `StoreButtonClick`) |

## Дизайн

- Палітра з айдентики застосунку (Figma «Vprytul App Preview» / «all templates»):
  графіт `#1D1D1B`, теплий білий `#F2F1EC`, помаранч `#F29837`, глибокий `#C2482A`.
- Шрифти: **e-Ukraine** (текст; використовується Фондом) + **Tektur** (дисплейний, кирилиця; Google Fonts, OFL) — самохостинг у `public/fonts`.
- Мотиви бренду: знак `»«` («впритул»), штрих-код з онбордингу застосунку, стрічки-наліпки.

## Локальний запуск

Потрібен Node **≥ 20.17** (на цій машині: `export PATH="$HOME/.nvm/versions/node/v25.9.0/bin:$PATH"`).

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # продакшн-збірка
```

> Локальне прев'ю `node .output/server/index.mjs` на macOS може віддавати 500 через
> резолвінг шляху до public-активів; це особливість локального node-server прев'ю,
> на Vercel не відтворюється. Обхід: `ln -s ../../public .output/server/chunks/public`.

## Деплой на Vercel

1. Імпортувати репозиторій у Vercel — фреймворк визначиться автоматично (Nuxt).
2. Задати змінні середовища з `.env.example`:
   - `NUXT_PUBLIC_GA_MEASUREMENT_ID`, `NUXT_PUBLIC_FB_PIXEL_ID` — аналітика вмикається лише за наявності значень;
   - `NUXT_PUBLIC_APP_STORE_URL`, `NUXT_PUBLIC_PLAY_STORE_URL` — прямі/deeplink-посилання на маркети (після рев'ю);
   - `NUXT_PUBLIC_GUIDE_URL` — посилання на PDF-мануал (коли надасть команда);
   - `NUXT_PUBLIC_SITE_URL` — канонічний домен.
3. Deploy. Усі сторінки пререндеряться (SSG) — швидкий TTFB і коректні мета-теги для краулерів.

## Що лишилось від матеріалів ТЗ

- Фінальні тексти FAQ/описів — «нададуть згодом»; поточні тексти написані за тональністю ТЗ.
- Прямі посилання на маркети — після проходження рев'ю (зараз кнопки ведуть на сайт Фонду).
- Юридичні документи — сторінки-плейсхолдери чекають на затверджені юристами тексти.
- PDF-мануал — «Ілля додасть»; секція гіда вже готова його прийняти.
# vprytul
