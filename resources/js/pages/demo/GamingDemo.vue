<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3';
import { ref, computed } from 'vue';

// Game categories
const gameCategories = ref([
    { id: 'all', name: 'ทั้งหมด', iconType: 'gamepad' },
    { id: 'moba', name: 'MOBA', iconType: 'sword' },
    { id: 'fps', name: 'FPS', iconType: 'crosshair' },
    { id: 'mmorpg', name: 'MMORPG', iconType: 'dragon' },
    { id: 'mobile', name: 'Mobile', iconType: 'mobile' },
]);

const activeCategory = ref('all');

// Featured games for top-up
const games = ref([
    { 
        id: 1, 
        name: 'Valorant', 
        category: 'fps',
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400',
        currency: 'VP',
        color: 'from-red-500 to-pink-600',
        popular: true
    },
    { 
        id: 2, 
        name: 'League of Legends', 
        category: 'moba',
        image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400',
        currency: 'RP',
        color: 'from-yellow-500 to-orange-600',
        popular: true
    },
    { 
        id: 3, 
        name: 'Genshin Impact', 
        category: 'mmorpg',
        image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400',
        currency: 'Genesis Crystal',
        color: 'from-blue-500 to-cyan-600',
        popular: true
    },
    { 
        id: 4, 
        name: 'Mobile Legends', 
        category: 'mobile',
        image: 'https://images.unsplash.com/photo-1493711662062-fa541f7f66e4?w=400',
        currency: 'Diamond',
        color: 'from-purple-500 to-violet-600',
        popular: false
    },
    { 
        id: 5, 
        name: 'PUBG Mobile', 
        category: 'mobile',
        image: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=400',
        currency: 'UC',
        color: 'from-orange-500 to-yellow-600',
        popular: false
    },
    { 
        id: 6, 
        name: 'Free Fire', 
        category: 'mobile',
        image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b2b0c?w=400',
        currency: 'Diamond',
        color: 'from-green-500 to-emerald-600',
        popular: false
    },
]);

// Top-up packages
const topupPackages = ref([
    { id: 1, amount: 100, bonus: 0, price: 35 },
    { id: 2, amount: 310, bonus: 10, price: 105, popular: true },
    { id: 3, amount: 520, bonus: 30, price: 175 },
    { id: 4, amount: 1060, bonus: 80, price: 350 },
    { id: 5, amount: 2180, bonus: 200, price: 700 },
    { id: 6, amount: 5500, bonus: 600, price: 1750 },
]);

// Game accounts for sale
const gameAccounts = ref([
    { 
        id: 1, 
        game: 'Valorant', 
        rank: 'Immortal 2', 
        skins: 45, 
        price: 8500,
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400',
        verified: true,
        seller: 'ProGamer99'
    },
    { 
        id: 2, 
        game: 'Genshin Impact', 
        rank: 'AR 58', 
        skins: 28, 
        price: 12000,
        image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400',
        verified: true,
        seller: 'GenshinMaster'
    },
    { 
        id: 3, 
        game: 'League of Legends', 
        rank: 'Diamond 1', 
        skins: 120, 
        price: 6500,
        image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400',
        verified: false,
        seller: 'LoLKing'
    },
]);

const filteredGames = computed(() => {
    if (activeCategory.value === 'all') return games.value;
    return games.value.filter(game => game.category === activeCategory.value);
});

// Selected states
const selectedGame = ref<number | null>(null);
const selectedPackage = ref<number | null>(null);
const showTopupModal = ref(false);
const gameId = ref('');

const selectGame = (id: number) => {
    selectedGame.value = id;
    showTopupModal.value = true;
};

const closeModal = () => {
    showTopupModal.value = false;
    selectedGame.value = null;
    selectedPackage.value = null;
    gameId.value = '';
};

