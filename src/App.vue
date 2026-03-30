<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <div class="root-shell">
    <router-view v-slot="{ Component }">
      <transition name="page" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style>
/* ─── FONTS ─────────────────────────────────────────────── */
@import url("https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400&family=JetBrains+Mono:wght@500;700&display=swap");

/* ─── DESIGN TOKENS ─────────────────────────────────────── */
:root {
  --bg: #f4f6fb;
  --bg-card: #ffffff;
  --bg-muted: #edf0f8;
  --bg-input: #eef1f8;

  --border: #e0e4f0;
  --border-md: #c5cae0;

  --ink: #111827;
  --ink-2: #1f2937;
  --ink-3: #6b7280;
  --ink-4: #9ca3af;
  --ink-5: #d1d5db;

  --blue: #2563eb;
  --blue-dark: #1d4ed8;
  --blue-hover: #1e56d4;
  --blue-light: #dbeafe;
  --blue-soft: #eff6ff;
  --blue-muted: #bfdbfe;

  --green: #16a34a;
  --green-bg: #f0fdf4;
  --green-border: #bbf7d0;
  --green-text: #15803d;

  --amber: #b45309;
  --amber-bg: #fffbeb;
  --amber-border: #fde68a;
  --amber-text: #92400e;

  --shadow-sm:
    0 1px 3px rgba(17, 24, 39, 0.07), 0 1px 2px rgba(17, 24, 39, 0.04);
  --shadow-md:
    0 4px 16px rgba(17, 24, 39, 0.09), 0 2px 4px rgba(17, 24, 39, 0.05);
  --shadow-lg:
    0 12px 40px rgba(17, 24, 39, 0.11), 0 4px 10px rgba(17, 24, 39, 0.06);
  --shadow-card:
    0 2px 8px rgba(37, 99, 235, 0.07), 0 1px 3px rgba(17, 24, 39, 0.06);
  --shadow-blue: 0 8px 32px rgba(37, 99, 235, 0.25);

  --r-sm: 8px;
  --r-md: 14px;
  --r-lg: 20px;
  --r-xl: 24px;
}

/* ─── RESET ──────────────────────────────────────────────── */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-family:
    "Be Vietnam Pro",
    system-ui,
    -apple-system,
    sans-serif;
  background: var(--bg);
  color: var(--ink);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body {
  overflow-x: hidden;
  min-height: 100dvh;
}

::selection {
  background: var(--blue-light);
  color: var(--blue-dark);
}

/* ─── SCROLLBAR ──────────────────────────────────────────── */
::-webkit-scrollbar {
  width: 4px;
}
::-webkit-scrollbar-track {
  background: var(--bg);
}
::-webkit-scrollbar-thumb {
  background: var(--border-md);
  border-radius: 99px;
}
::-webkit-scrollbar-thumb:hover {
  background: #a0a8c0;
}

/* ─── PAGE TRANSITION ────────────────────────────────────── */
.page-enter-active,
.page-leave-active {
  transition:
    opacity 0.22s ease,
    transform 0.22s ease;
}
.page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

/* ─── GLOBAL UTILITIES ───────────────────────────────────── */
.mono {
  font-family: "JetBrains Mono", monospace;
  letter-spacing: -0.03em;
}

/* ─── INPUT RESET ────────────────────────────────────────── */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
}
input[type="number"] {
  -moz-appearance: textfield;
}
input,
button {
  font-family: inherit;
}
</style>
