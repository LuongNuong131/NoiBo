<script setup>
import { ref, computed } from "vue";
import { productsData } from "../data/products";
import {
  Search,
  Battery,
  HardDrive,
  ChevronRight,
  Sparkles,
} from "lucide-vue-next";

const search = ref("");
const osFilter = ref("All");

const filteredProducts = computed(() =>
  productsData.filter((p) => {
    const matchSearch = p.name
      .toLowerCase()
      .includes(search.value.toLowerCase());
    const matchOs = osFilter.value === "All" || p.os === osFilter.value;
    return matchSearch && matchOs;
  }),
);

const formatPrice = (val) => new Intl.NumberFormat("vi-VN").format(val) + "đ";

const formatShort = (val) => {
  if (val >= 1_000_000)
    return (val / 1_000_000).toFixed(1).replace(".0", "") + " triệu";
  return new Intl.NumberFormat("vi-VN").format(val) + "đ";
};
</script>

<template>
  <div class="hp-root">
    <!-- ══════════ TOP HEADER ══════════ -->
    <header class="hp-header">
      <div class="hp-header-inner">
        <div class="hp-logo">
          <div class="hp-logo-icon">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <polygon
                points="8,1 14.9,4.75 14.9,11.25 8,15 1.1,11.25 1.1,4.75"
                stroke="white"
                stroke-width="1.6"
                fill="none"
                stroke-linejoin="round"
              />
              <circle cx="8" cy="8" r="2.2" fill="white" />
            </svg>
          </div>
          <div>
            <div class="hp-logo-name">KHO TỔNG PREMIUM</div>
            <div class="hp-logo-sub">Tra cứu nội bộ</div>
          </div>
        </div>
        <div class="hp-live-badge">
          <span class="hp-live-dot"></span>
          Live
        </div>
      </div>
    </header>

    <!-- ══════════ HERO SECTION ══════════ -->
    <section class="hp-hero">
      <div class="hp-hero-bg-circle c1"></div>
      <div class="hp-hero-bg-circle c2"></div>
      <div class="hp-hero-inner">
        <div class="hp-hero-pill">
          <Sparkles :size="11" />
          Hệ thống xác thực nội bộ
        </div>
        <h1 class="hp-hero-title">
          Giá gốc<br />
          <span class="hp-hero-accent">minh bạch.</span>
        </h1>
        <p class="hp-hero-desc">
          Tra cứu giá nội bộ dành riêng cho cộng tác viên và đại lý. Nhanh —
          Chính xác — Đáng tin.
        </p>
        <!-- Quick stats -->
        <div class="hp-stats">
          <div class="hp-stat">
            <span class="hp-stat-num">{{ productsData.length }}</span>
            <span class="hp-stat-label">Sản phẩm</span>
          </div>
          <div class="hp-stat-divider"></div>
          <div class="hp-stat">
            <span class="hp-stat-num">{{
              [...new Set(productsData.map((p) => p.brand))].length
            }}</span>
            <span class="hp-stat-label">Thương hiệu</span>
          </div>
          <div class="hp-stat-divider"></div>
          <div class="hp-stat">
            <span class="hp-stat-num">100%</span>
            <span class="hp-stat-label">Xác thực</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════ SEARCH & FILTER ══════════ -->
    <div class="hp-toolbar">
      <!-- Search input -->
      <div class="hp-search-wrap">
        <Search class="hp-search-icon" :size="16" />
        <input
          v-model="search"
          type="text"
          placeholder="Tìm tên máy..."
          class="hp-search-input"
        />
      </div>
      <!-- OS Filter -->
      <div class="hp-filter-row">
        <button
          v-for="opt in ['All', 'IOS', 'Android']"
          :key="opt"
          class="hp-filter-btn"
          :class="{ active: osFilter === opt }"
          @click="osFilter = opt"
        >
          {{ opt === "All" ? "Tất cả" : opt }}
        </button>
        <span class="hp-result-count">{{ filteredProducts.length }} máy</span>
      </div>
    </div>

    <!-- ══════════ PRODUCT LIST ══════════ -->
    <section class="hp-list">
      <!-- Empty state -->
      <div v-if="filteredProducts.length === 0" class="hp-empty">
        <div class="hp-empty-icon">🔍</div>
        <p class="hp-empty-title">Không tìm thấy máy nào</p>
        <p class="hp-empty-sub">Thử thay đổi từ khóa hoặc bộ lọc</p>
      </div>

      <!-- Cards — 2 cột trên mobile, nhiều hơn trên desktop -->
      <div v-else class="hp-grid">
        <router-link
          v-for="product in filteredProducts"
          :key="product.id"
          :to="'/product/' + product.id"
          class="hp-card"
        >
          <!-- Image -->
          <div class="hp-card-img-wrap">
            <img
              :src="product.images[0]"
              :alt="product.name"
              class="hp-card-img"
            />
            <!-- OS badge -->
            <div
              class="hp-card-os-badge"
              :class="product.os === 'IOS' ? 'ios' : 'android'"
            >
              {{ product.os }}
            </div>
            <!-- Condition badge -->
            <div class="hp-card-cond-badge">{{ product.condition }}</div>
          </div>

          <!-- Body -->
          <div class="hp-card-body">
            <div class="hp-card-brand">{{ product.brand }}</div>
            <h3 class="hp-card-name">{{ product.name }}</h3>

            <!-- Specs chips -->
            <div class="hp-card-chips">
              <div class="hp-chip green">
                <Battery :size="11" /> {{ product.battery }}
              </div>
              <div class="hp-chip blue">
                <HardDrive :size="11" /> {{ product.storage }}
              </div>
            </div>

            <!-- Price row -->
            <div class="hp-card-price-row">
              <div>
                <div class="hp-card-price-label">Giá gốc</div>
                <div class="hp-card-price mono">
                  {{ formatShort(product.price) }}
                </div>
              </div>
              <div class="hp-card-arrow">
                <ChevronRight :size="16" />
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </section>

    <!-- ══════════ FOOTER ══════════ -->
    <footer class="hp-footer">
      <span>© 2026 PREMIUM SYSTEM</span>
      <span class="hp-footer-dot">·</span>
      <span>Internal Use Only</span>
    </footer>
  </div>