// Features
const features = [
    { iconType: 'lightning', title: 'เติมไว 1 นาที', desc: 'ระบบอัตโนมัติ เติมเสร็จทันที' },
    { iconType: 'shield', title: 'ปลอดภัย 100%', desc: 'รับประกันทุกการทำรายการ' },
    { iconType: 'money', title: 'ราคาถูกที่สุด', desc: 'เปรียบเทียบราคาได้เลย' },
    { iconType: 'gift', title: 'โบนัสพิเศษ', desc: 'รับเพิ่มทุกการเติม' },
];

// Stats
const stats = [
    { value: '50K+', label: 'ผู้ใช้งาน' },
    { value: '1M+', label: 'ทำรายการสำเร็จ' },
    { value: '99.9%', label: 'อัตราสำเร็จ' },
    { value: '24/7', label: 'ซัพพอร์ต' },
];
</script>

<template>
    <Head title="GameVibe - เติมเกม ซื้อขายไอดี">
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800&family=Noto+Sans+Thai:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
    </Head>

    <div class="min-h-screen bg-slate-950 text-white font-sans">
        <!-- Animated Background -->
        <div class="fixed inset-0 overflow-hidden pointer-events-none z-0">
            <!-- Gradient Mesh -->
            <div class="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-slate-950 to-cyan-900/10" />
            
            <!-- Grid Pattern -->
            <div class="absolute inset-0 opacity-[0.03]" 
                 style="background-image: linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px); background-size: 40px 40px;" />
            
            <!-- Floating particles -->
            <div class="absolute w-1 h-1 bg-purple-400/40 rounded-full animate-ping" style="top: 20%; left: 10%;" />
            <div class="absolute w-1.5 h-1.5 bg-cyan-400/30 rounded-full animate-ping" style="top: 60%; left: 80%; animation-delay: 0.5s;" />
            <div class="absolute w-1 h-1 bg-pink-400/40 rounded-full animate-ping" style="top: 80%; left: 20%; animation-delay: 1s;" />
        </div>

        <!-- Navigation -->
        <nav class="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 py-3">
                <div class="flex items-center justify-between">
                    <!-- Logo -->
                    <Link href="/" class="flex items-center gap-3 group">
                        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                            <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                            </svg>
                        </div>
                        <div>
                            <h1 class="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent" style="font-family: 'Orbitron', sans-serif;">
                                GAMEVIBE
                            </h1>
                            <p class="text-xs text-slate-500">เติมเกม & ซื้อขายไอดี</p>
                        </div>
                    </Link>

                    <!-- Nav Links -->
                    <div class="hidden md:flex items-center gap-8">
                        <a href="#topup" class="text-slate-400 hover:text-white transition-colors text-sm font-medium">เติมเกม</a>
                        <a href="#accounts" class="text-slate-400 hover:text-white transition-colors text-sm font-medium">ซื้อไอดี</a>
                        <a href="#sell" class="text-slate-400 hover:text-white transition-colors text-sm font-medium">ขายไอดี</a>
                    </div>

                    <!-- Actions -->
                    <div class="flex items-center gap-3">
                        <button class="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                            <svg class="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                        <button class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 text-white text-sm font-semibold shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300">
                            เข้าสู่ระบบ
                        </button>
                    </div>
                </div>
            </div>
        </nav>

        <!-- Hero Section -->
        <section class="relative z-10 pt-32 pb-20 overflow-hidden">
            <div class="max-w-7xl mx-auto px-4 sm:px-6">
                <div class="text-center max-w-4xl mx-auto">
                    <!-- Badge -->
                    <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20 mb-8">
                        <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        <span class="text-sm text-slate-300">เติมเกมอัตโนมัติ ได้รับทันที</span>
                    </div>

                    <!-- Title -->
                    <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                        <span class="text-white">เติมเกม</span>
                        <span class="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent"> ไว ถูก ปลอดภัย</span>
                    </h1>

                    <p class="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10">
                        ศูนย์รวมเติมเกมออนไลน์และซื้อขายไอดีเกม ราคาถูกที่สุด 
                        รับประกันทุกการทำรายการ พร้อมโบนัสพิเศษ
                    </p>

                    <!-- CTA Buttons -->
                    <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                        <a href="#topup" class="group px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold shadow-xl shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300 flex items-center gap-2">
                            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            เติมเกมเลย
                        </a>
                        <a href="#accounts" class="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-all duration-300">
                            ซื้อไอดีเกม
                        </a>
                    </div>

                    <!-- Stats -->
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                        <div v-for="stat in stats" :key="stat.label" class="p-4 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm">
                            <div class="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent" style="font-family: 'Orbitron', sans-serif;">
                                {{ stat.value }}
                            </div>
                            <div class="text-sm text-slate-500">{{ stat.label }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Features -->
        <section class="relative z-10 py-16 border-y border-white/5 bg-white/[0.02]">
            <div class="max-w-7xl mx-auto px-4 sm:px-6">
                <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div v-for="feature in features" :key="feature.title" class="text-center p-6 rounded-2xl bg-slate-800/80 border border-white/10 hover:border-purple-500/30 transition-colors">
                        <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/20">
                            <!-- Lightning Icon -->
                            <svg v-if="feature.iconType === 'lightning'" class="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            <!-- Shield Icon -->
                            <svg v-else-if="feature.iconType === 'shield'" class="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            <!-- Money Icon -->
                            <svg v-else-if="feature.iconType === 'money'" class="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <!-- Gift Icon -->
                            <svg v-else class="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                            </svg>
                        </div>
                        <h3 class="font-semibold text-white mb-1">{{ feature.title }}</h3>
                        <p class="text-sm text-slate-300">{{ feature.desc }}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Top-up Section -->
        <section id="topup" class="relative z-10 py-20">
            <div class="max-w-7xl mx-auto px-4 sm:px-6">
                <!-- Section Header -->
                <div class="text-center mb-12">
                    <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-4">
                        <svg class="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span class="text-purple-400 text-sm font-medium">เติมเกม</span>
                    </div>
                    <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">เลือกเกมที่ต้องการเติม</h2>
                    <p class="text-slate-400 max-w-xl mx-auto">รองรับเกมยอดนิยมทุกแพลตฟอร์ม เติมได้ทันที</p>
                </div>

                <!-- Category Tabs -->
                <div class="flex flex-wrap justify-center gap-2 mb-10">
                    <button 
                        v-for="cat in gameCategories" 
                        :key="cat.id"
                        @click="activeCategory = cat.id"
                        class="px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2"
                        :class="activeCategory === cat.id 
                            ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-lg shadow-purple-500/30' 
                            : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/5'"
                    >
                        <!-- Gamepad Icon -->
                        <svg v-if="cat.iconType === 'gamepad'" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                        </svg>
                        <!-- Sword Icon -->
                        <svg v-else-if="cat.iconType === 'sword'" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <!-- Crosshair Icon -->
                        <svg v-else-if="cat.iconType === 'crosshair'" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <!-- Dragon Icon -->
                        <svg v-else-if="cat.iconType === 'dragon'" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                        </svg>
                        <!-- Mobile Icon -->
                        <svg v-else class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        {{ cat.name }}
                    </button>
                </div>

                <!-- Games Grid -->
                <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    <button 
                        v-for="game in filteredGames" 
                        :key="game.id"
                        @click="selectGame(game.id)"
                        class="group relative rounded-2xl overflow-hidden aspect-[3/4] transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 border border-white/10"
                        :class="`bg-gradient-to-br ${game.color}`"
                    >
                        <!-- Image -->
                        <img :src="game.image" :alt="game.name" class="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                        
                        <!-- Overlay -->
                        <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
                        
                        <!-- Popular Badge -->
                        <div v-if="game.popular" class="absolute top-3 right-3 px-2 py-1 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 text-xs font-semibold text-white">
                            🔥 HOT
                        </div>
                        
                        <!-- Content -->
                        <div class="absolute bottom-0 left-0 right-0 p-4">
                            <div :class="`w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-2 shadow-lg border border-white/20`">
                                <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 class="font-bold text-white text-sm mb-0.5">{{ game.name }}</h3>
                            <p class="text-xs text-slate-300">{{ game.currency }}</p>
                        </div>
                        
                        <!-- Hover Effect -->
                        <div class="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                </div>
            </div>
        </section>

        <!-- Game Accounts Section -->
        <section id="accounts" class="relative z-10 py-20 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent">
            <div class="max-w-7xl mx-auto px-4 sm:px-6">
                <!-- Section Header -->
                <div class="text-center mb-12">
                    <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-4">
                        <svg class="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span class="text-cyan-400 text-sm font-medium">ซื้อไอดีเกม</span>
                    </div>
                    <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">ไอดีเกมพร้อมขาย</h2>
                    <p class="text-slate-400 max-w-xl mx-auto">ไอดีคุณภาพ ตรวจสอบแล้ว พร้อมโอนทันที</p>
                </div>

                <!-- Accounts Grid -->
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div 
                        v-for="account in gameAccounts" 
                        :key="account.id"
                        class="group relative rounded-2xl overflow-hidden bg-slate-900/50 border border-white/5 hover:border-cyan-500/30 transition-all duration-300"
                    >
                        <!-- Header Image -->
                        <div class="relative h-40 overflow-hidden">
                            <img :src="account.image" :alt="account.game" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            <div class="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                            
                            <!-- Verified Badge -->
                            <div v-if="account.verified" class="absolute top-3 left-3 px-2 py-1 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-medium flex items-center gap-1">
                                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                </svg>
                                ตรวจสอบแล้ว
                            </div>
                        </div>
                        
                        <!-- Content -->
                        <div class="p-5">
                            <div class="flex items-start justify-between mb-3">
                                <div>
                                    <h3 class="font-bold text-white text-lg">{{ account.game }}</h3>
                                    <p class="text-sm text-slate-500">โดย {{ account.seller }}</p>
                                </div>
                                <div class="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-sm font-semibold">
                                    {{ account.rank }}
                                </div>
                            </div>
                            
                            <div class="flex items-center gap-4 mb-4">
                                <div class="flex items-center gap-1 text-slate-400 text-sm">
                                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    {{ account.skins }} สกิน
                                </div>
                            </div>
                            
                            <div class="flex items-center justify-between pt-4 border-t border-white/5">
                                <div>
                                    <div class="text-2xl font-bold text-white">฿{{ account.price.toLocaleString() }}</div>
                                </div>
                                <button class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-semibold shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-300">
                                    ซื้อเลย
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- View All Button -->
                <div class="text-center mt-10">
                    <button class="px-8 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors">
                        ดูไอดีทั้งหมด →
                    </button>
                </div>
            </div>
        </section>

        <!-- Sell Section -->
        <section id="sell" class="relative z-10 py-20">
            <div class="max-w-4xl mx-auto px-4 sm:px-6">
                <div class="relative rounded-3xl overflow-hidden">
                    <!-- Background -->
                    <div class="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-slate-900 to-cyan-900/50" />
                    
                    <!-- Content -->
                    <div class="relative p-8 md:p-12 text-center">
                        <div class="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-purple-500/30">
                            <svg class="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        
                        <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">อยากขายไอดีเกม?</h2>
                        <p class="text-slate-300 max-w-lg mx-auto mb-8">
                            ลงขายไอดีเกมของคุณกับเรา ฟรีค่าธรรมเนียม! 
                            มีผู้ซื้อพร้อมจ่ายรอคุณอยู่
                        </p>
                        
                        <button class="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold shadow-xl shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300">
                            ลงขายไอดีฟรี
                        </button>
                    </div>
                </div>
            </div>
        </section>

        <!-- Vibedev Banner -->
        <section class="relative z-10 py-8 bg-gradient-to-r from-purple-600 to-cyan-600">
            <div class="max-w-7xl mx-auto px-4 sm:px-6">
                <div class="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div class="text-center md:text-left">
                        <p class="text-white/80 text-sm">นี่คือตัวอย่างจาก</p>
                        <p class="text-white font-bold text-xl">Vibedev - ระบบเติมเกมและซื้อขายไอดี</p>
                    </div>
                    <Link 
                        href="/"
                        class="px-6 py-3 rounded-xl bg-white text-purple-600 font-semibold hover:bg-purple-50 transition-colors"
                    >
                        ← กลับหน้าหลัก Vibedev
                    </Link>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <footer class="relative z-10 border-t border-white/5 py-12 bg-slate-950/50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6">
                <div class="flex flex-col md:flex-row items-center justify-between gap-6">
                    <!-- Logo -->
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
                            <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <span class="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent" style="font-family: 'Orbitron', sans-serif;">
                            GAMEVIBE
                        </span>
                    </div>
                    
                    <!-- Copyright -->
                    <p class="text-slate-500 text-sm">
                        © 2025 GameVibe. Demo by Vibedev
                    </p>
                    
                    <!-- Back to Home -->
                    <Link 
                        href="/"
                        class="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-medium hover:bg-white/10 transition-colors flex items-center gap-2"
                    >
                        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        กลับหน้าหลัก
                    </Link>
                </div>
            </div>
        </footer>

        <!-- Top-up Modal -->
        <Teleport to="body">
            <Transition name="modal">
                <div v-if="showTopupModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <!-- Backdrop -->
                    <div class="absolute inset-0 bg-black/80 backdrop-blur-sm" @click="closeModal" />
                    
                    <!-- Modal -->
                    <div class="relative w-full max-w-lg bg-slate-900 rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
                        <!-- Header -->
                        <div class="relative h-32 bg-gradient-to-r from-purple-600 to-cyan-600 flex items-center justify-center">
                            <h3 class="text-2xl font-bold text-white">เลือกแพ็คเกจ</h3>
                            <button @click="closeModal" class="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
                                <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        
                        <!-- Content -->
                        <div class="p-6">
                            <!-- Game ID Input -->
                            <div class="mb-6">
                                <label class="block text-sm text-slate-400 mb-2">Game ID / UID</label>
                                <input 
                                    v-model="gameId"
                                    type="text" 
                                    placeholder="กรอก Game ID ของคุณ"
                                    class="w-full px-4 py-3 rounded-xl bg-slate-800 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
                                />
                            </div>
                            
                            <!-- Packages -->
                            <div class="grid grid-cols-2 gap-3 mb-6">
                                <button 
                                    v-for="pkg in topupPackages" 
                                    :key="pkg.id"
                                    @click="selectedPackage = pkg.id"
                                    class="relative p-4 rounded-xl border transition-all duration-300"
                                    :class="selectedPackage === pkg.id 
                                        ? 'bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border-purple-500' 
                                        : 'bg-slate-800/50 border-white/10 hover:border-white/20'"
                                >
                                    <!-- Popular Badge -->
                                    <div v-if="pkg.popular" class="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 text-xs font-semibold">
                                        ขายดี
                                    </div>
                                    
                                    <div class="text-lg font-bold text-white">{{ pkg.amount }}</div>
                                    <div v-if="pkg.bonus > 0" class="text-xs text-green-400">+{{ pkg.bonus }} โบนัส</div>
                                    <div class="text-sm text-purple-400 font-semibold mt-1">฿{{ pkg.price }}</div>
                                </button>
                            </div>
                            
                            <!-- Submit Button -->
                            <button 
                                :disabled="!selectedPackage || !gameId"
                                class="w-full py-4 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-purple-500/50 transition-all duration-300"
                            >
                                ดำเนินการเติม
                            </button>
                        </div>
                    </div>
                </div>
            </Transition>
        </Teleport>
    </div>
</template>

<style scoped>
.font-sans {
    font-family: 'Noto Sans Thai', sans-serif;
}

/* Modal Transition */
.modal-enter-active,
.modal-leave-active {
    transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

.modal-enter-from .relative,
.modal-leave-to .relative {
    transform: scale(0.95) translateY(20px);
}
</style>
