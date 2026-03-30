<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { productsData } from "../data/products";
import {
  ArrowLeft,
  Copy,
  Check,
  Calculator,
  Battery,
  HardDrive,
  Monitor,
  ScanFace,
  Wifi,
  Package,
  ShieldCheck,
  Sparkles,
} from "lucide-vue-next";

const route = useRoute();
const router = useRouter();
const product = computed(() =>
  productsData.find((p) => p.id === parseInt(route.params.id)),
);

const profit = ref(500000);
const finalPrice = computed(() => (product.value?.price || 0) + profit.value);
const copied = ref(false);
const imgLoaded = ref(false);

onMounted(() => window.scrollTo(0, 0));

const formatVND = (val) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    val,
  );

const formatShort = (val) => {
  if (val >= 1_000_000)
    return (val / 1_000_000).toFixed(1).replace(".0", "") + " triệu";
  return new Intl.NumberFormat("vi-VN").format(val) + "đ";
};

const marginPct = computed(() => {
  if (!product.value?.price || product.value.price === 0) return "0";
  return ((profit.value / product.value.price) * 100).toFixed(1);
});

const handleCopy = async () => {
  if (!product.value) return;
  const text =
    `💎 ${product.value.name}\n` +
    `📦 ${product.value.storage} — ${product.value.color}\n` +
    `🔋 Pin: ${product.value.battery} | ${product.value.condition}\n` +
    `🎁 ${product.value.accessories}\n` +
    `💰 Giá bán: ${formatVND(finalPrice.value)}\n` +
    `➡️ Liên hệ ngay để check hàng!`;
  await navigator.clipboard.writeText(text);
  copied.value = true;
  setTimeout(() => (copied.value = false), 2800);
};

const specs = computed(() => {
  if (!product.value) return [];
  return [
    {
      icon: Battery,
      label: "Pin",
      value: product.value.battery,
      color: "#16a34a",
      bg: "#f0fdf4",
      border: "#bbf7d0",
    },
    {
      icon: HardDrive,
      label: "Bộ nhớ",
      value: product.value.storage,
      color: "#2563eb",
      bg: "#eff6ff",
      border: "#bfdbfe",
    },
    {
      icon: Monitor,
      label: "Màn hình",
      value: product.value.screen,
      color: "#7c3aed",
      bg: "#f5f3ff",
      border: "#ddd6fe",
    },
    {
      icon: ScanFace,
      label: "Face ID",
      value: product.value.faceid,
      color: "#d97706",
      bg: "#fffbeb",
      border: "#fde68a",
    },
    {
      icon: Wifi,
      label: "SIM",
      value: product.value.sim,
      color: "#0891b2",
      bg: "#ecfeff",
      border: "#a5f3fc",
    },
    {
      icon: Package,
      label: "Phụ kiện",
      value: product.value.accessories,
      color: "#be185d",
      bg: "#fdf2f8",
      border: "#fbcfe8",
    },
  ];
});
</script>