</template>

<style scoped>
/* ── ROOT ──────────────────────────────────────────────── */
.hp-root {
  min-height: 100dvh;
  background: var(--bg);
  display: flex;
  flex-direction: column;
}

/* ── HEADER ────────────────────────────────────────────── */
.hp-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(244, 246, 251, 0.9);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border);
}
.hp-header-inner {
  max-width: 900px;
  margin: 0 auto;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.hp-logo {
  display: flex;
  align-items: center;
  gap: 10px;
}
.hp-logo-icon {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
}
.hp-logo-name {
  font-size: 13px;
  font-weight: 800;
  color: var(--ink);
  letter-spacing: -0.02em;
  line-height: 1.2;
}
.hp-logo-sub {
  font-size: 10px;
  color: var(--ink-4);
  font-weight: 500;
  letter-spacing: 0.01em;
  margin-top: 1px;
}
.hp-live-badge {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 4px 10px;
  border-radius: 999px;
  background: var(--green-bg);
  border: 1px solid var(--green-border);
  font-size: 10px;
  font-weight: 700;
  color: var(--green-text);
  letter-spacing: 0.02em;
}
.hp-live-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--green);
  animation: blink 1.6s ease-in-out infinite;
}
@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.35;
  }
}

/* ── HERO ──────────────────────────────────────────────── */
.hp-hero {
  position: relative;
  padding: 36px 16px 32px;
  overflow: hidden;
}
.hp-hero-bg-circle {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}
.c1 {
  width: 300px;
  height: 300px;
  top: -100px;
  right: -80px;
  background: radial-gradient(
    circle,
    rgba(37, 99, 235, 0.1) 0%,
    transparent 70%
  );
}
.c2 {
  width: 200px;
  height: 200px;
  bottom: -60px;
  left: -40px;
  background: radial-gradient(
    circle,
    rgba(99, 102, 241, 0.08) 0%,
    transparent 70%
  );
}
.hp-hero-inner {
  max-width: 900px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}
.hp-hero-pill {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 12px;
  border-radius: 999px;
  background: var(--blue-soft);
  border: 1px solid var(--blue-muted);
  font-size: 11px;
  font-weight: 700;
  color: var(--blue);
  letter-spacing: 0.01em;
  margin-bottom: 14px;
}
.hp-hero-title {
  font-size: 38px;
  font-weight: 900;
  line-height: 1.05;
  letter-spacing: -0.04em;
  color: var(--ink);
  margin-bottom: 12px;
}
.hp-hero-accent {
  background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.hp-hero-desc {
  font-size: 14px;
  line-height: 1.65;
  color: var(--ink-3);
  font-weight: 400;
  max-width: 340px;
  margin-bottom: 24px;
}

/* Stats */
.hp-stats {
  display: flex;
  align-items: center;
  gap: 0;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--r-lg);
  padding: 14px 0;
  box-shadow: var(--shadow-sm);
  width: 100%;
}
.hp-stat {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}
.hp-stat-num {
  font-size: 22px;
  font-weight: 800;
  color: var(--ink);
  letter-spacing: -0.04em;
  font-family: "JetBrains Mono", monospace;
}
.hp-stat-label {
  font-size: 10px;
  color: var(--ink-4);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.hp-stat-divider {
  width: 1px;
  height: 36px;
  background: var(--border);
  flex-shrink: 0;
}

/* ── TOOLBAR ───────────────────────────────────────────── */
.hp-toolbar {
  padding: 0 16px 16px;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.hp-search-wrap {
  position: relative;
}
.hp-search-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--ink-4);
  pointer-events: none;
}
.hp-search-input {
  width: 100%;
  padding: 13px 14px 13px 40px;
  border-radius: var(--r-md);
  background: var(--bg-card);
  border: 1.5px solid var(--border);
  font-size: 14px;
  font-weight: 500;
  color: var(--ink);
  outline: none;
  transition:
    border-color 0.18s,
    box-shadow 0.18s;
  box-shadow: var(--shadow-xs);
}
.hp-search-input::placeholder {
  color: var(--ink-5);
}
.hp-search-input:focus {
  border-color: var(--blue);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
}

