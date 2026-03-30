<script setup>
import { ref, computed } from "vue";
import { productsData } from "../data/products";
import { Search, Zap, Cpu, Battery } from "lucide-vue-next";

const search = ref("");
const osFilter = ref("All");

const filteredProducts = computed(() => {
  return productsData.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.value.toLowerCase()) ||
      p.storage.toLowerCase().includes(search.value.toLowerCase());
    const matchOs = osFilter.value === "All" || p.os === osFilter.value;
    return matchSearch && matchOs;
  });
});

const formatVND = (val) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    val,
  );
</script>

<template>
  <main class="max-w-7xl mx-auto px-6 pt-12 md:pt-20 pb-20 relative z-10">
    <div
      v-if="!search"
      class="mb-14 p-12 md:p-16 rounded-[3rem] bg-glass-premium border border-white/5 relative overflow-hidden group shadow-[0_0_50px_rgba(0,0,0,0.5)]"
    >
      <div
        class="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full blur-[100px] opacity-30 animate-pulse-slow group-hover:opacity-50 transition-opacity duration-700"
      />

      <div class="relative z-10 max-w-2xl animate-float">
        <div
          class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-black uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(59,130,246,0.2)] mb-8"
        >
          <Zap size="14" class="text-yellow-400" /> Live Database Sync
        </div>
        <h1
          class="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4 leading-[1.1]"
        >
          TRA CỨU <br />
          <span class="text-shimmer animate-shimmer">HÀNG TUYỂN CHỌN</span>
        </h1>
        <p class="text-lg text-slate-400 font-medium max-w-lg">
          Cơ sở dữ liệu giá vốn nội bộ được mã hóa. Tuyệt đối không để lộ ra
          ngoài.
        </p>
      </div>
    </div>

    <div
      class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 sticky top-6 z-40 bg-[#0f172a]/90 backdrop-blur-2xl p-5 rounded-[2.5rem] border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
    >
      <div class="relative w-full md:max-w-md group">
        <div
          class="absolute inset-[-2px] bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 blur transition-opacity duration-500"
        />
        <div
          class="relative flex items-center bg-[#020617] rounded-3xl px-5 py-4 border border-white/5"
        >
          <Search class="text-blue-500 mr-4" size="22" />
          <input
            v-model="search"
            type="text"
            placeholder="Quét mã, tên máy, dung lượng..."
            class="w-full bg-transparent text-white font-bold outline-none placeholder:text-slate-600 text-lg"
          />
        </div>
      </div>

      <div
        class="flex items-center gap-3 overflow-x-auto pb-2 md:pb-0 scrollbar-hide"
      >
        <button
          v-for="opt in ['All', 'IOS', 'Android']"
          :key="opt"
          @click="osFilter = opt"
          :class="
            osFilter === opt
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_0_20px_rgba(59,130,246,0.6)] border-transparent'
              : 'bg-white/5 text-slate-400 border-white/10 hover:bg-white/10 hover:text-white'
          "
          class="px-8 py-4 rounded-2xl text-sm font-black border transition-all whitespace-nowrap uppercase tracking-widest"
        >
          {{ opt === "All" ? "Tất cả" : opt }}
        </button>
      </div>
    </div>

    <TransitionGroup
      name="list"
      tag="div"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
    >
      <router-link
        v-for="product in filteredProducts"
        :key="product.id"
        :to="'/product/' + product.id"
        class="group block relative"
      >
        <div
          class="absolute inset-[-2px] bg-gradient-to-b from-blue-500 to-purple-600 rounded-[2.2rem] opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500"
        />

        <div
          class="relative h-full flex flex-col bg-[#0f172a] border border-white/10 rounded-[2rem] overflow-hidden transition-transform duration-500 group-hover:-translate-y-2"
        >
          <div class="aspect-[4/5] overflow-hidden relative">
            <div
              class="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent z-10 opacity-90"
            />
            <img
              :src="product.images[0]"
              class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1"
            />
            <div class="absolute top-5 left-5 z-20">
              <span
                class="bg-black/60 backdrop-blur-xl px-4 py-2 rounded-full text-white text-[10px] font-black uppercase tracking-widest border border-white/20 shadow-[0_0_15px_rgba(0,0,0,0.8)]"
              >
                {{ product.condition }}
              </span>
            </div>
          </div>

          <div class="p-6 flex-grow flex flex-col z-20 -mt-10">
            <p
              class="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] mb-2"
            >
              {{ product.brand }}
            </p>
            <h3
              class="text-xl font-black text-white mb-4 leading-tight group-hover:text-blue-400 transition-colors drop-shadow-lg"
            >
              {{ product.name }}
            </h3>

            <div class="mt-auto pt-5 border-t border-white/10">
              <div
                class="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 mb-5"
              >
                {{ formatVND(product.price) }}
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div
                  class="flex items-center justify-center gap-2 bg-[#020617] py-2.5 rounded-xl border border-white/5 group-hover:border-blue-500/30 transition-colors"
                >
                  <Cpu class="w-4 h-4 text-blue-400" />
                  <span class="text-xs font-black text-slate-300">{{
                    product.storage
                  }}</span>
                </div>
                <div
                  class="flex items-center justify-center gap-2 bg-[#020617] py-2.5 rounded-xl border border-white/5 group-hover:border-emerald-500/30 transition-colors"
                >
                  <Battery class="w-4 h-4 text-emerald-400" />
                  <span class="text-xs font-black text-slate-300">{{
                    product.battery
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </router-link>
    </TransitionGroup>
  </main>
</template>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px) scale(0.9);
}
.list-leave-active {
  position: absolute;
}
</style>