<template>
  <div v-if="product" class="pd-root">
    <!-- ══════════ STICKY NAV ══════════ -->
    <nav class="pd-nav">
      <button class="pd-back-btn" @click="router.back()">
        <ArrowLeft :size="18" />
      </button>
      <div class="pd-nav-center">
        <div class="pd-nav-tag">Sản phẩm xác thực</div>
        <div class="pd-nav-name">{{ product.name }}</div>
      </div>
      <div class="pd-nav-os" :class="product.os === 'IOS' ? 'ios' : 'android'">
        {{ product.os }}
      </div>
    </nav>

    <!-- ══════════ PRODUCT IMAGE ══════════ -->
    <div class="pd-img-wrap">
      <!-- Soft gradient behind image -->
      <div class="pd-img-glow"></div>
      <img
        :src="product.images[0]"
        :alt="product.name"
        class="pd-img"
        :class="{ loaded: imgLoaded }"
        @load="imgLoaded = true"
      />
      <!-- Gradient overlay at bottom -->
      <div class="pd-img-overlay"></div>

      <!-- Floating badges on image -->
      <div class="pd-img-badges">
        <div class="pd-badge-cond">
          <ShieldCheck :size="11" />
          {{ product.condition }}
        </div>
        <div class="pd-badge-color">
          {{ product.color }}
        </div>
      </div>
    </div>

    <!-- ══════════ CONTENT BODY ══════════ -->
    <div class="pd-body">
      <!-- Brand + name + price -->
      <div class="pd-top-info">
        <div class="pd-brand">{{ product.brand }}</div>
        <h1 class="pd-name">{{ product.name }}</h1>
        <div class="pd-price-row">
          <div>
            <div class="pd-price-label">Giá gốc nội bộ</div>
            <div class="pd-price mono">{{ formatShort(product.price) }}</div>
          </div>
          <div class="pd-price-pill">
            <Sparkles :size="11" />
            Exclusive
          </div>
        </div>
      </div>

      <!-- Notes card -->
      <div class="pd-notes-card">
        <div class="pd-notes-header">
          <Sparkles :size="12" />
          Ghi chú chuyên viên
        </div>
        <p class="pd-notes-text">"{{ product.notes }}"</p>
      </div>

      <!-- Specs grid -->
      <div class="pd-specs-section">
        <div class="pd-section-title">Thông số chi tiết</div>
        <div class="pd-specs-grid">
          <div
            v-for="spec in specs"
            :key="spec.label"
            class="pd-spec-card"
            :style="`border-color: ${spec.border}; background: ${spec.bg};`"
          >
            <div
              class="pd-spec-icon-wrap"
              :style="`background: ${spec.color}18`"
            >
              <component
                :is="spec.icon"
                :size="14"
                :style="`color: ${spec.color}`"
              />
            </div>
            <div class="pd-spec-content">
              <div class="pd-spec-label">{{ spec.label }}</div>
              <div class="pd-spec-value">{{ spec.value }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Extra bottom padding for fixed bar -->
      <div style="height: 140px"></div>
    </div>

    <!-- ══════════ FIXED PRICE CALCULATOR ══════════ -->
    <div class="pd-calc-bar">
      <div class="pd-calc-inner">
        <!-- Profit input -->
        <div class="pd-calc-input-group">
          <div class="pd-calc-input-header">
            <span class="pd-calc-label">
              <Calculator :size="12" />
              Lãi thêm
            </span>
            <span
              class="pd-margin-badge"
              :class="profit > 0 ? 'pos' : profit < 0 ? 'neg' : 'zero'"
            >
              {{ profit > 0 ? "+" : "" }}{{ marginPct }}%
            </span>
          </div>
          <div class="pd-calc-input-wrap">
            <input
              type="number"
              v-model.number="profit"
              class="pd-calc-input mono"
              placeholder="500000"
            />
            <span class="pd-calc-input-suffix">đ</span>
          </div>
        </div>

        <!-- Divider -->
        <div class="pd-calc-divider"></div>

        <!-- Final price + copy -->
        <div class="pd-calc-result">
          <div>
            <div class="pd-calc-result-label">Giá bán ra</div>
            <div class="pd-calc-final-price mono">
              {{ formatShort(finalPrice) }}
            </div>
          </div>
          <button
            class="pd-copy-btn"
            :class="{ done: copied }"
            @click="handleCopy"
          >
            <component :is="copied ? Check : Copy" :size="16" />
            <span>{{ copied ? "Copied!" : "Copy" }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Not found -->
  <div v-else class="pd-not-found">
    <div style="font-size: 48px">📱</div>
    <p>Không tìm thấy sản phẩm</p>
    <button @click="router.back()" class="pd-back-link">← Quay lại</button>
  </div>
</template>

<style scoped>
/* ── ROOT ──────────────────────────────────────────────── */
.pd-root {
  min-height: 100dvh;
  background: var(--bg);
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: 0 auto;
}

/* ── NAV ───────────────────────────────────────────────── */
.pd-nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(244, 246, 251, 0.92);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border);
  padding: 10px 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}
