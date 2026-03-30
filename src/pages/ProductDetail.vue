<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { productsData } from "../data/products";
import { ArrowLeft, Copy, Calculator, Cpu, Zap, Info } from "lucide-vue-next";

const route = useRoute();
const router = useRouter();
const product = computed(() =>
  productsData.find((p) => p.id === parseInt(route.params.id)),
);

const profit = ref(500000);
const quickProfits = [500000, 1000000, 1500000, 2000000];
const finalPrice = computed(() => (product.value?.price || 0) + profit.value);

const formatVND = (val) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    val,
  );

const handleCopy = async () => {
  if (!product.value) return;
  const text = `🔥 Siêu phẩm: ${product.value.name} (${product.value.storage})\n✨ Tình trạng: ${product.value.condition}\n🔋 Pin zin: ${product.value.battery}\n📦 Đi kèm: ${product.value.accessories}\n💰 Giá cực nét: ${formatVND(finalPrice.value)}\n\n👉 Nhắn chốt ngay với em nhé!`;
  try {
    await navigator.clipboard.writeText(text);
    alert("Đã copy thành công! Dán gửi khách ngay thôi.");
  } catch (err) {
    alert("Lỗi khi copy!");
  }
};

onMounted(() => window.scrollTo(0, 0));
</script>

