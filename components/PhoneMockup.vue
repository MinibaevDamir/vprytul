<template>
  <!-- Мокап смартфона з головним екраном застосунку (за Figma: Vprytul App Preview / Home) -->
  <div class="phone" role="img" aria-label="Головний екран застосунку Впритул: гарячий квест «Зроби донат — збий шахед» і топ-пропозиції">
    <div class="phone__screen" aria-hidden="true">
      <div class="scr-status">
        <span class="scr-status__time">9:41</span>
        <span class="scr-status__icons">
          <svg viewBox="0 0 46 12" fill="currentColor"><rect x="0" y="4" width="3" height="8" rx="1" /><rect x="5" y="2" width="3" height="10" rx="1" /><rect x="10" y="0" width="3" height="12" rx="1" /><path d="M20 4a8 8 0 0 1 10 0l-1.5 2a5.5 5.5 0 0 0-7 0L20 4Zm3 4a4 4 0 0 1 4 0l-2 2.5L23 8Z" /><rect x="34" y="1" width="10" height="10" rx="2.5" opacity="0.4" /><rect x="35.5" y="2.5" width="6" height="7" rx="1.2" /></svg>
        </span>
      </div>

      <div class="scr-header">
        <BrandLogo tone="dark" class="scr-header__logo" />
        <span class="scr-pill">
          <svg class="scr-ico scr-ico--flame" viewBox="0 0 16 16"><path d="M8 1c.5 2.4-1.8 3.6-1.8 6a1.9 1.9 0 0 0 3.8.2C10 5.8 9 5 9.4 3.4 11.6 4.6 13 7 13 9.2A5.1 5.1 0 0 1 3 9.4C3 5.8 6.9 4.4 8 1Z" fill="#F29837" /></svg>
          105
        </span>
        <span class="scr-pill">
          <svg class="scr-ico" viewBox="0 0 88 40" fill="none"><path d="M4 4l16 16L4 36M24 4l16 16-16 16M84 4L68 20l16 16M64 4L48 20l16 16" stroke="#1D1D1B" stroke-width="10" /></svg>
          105
        </span>
        <svg class="scr-bell" viewBox="0 0 20 20" fill="none"><path d="M10 2a5 5 0 0 0-5 5v3l-1.6 3.2c-.3.6.1 1.3.8 1.3h11.6c.7 0 1.1-.7.8-1.3L15 10V7a5 5 0 0 0-5-5Zm-2 14a2 2 0 0 0 4 0" stroke="#1D1D1B" stroke-width="1.6" /></svg>
      </div>

      <div class="scr-quest-title">
        <svg class="scr-ico scr-ico--flame" viewBox="0 0 16 16"><path d="M8 1c.5 2.4-1.8 3.6-1.8 6a1.9 1.9 0 0 0 3.8.2C10 5.8 9 5 9.4 3.4 11.6 4.6 13 7 13 9.2A5.1 5.1 0 0 1 3 9.4C3 5.8 6.9 4.4 8 1Z" fill="#F29837" /></svg>
        Гарячий квест
      </div>

      <div class="scr-card">
        <span class="scr-card__tag">Квест-донат</span>
        <span class="scr-card__headline">Зроби донат<br />збий шахед</span>
        <span class="scr-card__rewards">
          Rewards
          <span class="scr-chip">+1</span>
          <span class="scr-chip">+1</span>
        </span>
      </div>

      <p class="scr-caption">Зроби донат — збий шахед!</p>

      <div class="scr-shop-title">Топ-пропозиції</div>
      <div class="scr-shop">
        <div class="scr-merch">
          <svg viewBox="0 0 88 40" fill="none" class="scr-merch__print"><path d="M4 4l16 16L4 36M24 4l16 16-16 16M84 4L68 20l16 16M64 4L48 20l16 16" stroke="#F29837" stroke-width="9" /></svg>
          <span>Футболка<br />«Впритул»</span>
        </div>
        <div class="scr-merch">
          <span class="scr-merch__word">ТИМ<br />ЧАСОМ</span>
          <span>Колекція<br />весна-літо</span>
        </div>
      </div>

      <div class="scr-nav">
        <svg class="is-active" viewBox="0 0 20 20" fill="none"><path d="M3 9.5 10 3l7 6.5V17a1 1 0 0 1-1 1h-4v-5H8v5H4a1 1 0 0 1-1-1V9.5Z" stroke="#F29837" stroke-width="1.7" /></svg>
        <svg viewBox="0 0 20 20" fill="none"><path d="M10 2l2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5-4.8 2.5.9-5.4L2.2 7.7l5.4-.8L10 2Z" stroke="#8A8983" stroke-width="1.5" /></svg>
        <svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="#8A8983" stroke-width="1.5" /><path d="M10 6v8M6 10h8" stroke="#8A8983" stroke-width="1.5" /></svg>
        <svg viewBox="0 0 20 20" fill="none"><path d="M4 17V9m6 8V3m6 14v-6" stroke="#8A8983" stroke-width="1.7" /></svg>
        <svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="7" r="3.4" stroke="#8A8983" stroke-width="1.5" /><path d="M3.5 17a6.5 6.5 0 0 1 13 0" stroke="#8A8983" stroke-width="1.5" /></svg>
      </div>
    </div>
  </div>