.pd-back-btn {
  width: 38px;
  height: 38px;
  border-radius: 12px;
  background: var(--bg-card);
  border: 1.5px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--ink-2);
  cursor: pointer;
  transition: all 0.15s;
  flex-shrink: 0;
  box-shadow: var(--shadow-xs);
}
.pd-back-btn:hover {
  background: var(--blue-soft);
  border-color: var(--blue-muted);
  color: var(--blue);
}
.pd-back-btn:active {
  transform: scale(0.95);
}

.pd-nav-center {
  flex: 1;
  text-align: center;
  min-width: 0;
}
.pd-nav-tag {
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--blue);
  margin-bottom: 2px;
}
.pd-nav-name {
  font-size: 13px;
  font-weight: 800;
  color: var(--ink);
  letter-spacing: -0.025em;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.pd-nav-os {
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 800;
  flex-shrink: 0;
  letter-spacing: 0.04em;
}
.pd-nav-os.ios {
  background: var(--bg-muted);
  color: var(--ink-2);
  border: 1.5px solid var(--border-md);
}
.pd-nav-os.android {
  background: var(--green-bg);
  color: var(--green-text);
  border: 1.5px solid var(--green-border);
}

/* ── IMAGE ─────────────────────────────────────────────── */
.pd-img-wrap {
  position: relative;
  overflow: hidden;
  background: var(--bg-muted);
  aspect-ratio: 4/3.2;
}
.pd-img-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse at center top,
    rgba(37, 99, 235, 0.1) 0%,
    transparent 70%
  );
  z-index: 0;
}
.pd-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: relative;
  z-index: 1;
  opacity: 0;
  transition: opacity 0.4s ease;
}
.pd-img.loaded {
  opacity: 1;
}
.pd-img-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50%;
  background: linear-gradient(to top, var(--bg) 0%, transparent 100%);
  z-index: 2;
}
.pd-img-badges {
  position: absolute;
  bottom: 16px;
  left: 14px;
  right: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 3;
}
.pd-badge-cond {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(0, 0, 0, 0.07);
  font-size: 11px;
  font-weight: 700;
  color: var(--green-text);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}
.pd-badge-color {
  padding: 5px 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(0, 0, 0, 0.07);
  font-size: 11px;
  font-weight: 700;
  color: var(--ink-2);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

/* ── BODY ──────────────────────────────────────────────── */
.pd-body {
  padding: 0 14px;
  flex: 1;
}

/* Top info */
.pd-top-info {
  padding: 20px 0 16px;
  border-bottom: 1px solid var(--border);
  margin-bottom: 16px;
}
.pd-brand {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--ink-4);
  margin-bottom: 4px;
}
.pd-name {
  font-size: 26px;
  font-weight: 900;
  color: var(--ink);
  letter-spacing: -0.04em;
  line-height: 1.1;
  margin-bottom: 14px;
}
.pd-price-row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}
.pd-price-label {
  font-size: 10px;
  font-weight: 600;
  color: var(--ink-4);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 3px;
}
.pd-price {
  font-size: 28px;
  font-weight: 700;
  color: var(--ink);
  letter-spacing: -0.04em;
}
.pd-price-pill {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 5px 12px;
  border-radius: 999px;
  background: var(--blue-soft);
  border: 1px solid var(--blue-muted);
  font-size: 11px;
  font-weight: 700;
  color: var(--blue);
}

/* Notes card */
.pd-notes-card {
  background: var(--amber-bg);
  border: 1px solid var(--amber-border);
  border-radius: var(--r-lg);
  padding: 14px 16px;
  margin-bottom: 20px;
}
.pd-notes-header {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 10px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--amber);
  margin-bottom: 8px;
}
.pd-notes-text {
  font-size: 13.5px;
  line-height: 1.65;
  color: var(--amber-text);
  font-style: italic;
  font-weight: 400;
}

