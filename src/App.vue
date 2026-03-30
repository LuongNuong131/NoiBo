<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <div class="relative min-h-screen text-slate-200 selection:bg-blue-500/30">
    <div class="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
      <div
        class="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[120px] animate-pulse-slow"
      />
      <div
        class="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-purple-600/10 blur-[120px] animate-pulse-slow"
      />
    </div>

    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>

    <footer
      class="py-10 px-6 border-t border-white/5 bg-slate-950/50 backdrop-blur-2xl mt-auto"
    >
      <div
        class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4"
      >
        <div class="flex flex-col items-center md:items-start">
          <span class="text-xl font-black tracking-tighter text-white">
            KHO TỔNG <span class="text-blue-500">PREMIUM</span>
          </span>
          <p
            class="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mt-1"
          >
            Hệ thống tra cứu nội bộ
          </p>
        </div>
        <div
          class="text-[10px] font-black text-slate-600 uppercase tracking-widest"
        >
          © 2026 PREMIUM SYSTEM
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
/* Hiệu ứng chuyển trang mượt mà */
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