</template>

<style scoped>
.phone {
  width: min(320px, 78vw);
  aspect-ratio: 320 / 660;
  padding: 12px;
  background: #0d0d0c;
  border-radius: 48px;
  box-shadow:
    0 0 0 2px rgba(215, 216, 211, 0.18),
    0 40px 80px rgba(0, 0, 0, 0.55);
}

.phone__screen {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: #fdfdfc;
  border-radius: 38px;
  padding: 14px 16px 10px;
  color: var(--ink);
}

.scr-status {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 13px;
}

.scr-status__icons svg {
  width: 46px;
  height: 12px;
}

.scr-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 14px;
}

.scr-header__logo {
  font-size: 15px;
  margin-right: auto;
}

.scr-pill {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 9px;
  border: 1px solid var(--line);
  border-radius: 999px;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 12px;
}

.scr-ico {
  width: 14px;
  height: 12px;
}

.scr-ico--flame {
  width: 12px;
  height: 12px;
}

.scr-bell {
  width: 19px;
  height: 19px;
}

.scr-quest-title {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 18px;
  font-family: var(--font-body);
  font-weight: 700;
  font-size: 14.5px;
}

.scr-quest-title .scr-ico--flame {
  width: 15px;
  height: 15px;
}

.scr-card {
  position: relative;
  margin-top: 10px;
  padding: 30px 16px 12px;
  border-radius: 18px;
  background:
    radial-gradient(120% 140% at 15% 0%, rgba(255, 255, 255, 0.25), transparent 45%),
    linear-gradient(135deg, var(--orange) 0%, #e06a2b 55%, var(--ember) 100%);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.scr-card__tag {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 3px 10px;
  background: var(--ink);
  color: var(--paper);
  border-radius: 999px;
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 10px;
}

.scr-card__headline {
  font-family: var(--font-display);
  font-weight: 900;
  font-size: 24px;
  line-height: 1.02;
  text-transform: uppercase;
  color: var(--ink);
}

.scr-card__rewards {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-body);
  font-size: 11px;
  color: rgba(29, 29, 27, 0.8);
}

.scr-chip {
  padding: 2px 8px;
  background: rgba(29, 29, 27, 0.85);
  color: var(--orange);
  border-radius: 999px;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 10.5px;
}

.scr-caption {
  margin: 12px 0 0;
  font-family: var(--font-body);
  font-weight: 700;
  font-size: 15px;
  line-height: 1.3;
}

.scr-shop-title {
  margin-top: 16px;
  font-family: var(--font-body);
  font-weight: 700;
  font-size: 14.5px;
}

.scr-shop {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 10px;
  flex: 1;
  min-height: 0;
}

.scr-merch {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 8px;
  padding: 12px;
  background: var(--ink);
  border-radius: 14px;
  color: var(--bone);
  font-family: var(--font-body);
  font-size: 10.5px;
  line-height: 1.35;
  overflow: hidden;
}

.scr-merch__print {
  width: 56px;
  height: 26px;
}

.scr-merch__word {
  font-family: var(--font-display);
  font-weight: 900;
  font-size: 17px;
  line-height: 1;
  color: var(--orange);
  text-transform: uppercase;
}

.scr-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px 2px;
  border-top: 1px solid var(--line);
  margin-top: 10px;
}

.scr-nav svg {
  width: 21px;
  height: 21px;
}
</style>