<template>
  <div v-if="product" class="min-h-screen pb-48 relative">
    <nav
      class="sticky top-0 z-50 px-6 py-5 backdrop-blur-2xl bg-[#020617]/70 border-b border-white/5"
    >
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <button
          @click="router.back()"
          class="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all border border-white/5 group shadow-lg"
        >
          <ArrowLeft
            class="w-5 h-5 text-white group-hover:-translate-x-1 transition-transform"
          />
        </button>
        <div class="text-center">
          <h2
            class="font-black text-white text-lg tracking-tight drop-shadow-md"
          >
            {{ product.name }}
          </h2>
          <p
            class="text-[10px] text-blue-500 font-black uppercase tracking-[0.3em]"
          >
            Hồ sơ bảo mật
          </p>
        </div>
        <div class="w-11"></div>
      </div>
    </nav>

    <div
      class="max-w-6xl mx-auto px-6 mt-10 grid grid-cols-1 lg:grid-cols-12 gap-12"
    >
      <div class="lg:col-span-5 relative group">
        <div
          class="absolute -inset-1 bg-gradient-to-b from-blue-500 to-purple-600 rounded-[3.2rem] opacity-30 blur-xl group-hover:opacity-50 transition-opacity duration-1000"
        />
        <div
          class="aspect-[4/5] bg-[#0f172a] rounded-[3rem] border border-white/10 overflow-hidden relative shadow-2xl z-10"
        >
          <img
            :src="product.images[0]"
            class="w-full h-full object-cover hover:scale-110 transition-transform duration-1000"
          />
          <div
            class="absolute top-6 left-6 bg-[#020617]/80 backdrop-blur-xl px-5 py-3 rounded-2xl border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.8)]"
          >
            <p
              class="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1"
            >
              Giá nhập kho
            </p>
            <p
              class="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400"
            >
              {{ formatVND(product.price) }}
            </p>
          </div>
        </div>
      </div>

      <div class="lg:col-span-7 space-y-8 py-4">
        <div class="animate-float" style="animation-duration: 8s">
          <h1
            class="text-5xl md:text-6xl font-black text-white mb-4 tracking-tighter leading-none"
          >
            {{ product.name }}
          </h1>
          <p class="text-2xl text-slate-400 font-bold">
            Bản <span class="text-white">{{ product.storage }}</span> • Màu
            <span class="text-white">{{ product.color }}</span>
          </p>
        </div>

        <div class="grid grid-cols-2 gap-5">
          <div
            class="bg-gradient-to-br from-blue-900/20 to-transparent border border-blue-500/20 p-5 rounded-[2rem] flex items-center gap-5 hover:border-blue-500/50 transition-colors"
          >
            <div class="p-4 bg-blue-500/10 rounded-2xl">
              <Cpu class="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p
                class="text-[10px] text-blue-400/70 font-black uppercase tracking-widest"
              >
                Tình trạng
              </p>
              <p class="text-lg font-black text-white">
                {{ product.condition }}
              </p>
            </div>
          </div>
          <div
            class="bg-gradient-to-br from-emerald-900/20 to-transparent border border-emerald-500/20 p-5 rounded-[2rem] flex items-center gap-5 hover:border-emerald-500/50 transition-colors"
          >
            <div class="p-4 bg-emerald-500/10 rounded-2xl">
              <Zap class="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <p
                class="text-[10px] text-emerald-400/70 font-black uppercase tracking-widest"
              >
                Độ chai pin
              </p>
              <p class="text-lg font-black text-white">{{ product.battery }}</p>
            </div>
          </div>
        </div>

        <div
          class="bg-[#1e1b4b]/30 border border-indigo-500/20 p-8 rounded-[2.5rem] relative overflow-hidden"
        >
          <div class="absolute top-0 right-0 p-6 opacity-5">
            <Info class="w-32 h-32 text-indigo-400" />
          </div>
          <div class="relative z-10">
            <h3
              class="text-indigo-400 text-xs font-black uppercase tracking-[0.2em] mb-4"
            >
              Ghi chú kiểm định
            </h3>
            <p
              class="text-indigo-100/80 font-medium text-lg leading-relaxed mb-6"
            >
              {{ product.notes }}
            </p>
            <div
              class="grid grid-cols-2 gap-6 pt-6 border-t border-indigo-500/20"
            >
              <div>
                <span
                  class="block text-[10px] text-indigo-400/50 font-black uppercase mb-2 tracking-widest"
                  >Phụ kiện</span
                >
                <span class="text-white font-black text-sm">{{
                  product.accessories
                }}</span>
              </div>
              <div>
                <span
                  class="block text-[10px] text-indigo-400/50 font-black uppercase mb-2 tracking-widest"
                  >Sinh trắc học</span
                >
                <span class="text-white font-black text-sm">{{
                  product.faceid
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="fixed bottom-0 left-0 right-0 z-50 p-6">
      <div
        class="max-w-5xl mx-auto bg-[#0f172a]/90 backdrop-blur-3xl rounded-[3rem] p-8 border border-white/10 shadow-[0_-20px_80px_rgba(0,0,0,0.8)] flex flex-col lg:flex-row items-center gap-8 justify-between relative overflow-hidden"
      >
        <div
          class="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"
        />

        <div class="w-full lg:w-1/2 space-y-4">
          <div class="flex items-center justify-between">
            <label
              class="text-xs font-black text-blue-400 uppercase tracking-[0.2em] flex items-center gap-2"
            >
              <Calculator class="w-4 h-4" /> Margin Control
            </label>
            <div
              class="flex gap-2 bg-[#020617] p-1.5 rounded-2xl border border-white/5"
            >
              <button
                v-for="val in quickProfits"
                :key="val"
                @click="profit = val"
                :class="
                  profit === val
                    ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]'
                    : 'text-slate-400 hover:text-white'
                "
                class="text-xs font-black px-4 py-2 rounded-xl transition-all"
              >
                +{{ val / 1000000 }}M
              </button>
            </div>
          </div>
          <div class="relative">
            <span
              class="absolute left-6 top-1/2 -translate-y-1/2 text-blue-500 font-black text-xl"
              >₫</span
            >
            <input
              type="number"
              v-model="profit"
              class="w-full bg-[#020617] border border-white/10 rounded-[1.5rem] pl-14 pr-6 py-5 text-white font-black text-2xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all shadow-inner"
            />
          </div>
        </div>

        <div
          class="w-full lg:w-1/2 flex items-center justify-between gap-6 pl-0 lg:pl-8 border-t lg:border-t-0 lg:border-l border-white/10 pt-6 lg:pt-0"
        >
          <div>
            <p
              class="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-2"
            >
              Giá chốt Sale
            </p>
            <p
              class="text-4xl md:text-5xl font-black text-white tracking-tighter drop-shadow-lg"
            >
              {{ formatVND(finalPrice) }}
            </p>
          </div>
          <button
            @click="handleCopy"
            class="group relative overflow-hidden flex items-center gap-3 bg-white text-black px-8 py-5 rounded-[2rem] font-black hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)] flex-shrink-0"
          >
            <div
              class="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/80 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"
            />
            <Copy class="w-6 h-6 relative z-10" />
            <span
              class="relative z-10 text-lg uppercase tracking-widest hidden sm:block"
              >Copy Form</span
            >
            <span class="relative z-10 text-lg uppercase sm:hidden">Copy</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