/* Specs section */
.pd-specs-section {
  margin-bottom: 16px;
}
.pd-section-title {
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--ink-4);
  margin-bottom: 10px;
}
.pd-specs-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}
.pd-spec-card {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 12px;
  border-radius: var(--r-md);
  border: 1px solid;
  transition: transform 0.15s;
}
.pd-spec-card:active {
  transform: scale(0.98);
}
.pd-spec-icon-wrap {
  width: 30px;
  height: 30px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.pd-spec-content {
  min-width: 0;
}
.pd-spec-label {
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: var(--ink-4);
  margin-bottom: 3px;
}
.pd-spec-value {
  font-size: 12px;
  font-weight: 700;
  color: var(--ink-2);
  line-height: 1.3;
  word-break: break-word;
}

/* ── FIXED CALC BAR ────────────────────────────────────── */
.pd-calc-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 200;
  padding: 10px 12px 14px;
  /* Ensure it stays within the max-width on large screens */
}
@media (min-width: 600px) {
  .pd-calc-bar {
    max-width: 600px;
    left: 50%;
    transform: translateX(-50%);
  }
}

.pd-calc-inner {
  background: var(--bg-card);
  border: 1.5px solid var(--border-md);
  border-radius: var(--r-xl);
  padding: 14px 14px 14px 16px;
  box-shadow:
    0 -4px 32px rgba(17, 24, 39, 0.1),
    0 8px 40px rgba(17, 24, 39, 0.14);
  display: flex;
  align-items: center;
  gap: 12px;
}

.pd-calc-input-group {
  flex: 1;
  min-width: 0;
}
.pd-calc-input-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
}
.pd-calc-label {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 10px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--blue);
}
.pd-margin-badge {
  font-size: 10px;
  font-weight: 800;
  padding: 2px 7px;
  border-radius: 999px;
}
.pd-margin-badge.pos {
  background: var(--green-bg);
  color: var(--green-text);
  border: 1px solid var(--green-border);
}
.pd-margin-badge.neg {
  background: var(--red-bg);
  color: var(--red);
  border: 1px solid #fecaca;
}
.pd-margin-badge.zero {
  background: var(--bg-muted);
  color: var(--ink-4);
  border: 1px solid var(--border);
}

.pd-calc-input-wrap {
  position: relative;
}
.pd-calc-input {
  width: 100%;
  padding: 9px 32px 9px 12px;
  border-radius: var(--r-sm);
  background: var(--bg-input);
  border: 1.5px solid var(--border);
  font-size: 15px;
  font-weight: 700;
  color: var(--ink);
  outline: none;
  transition:
    border-color 0.16s,
    box-shadow 0.16s;
}
.pd-calc-input:focus {
  border-color: var(--blue);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
}
.pd-calc-input-suffix {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 13px;
  font-weight: 600;
  color: var(--ink-4);
  pointer-events: none;
}

.pd-calc-divider {
  width: 1px;
  height: 52px;
  background: var(--border);
  flex-shrink: 0;
}

.pd-calc-result {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
  flex-shrink: 0;
}
.pd-calc-result-label {
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--ink-4);
  text-align: right;
  white-space: nowrap;
}
.pd-calc-final-price {
  font-size: 17px;
  font-weight: 700;
  color: var(--ink);
  letter-spacing: -0.03em;
  text-align: right;
  white-space: nowrap;
}

.pd-copy-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 9px 14px;
  border-radius: var(--r-sm);
  font-size: 12px;
  font-weight: 800;
  cursor: pointer;
  border: none;
  transition: all 0.2s;
  background: var(--blue);
  color: white;
  box-shadow: 0 4px 14px rgba(37, 99, 235, 0.3);
  white-space: nowrap;
}
.pd-copy-btn:hover {
  background: var(--blue-dark);
  box-shadow: 0 6px 20px rgba(37, 99, 235, 0.4);
}
.pd-copy-btn:active {
  transform: scale(0.96);
}
.pd-copy-btn.done {
  background: var(--green);
  box-shadow: 0 4px 14px rgba(22, 163, 74, 0.3);
}

/* ── NOT FOUND ─────────────────────────────────────────── */
.pd-not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  gap: 12px;
  padding: 32px;
  font-size: 16px;
  font-weight: 600;
  color: var(--ink-3);
  text-align: center;
}
.pd-back-link {
  margin-top: 8px;
  font-size: 14px;
  font-weight: 700;
  color: var(--blue);
  cursor: pointer;
  background: none;
  border: none;
  text-decoration: underline;
}
</style>