.hp-filter-row {
  display: flex;
  align-items: center;
  gap: 6px;
}
.hp-filter-btn {
  padding: 7px 16px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  border: 1.5px solid var(--border);
  background: var(--bg-card);
  color: var(--ink-3);
  cursor: pointer;
  transition: all 0.16s;
  white-space: nowrap;
}
.hp-filter-btn:hover {
  border-color: var(--blue-muted);
  color: var(--blue);
}
.hp-filter-btn.active {
  background: var(--blue);
  border-color: var(--blue);
  color: white;
  box-shadow: 0 3px 10px rgba(37, 99, 235, 0.28);
}
.hp-result-count {
  margin-left: auto;
  font-size: 11px;
  font-weight: 600;
  color: var(--ink-4);
  white-space: nowrap;
}

/* ── PRODUCT GRID ──────────────────────────────────────── */
.hp-list {
  flex: 1;
  padding: 0 16px 32px;
  max-width: 900px;
  margin: 0 auto;
  width: 100%;
}
.hp-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}
@media (min-width: 600px) {
  .hp-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
  }
}
@media (min-width: 900px) {
  .hp-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }
}

/* ── CARD ──────────────────────────────────────────────── */
.hp-card {
  display: flex;
  flex-direction: column;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--r-xl);
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  box-shadow: var(--shadow-card);
  transition:
    transform 0.22s ease,
    box-shadow 0.22s ease,
    border-color 0.22s;
}
.hp-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-lg);
  border-color: var(--blue-muted);
}
.hp-card:active {
  transform: scale(0.98);
}

.hp-card-img-wrap {
  position: relative;
  aspect-ratio: 3/4;
  overflow: hidden;
  background: var(--bg-muted);
}
.hp-card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}
.hp-card:hover .hp-card-img {
  transform: scale(1.04);
}

.hp-card-os-badge {
  position: absolute;
  top: 8px;
  left: 8px;
  padding: 3px 8px;
  border-radius: 999px;
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
.hp-card-os-badge.ios {
  background: rgba(255, 255, 255, 0.85);
  color: var(--ink-2);
  border: 1px solid rgba(0, 0, 0, 0.08);
}
.hp-card-os-badge.android {
  background: rgba(22, 163, 74, 0.15);
  color: var(--green-text);
  border: 1px solid rgba(22, 163, 74, 0.25);
}
.hp-card-cond-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 3px 8px;
  border-radius: 999px;
  font-size: 9px;
  font-weight: 800;
  background: rgba(255, 255, 255, 0.85);
  border: 1px solid rgba(0, 0, 0, 0.07);
  color: var(--blue-dark);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.hp-card-body {
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
}
.hp-card-brand {
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--ink-4);
}
.hp-card-name {
  font-size: 13px;
  font-weight: 700;
  color: var(--ink);
  line-height: 1.3;
  letter-spacing: -0.02em;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.hp-card-chips {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}
.hp-chip {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  padding: 3px 8px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 600;
}
.hp-chip.green {
  background: var(--green-bg);
  color: var(--green-text);
  border: 1px solid var(--green-border);
}
.hp-chip.blue {
  background: var(--blue-soft);
  color: var(--blue);
  border: 1px solid var(--blue-muted);
}

.hp-card-price-row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 8px;
  border-top: 1px solid var(--border);
}
.hp-card-price-label {
  font-size: 9px;
  font-weight: 600;
  color: var(--ink-4);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 2px;
}
.hp-card-price {
  font-size: 15px;
  font-weight: 700;
  color: var(--ink);
  letter-spacing: -0.03em;
}
.hp-card-arrow {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: var(--blue-soft);
  color: var(--blue);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition:
    background 0.16s,
    transform 0.16s;
}
.hp-card:hover .hp-card-arrow {
  background: var(--blue);
  color: white;
  transform: translateX(2px);
}

/* ── EMPTY STATE ───────────────────────────────────────── */
.hp-empty {
  text-align: center;
  padding: 64px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
.hp-empty-icon {
  font-size: 40px;
  margin-bottom: 4px;
}
.hp-empty-title {
  font-size: 16px;
  font-weight: 700;
  color: var(--ink-2);
}
.hp-empty-sub {
  font-size: 13px;
  color: var(--ink-4);
}

/* ── FOOTER ────────────────────────────────────────────── */
.hp-footer {
  text-align: center;
  padding: 20px 16px;
  font-size: 11px;
  font-weight: 600;
  color: var(--ink-4);
  letter-spacing: 0.03em;
  border-top: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
.hp-footer-dot {
  color: var(--ink-5);
}
</style>
