<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3';
import { ref, onMounted, onUnmounted, computed } from 'vue';

// Scroll position for parallax and animations
const scrollY = ref(0);
const isVisible = ref({
    hero: true,
    painPoints: false,
    solutions: false,
    demo: false,
    contact: false,
});

// Handle scroll for parallax and reveal animations
const handleScroll = () => {
    scrollY.value = window.scrollY;
    
    const sections = ['painPoints', 'solutions', 'demo', 'contact'];
    sections.forEach(section => {
        const el = document.getElementById(section);
        if (el) {
            const rect = el.getBoundingClientRect();
            isVisible.value[section as keyof typeof isVisible.value] = rect.top < window.innerHeight * 0.75;
        }
    });
};

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});

// Parallax calculations
const heroParallax = computed(() => scrollY.value * 0.5);
const floatingAnimation = computed(() => Math.sin(Date.now() / 1000) * 10);

// Hero fade out effect on scroll
const heroOpacity = computed(() => {
    const fadeStart = 0;
    const fadeEnd = 400; // Fully faded at 400px scroll
    const opacity = 1 - Math.min(scrollY.value, fadeEnd) / fadeEnd;
    return Math.max(0, Math.min(1, opacity));
});

const heroScale = computed(() => {
    const scaleStart = 1;
    const scaleEnd = 0.95;
    const progress = Math.min(scrollY.value / 400, 1);
    return scaleStart - (scaleStart - scaleEnd) * progress;
});

// Scroll to top function
const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Demo data for restaurant
const menuItems = [
    { id: 1, name: 'ต้มยำกุ้ง', price: 180, image: 'https://images.unsplash.com/photo-1548943487-a2e4e43b4853?w=400', category: 'อาหารจานหลัก' },
    { id: 2, name: 'ผัดไทย', price: 120, image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400', category: 'อาหารจานหลัก' },
    { id: 3, name: 'แกงเขียวหวาน', price: 150, image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400', category: 'อาหารจานหลัก' },
    { id: 4, name: 'ส้มตำ', price: 80, image: 'https://images.unsplash.com/photo-1569562211093-4ed0d0758f12?w=400', category: 'ของทานเล่น' },
];

const painPoints = [
    { iconType: 'money', title: 'จ้างทำเว็บราคาแพง', desc: 'งบประมาณหลักแสนถึงหลักล้าน เกินกว่าธุรกิจขนาดเล็กจะรับไหว' },
    { iconType: 'clock', title: 'รอนานหลายเดือน', desc: 'กว่าจะได้เว็บพร้อมใช้ ต้องรอ 3-6 เดือน ธุรกิจเสียโอกาส' },
    { iconType: 'wrench', title: 'แก้ไขลำบาก', desc: 'อยากเปลี่ยนข้อมูลต้องพึ่งโปรแกรมเมอร์ มีค่าใช้จ่ายเพิ่ม' },
    { iconType: 'phone', title: 'ไม่รองรับมือถือ', desc: 'เว็บแสดงผลบนมือถือไม่สวย ลูกค้าหนีไปหาคู่แข่ง' },
    { iconType: 'puzzle', title: 'ระบบใช้ยาก', desc: 'พนักงานเรียนรู้ไม่ทัน เสียเวลาฝึกอบรมนาน' },
    { iconType: 'lock', title: 'ไม่ปลอดภัย', desc: 'ข้อมูลลูกค้ารั่วไหล ความเสี่ยงทางกฎหมาย' },
];

const solutions = [
    { iconType: 'check', title: 'ราคาถูกกว่า 80%', desc: 'เริ่มต้นเพียง 1,999 บาท คุ้มค่าทุกบาททุกสตางค์', highlight: true },
    { iconType: 'zap', title: 'พร้อมใช้งานใน 7 วัน', desc: 'ระบบพร้อมใช้ ไม่ต้องรอนาน เริ่มธุรกิจได้ทันที' },
    { iconType: 'edit', title: 'แก้ไขได้เอง', desc: 'Admin Panel ใช้งานง่าย ไม่ต้องเขียนโค้ด' },
    { iconType: 'smartphone', title: 'Responsive 100%', desc: 'สวยทุกหน้าจอ ทั้งมือถือ แท็บเล็ต คอมพิวเตอร์' },
    { iconType: 'graduation', title: 'เรียนรู้ใน 1 วัน', desc: 'ระบบใช้งานง่าย ทุกคนเรียนรู้ได้ภายในวันเดียว' },
    { iconType: 'shield', title: 'ปลอดภัยสูง', desc: 'มาตรฐาน SSL และ Security ระดับสากล' },
];

const demoCards = [
    { 
        id: 'restaurant',
        title: 'เว็บไซต์ร้านอาหาร',
        desc: 'เว็บสวยงาม แสดงเมนู รีวิว สถานที่ตั้ง',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600',
        route: '/demo/restaurant',
        color: 'from-orange-500 to-red-500'
    },
    { 
        id: 'reservation',
        title: 'ระบบจองโต๊ะ',
        desc: 'ลูกค้าจองออนไลน์ ได้ทุกที่ทุกเวลา',
        image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600',
        route: '/demo/reservation',
        color: 'from-emerald-500 to-teal-500'
    },
    { 
        id: 'ecommerce',
        title: 'ร้านค้าออนไลน์',
        desc: 'ขายสินค้าออนไลน์ ตะกร้า ชำระเงิน',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600',
        route: '/demo/ecommerce',
        color: 'from-blue-500 to-cyan-500'
    },
    { 
        id: 'clinic',
        title: 'ระบบนัดหมายคลินิก',
        desc: 'นัดหมายแพทย์ จัดการคิว ประวัติ',
        image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600',
        route: '/demo/clinic',
        color: 'from-pink-500 to-rose-500'
    },
    { 
        id: 'admin',
        title: 'ระบบหลังบ้าน',
        desc: 'จัดการเมนู ออเดอร์ สถิติ ง่ายๆ',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600',
        route: '/demo/admin',
        color: 'from-violet-500 to-purple-500'
    },
    { 
        id: 'gaming',
        title: 'เติมเกม & ซื้อขายไอดี',
        desc: 'ระบบเติมเกมออนไลน์ ซื้อขายไอดี',
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600',
        route: '/demo/gaming',
        color: 'from-purple-500 to-cyan-500'
    },
];

// Hover states for micro-interactions
const hoveredCard = ref<string | null>(null);
const hoveredDemo = ref<string | null>(null);
</script>

<template>
    <Head title="Vibedev - สร้างระบบธุรกิจออนไลน์">
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Noto+Sans+Thai:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
    </Head>

    <div class="min-h-screen bg-slate-950 text-white overflow-x-hidden font-sans">
        <!-- Animated Background -->
        <div class="fixed inset-0 overflow-hidden pointer-events-none">
            <!-- Gradient Orbs with Animation -->
            <div 
                class="absolute w-[800px] h-[800px] rounded-full blur-[120px] opacity-30 animate-float-slow"
                :style="{
                    background: 'radial-gradient(circle, rgba(99,102,241,0.4) 0%, transparent 70%)',
                    top: '-200px',
                    right: '-200px',
                    transform: `translateY(${scrollY * 0.1}px)`
                }"
            />
            <div 
                class="absolute w-[600px] h-[600px] rounded-full blur-[100px] opacity-20 animate-float-medium"
                :style="{
                    background: 'radial-gradient(circle, rgba(236,72,153,0.4) 0%, transparent 70%)',
                    bottom: '20%',
                    left: '-150px',
                    transform: `translateY(${-scrollY * 0.15}px)`
                }"
            />
            <div 
                class="absolute w-[500px] h-[500px] rounded-full blur-[80px] opacity-25 animate-float-fast"
                :style="{
                    background: 'radial-gradient(circle, rgba(16,185,129,0.3) 0%, transparent 70%)',
                    top: '50%',
                    right: '10%',
                    transform: `translateY(${-scrollY * 0.08}px)`
                }"
            />
            
            <!-- Floating Particles -->
            <div class="absolute inset-0">
                <!-- Particle 1 -->
                <div class="absolute w-1 h-1 bg-indigo-400/40 rounded-full animate-particle-1" style="top: 20%; left: 10%;" />
                <div class="absolute w-1.5 h-1.5 bg-purple-400/30 rounded-full animate-particle-2" style="top: 30%; left: 80%;" />
                <div class="absolute w-1 h-1 bg-pink-400/40 rounded-full animate-particle-3" style="top: 60%; left: 15%;" />
                <div class="absolute w-2 h-2 bg-indigo-400/20 rounded-full animate-particle-4" style="top: 70%; left: 70%;" />
                <div class="absolute w-1 h-1 bg-emerald-400/30 rounded-full animate-particle-5" style="top: 40%; left: 50%;" />
                <div class="absolute w-1.5 h-1.5 bg-purple-400/40 rounded-full animate-particle-6" style="top: 80%; left: 30%;" />
                <div class="absolute w-1 h-1 bg-indigo-400/30 rounded-full animate-particle-7" style="top: 15%; left: 60%;" />
                <div class="absolute w-2 h-2 bg-pink-400/20 rounded-full animate-particle-8" style="top: 50%; left: 90%;" />
            </div>

            <!-- Shooting Stars -->
            <div class="absolute inset-0 overflow-hidden">
                <div class="absolute w-20 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shooting-star-1" style="top: 15%; left: -10%;" />
                <div class="absolute w-16 h-[1px] bg-gradient-to-r from-transparent via-indigo-400/50 to-transparent animate-shooting-star-2" style="top: 35%; left: -10%;" />
                <div class="absolute w-24 h-[1px] bg-gradient-to-r from-transparent via-purple-400/40 to-transparent animate-shooting-star-3" style="top: 55%; left: -10%;" />
            </div>
            
            <!-- Grid Pattern -->
            <div 
                class="absolute inset-0 opacity-[0.02]"
                style="background-image: linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px); background-size: 50px 50px;"
            />

            <!-- Radial Glow at Center -->
            <div 
                class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full animate-pulse-slow"
                style="background: radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 60%);"
            />
        </div>

        <!-- Navigation -->
        <nav 
            class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
            :class="[
                scrollY > 50 
                    ? 'py-2' 
                    : 'py-0',
            ]"
        >
            <!-- Glassmorphism Background (appears on scroll) -->
            <div 
                class="absolute inset-0 transition-all duration-500"
                :class="[
                    scrollY > 50 
                        ? 'opacity-100' 
                        : 'opacity-0'
                ]"
            >
                <!-- Gradient Border Top -->
                <div class="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
                <!-- Glass Background -->
                <div class="absolute inset-0 bg-slate-950/70 backdrop-blur-2xl" />
                <!-- Subtle gradient overlay -->
                <div class="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5" />
                <!-- Bottom border -->
                <div class="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>
            
            <div class="max-w-7xl mx-auto px-6 py-4 relative">
                <div class="flex items-center justify-between">
                    <!-- Logo -->
                    <div class="flex items-center gap-3">
                        <div 
                            class="w-10 h-10 rounded-xl overflow-hidden shadow-lg transition-all duration-300"
                            :class="scrollY > 50 ? 'shadow-indigo-500/40' : 'shadow-indigo-500/30'"
                        >
                            <img 
                                src="/images/vibedev-logo.png" 
                                alt="Vibedev Logo"
                                class="w-full h-full object-cover"
                            />
                        </div>
                        <span class="text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                            Vibedev
                        </span>
                    </div>

                    <!-- Nav Links -->
                    <div class="hidden md:flex items-center gap-8">
                        <a href="#painPoints" class="text-slate-400 hover:text-white transition-colors text-sm">ปัญหา</a>
                        <a href="#solutions" class="text-slate-400 hover:text-white transition-colors text-sm">วิธีแก้</a>
                        <a href="#demo" class="text-slate-400 hover:text-white transition-colors text-sm">ตัวอย่างงาน</a>
                        <a href="#contact" class="text-slate-400 hover:text-white transition-colors text-sm">ติดต่อ</a>
                    </div>

                    <!-- CTA Button -->
                    <div class="flex items-center gap-3">
                        <a 
                            href="#contact"
                            class="px-5 py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-medium shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105 transition-all duration-300"
                        >
                            ติดต่อเรา
                        </a>
                    </div>
                </div>
            </div>
        </nav>

        <!-- Hero Section -->
        <section class="relative min-h-screen flex items-center justify-center pt-20" id="hero">
            <div 
                class="max-w-7xl mx-auto px-6 py-20 relative z-10 transition-all duration-100 ease-out"
                :style="{ 
                    transform: `translateY(${heroParallax}px) scale(${heroScale})`,
                    opacity: heroOpacity
                }"
            >
                <div class="text-center">
                    <!-- Badge -->
                    <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8 animate-fade-in">
                        <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span class="text-sm text-slate-300">พร้อมเปิดตัว 2026</span>
                    </div>

                    <!-- Main Title -->
                    <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                        <span class="block text-white mb-2">สร้างระบบธุรกิจออนไลน์</span>
                        <span class="block bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            ได้อย่างง่ายดาย
                        </span>
                    </h1>

                    <!-- Subtitle -->
                    <p class="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                        เว็บไซต์ และ ระบบหลังบ้าน สำเร็จรูปพร้อมใช้งาน
                        <br class="hidden md:block" />
                        เริ่มต้นธุรกิจออนไลน์ได้ภายใน <span class="text-indigo-400 font-semibold">5 วัน</span>
                    </p>

                    <!-- CTA Buttons -->
                    <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                        <a 
                            href="#demo"
                            class="group px-8 py-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105 transition-all duration-300 flex items-center gap-2"
                        >
                            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg> ตัวอย่างงาน
                        </a>
                       
                        <a 
                            href="#contact"
                            class="px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm"
                        >
                            สอบถาม
                        </a>
                    </div>

                    <!-- Stats -->
                    <div class="grid grid-cols-3 gap-8 max-w-lg mx-auto">
                        <div class="text-center">
                            <div class="text-3xl md:text-4xl font-bold text-white mb-1">50+</div>
                            <div class="text-sm text-slate-500">ลูกค้าไว้วางใจ</div>
                        </div>
                        <div class="text-center border-x border-slate-800">
                            <div class="text-3xl md:text-4xl font-bold text-white mb-1">7</div>
                            <div class="text-sm text-slate-500">วันพร้อมใช้งาน</div>
                        </div>
                        <div class="text-center">
                            <div class="text-3xl md:text-4xl font-bold text-white mb-1">24/7</div>
                            <div class="text-sm text-slate-500">ซัพพอร์ต</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Scroll Indicator - Elegant Chevrons -->
            <div 
                class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
                :class="scrollY > 100 ? 'opacity-0 pointer-events-none' : 'opacity-100'"
                style="transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
            >
                <div class="flex flex-col items-center gap-0">
                    <svg class="w-6 h-6 text-indigo-400/60 animate-chevron-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                    <svg class="w-6 h-6 text-indigo-400/40 -mt-3 animate-chevron-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                    <svg class="w-6 h-6 text-indigo-400/20 -mt-3 animate-chevron-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
        </section>

        <!-- About Me Section -->
        <section id="about" class="relative py-24 md:py-32">
            <div class="max-w-6xl mx-auto px-6">
                <!-- Section Header -->
                <div class="text-center mb-16">
                    <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-6">
                        <svg class="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span class="text-indigo-400 text-sm font-medium">แนะนำตัว</span>
                    </div>
                    <h2 class="text-3xl md:text-5xl font-bold text-white mb-4">
                        ผู้พัฒนา Vibedev
                    </h2>
                </div>

                <!-- About Card -->
                <div class="relative rounded-3xl overflow-hidden">
                    <!-- Background -->
                    <div class="absolute inset-0 bg-gradient-to-br from-slate-800/80 via-slate-900/80 to-indigo-900/50" />
                    <div class="absolute inset-0 backdrop-blur-xl" />
                    <div class="absolute inset-0 border border-white/10 rounded-3xl" />
                    
                    <!-- Content -->
                    <div class="relative p-8 md:p-12">
                        <div class="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
                            <!-- Profile Image -->
                            <div class="relative flex-shrink-0">
                                <div class="w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden shadow-2xl shadow-indigo-500/20 border-4 border-white/10">
                                    <img 
                                        src="/images/profile.jpg" 
                                        alt="Developer Profile"
                                        class="w-full h-full object-cover object-top"
                                    />
                                </div>
                                <!-- Decorative elements -->
                                <div class="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl opacity-20 blur-xl" />
                                <div class="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl opacity-20 blur-xl" />
                            </div>

                            <!-- Info -->
                            <div class="flex-1 text-center lg:text-left">
                                <!-- AI Badge -->
                                <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 border border-violet-500/30 mb-4">
                                    <svg class="w-4 h-4 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                    <span class="text-violet-300 text-sm font-medium">AI-Powered Development</span>
                                </div>

                                <h3 class="text-2xl md:text-3xl font-bold text-white mb-2">
                                    พัฒนาด้วยพลัง AI
                                </h3>
                                <p class="text-indigo-400 font-medium mb-6">ลดต้นทุน • ลดเวลา • เพิ่มคุณภาพ</p>
                                
                                <p class="text-slate-300 leading-relaxed mb-4 max-w-xl">
                                    เราได้มีการนำ <span class="text-violet-400 font-semibold">AI</span> มาเป็นเครื่องมือหลักในการพัฒนาระบบ 
                                    ทำให้สามารถส่งมอบงานได้ <span class="text-emerald-400 font-semibold">เร็วกว่า 3 เท่า</span> 
                                    และ <span class="text-emerald-400 font-semibold">ลดต้นทุนได้ถึง 80%</span> เมื่อเทียบกับการจ้างทีมพัฒนาแบบดั้งเดิม
                                </p>
                                
                                <p class="text-slate-400 leading-relaxed mb-8 max-w-xl text-sm">
                                    ด้วยการผสมผสานทักษะการเขียนโค้ดกับ AI ล่าสุด ผมสร้างระบบที่มีคุณภาพสูง 
                                    ทดสอบครบถ้วน และพร้อมใช้งานจริงในเวลาอันสั้น — คุณได้ระบบระดับมืออาชีพ ในราคาที่เข้าถึงได้
                                </p>

                                <!-- Benefits -->
                                <div class="grid grid-cols-3 gap-4 mb-8 max-w-md">
                                    <div class="text-center p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
                                        <div class="text-2xl font-bold text-emerald-400">80%</div>
                                        <div class="text-xs text-slate-400">ลดต้นทุน</div>
                                    </div>
                                    <div class="text-center p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
                                        <div class="text-2xl font-bold text-violet-400">3x</div>
                                        <div class="text-xs text-slate-400">เร็วขึ้น</div>
                                    </div>
                                    <div class="text-center p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
                                        <div class="text-2xl font-bold text-cyan-400">24/7</div>
                                        <div class="text-xs text-slate-400">ซัพพอร์ต</div>
                                    </div>
                                </div>

                                <!-- Skills -->
                                <div class="flex flex-wrap justify-center lg:justify-start gap-2 mb-8">
                                    <span class="px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-xs font-medium">
                                        🤖 AI Development
                                    </span>
                                    <span class="px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-medium">
                                        Laravel
                                    </span>
                                    <span class="px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-medium">
                                        Vue.js
                                    </span>
                                    <span class="px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-medium">
                                        React
                                    </span>
                                    <span class="px-3 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs font-medium">
                                        TailwindCSS
                                    </span>
                                </div>

                                <!-- CTA -->
                                <a 
                                    href="#contact"
                                    class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105 transition-all duration-300"
                                >
                                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                    ติดต่อพูดคุย
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Pain Points Section -->
        <section 
            id="painPoints" 
            class="relative py-24 md:py-32"
            :class="isVisible.painPoints ? 'opacity-100' : 'opacity-0'"
            style="transition: opacity 0.8s ease-out"
        >
            <div class="max-w-7xl mx-auto px-6">
                <!-- Section Header -->
                <div class="text-center mb-16">
                    <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 mb-6">
                        <svg class="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <span class="text-red-400 text-sm font-medium">ปัญหาที่ธุรกิจเจอ</span>
                    </div>
                    <h2 class="text-3xl md:text-5xl font-bold text-white mb-4">
                        ทำไมการมีเว็บไซต์ถึงยากนัก?
                    </h2>
                    <p class="text-slate-400 max-w-2xl mx-auto">
                        ปัญหาเหล่านี้ทำให้ธุรกิจ SME หลายรายต้องล้มเลิกความตั้งใจ
                    </p>
                </div>

                <!-- Pain Points Grid -->
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div 
                        v-for="(pain, index) in painPoints" 
                        :key="index"
                        class="group relative p-6 rounded-2xl bg-gradient-to-b from-slate-800/50 to-slate-900/50 border border-slate-700/50 hover:border-red-500/30 transition-all duration-500 cursor-pointer overflow-hidden"
                        :class="isVisible.painPoints ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'"
                        :style="{ transitionDelay: `${index * 100}ms` }"
                        @mouseenter="hoveredCard = `pain-${index}`"
                        @mouseleave="hoveredCard = null"
                    >
                        <!-- Glow Effect -->
                        <div 
                            class="absolute inset-0 bg-gradient-to-b from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        />
                        
                        <div class="relative">
                            <!-- Icon -->
                            <div class="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform duration-300">
                                <svg v-if="pain.iconType === 'money'" class="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <svg v-else-if="pain.iconType === 'clock'" class="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <svg v-else-if="pain.iconType === 'wrench'" class="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <svg v-else-if="pain.iconType === 'phone'" class="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                                <svg v-else-if="pain.iconType === 'puzzle'" class="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                                </svg>
                                <svg v-else-if="pain.iconType === 'lock'" class="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            
                            <h3 class="text-lg font-semibold text-white mb-2 group-hover:text-red-300 transition-colors">
                                {{ pain.title }}
                            </h3>
                            <p class="text-slate-400 text-sm leading-relaxed">
                                {{ pain.desc }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Solutions Section -->
        <section 
            id="solutions" 
            class="relative py-24 md:py-32"
            :class="isVisible.solutions ? 'opacity-100' : 'opacity-0'"
            style="transition: opacity 0.8s ease-out"
        >
            <div class="max-w-7xl mx-auto px-6">
                <!-- Section Header -->
                <div class="text-center mb-16">
                    <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
                        <svg class="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                        <span class="text-emerald-400 text-sm font-medium">Vibedev แก้ได้</span>
                    </div>
                    <h2 class="text-3xl md:text-5xl font-bold text-white mb-4">
                        ทางออกที่ดีกว่า
                    </h2>
                    <p class="text-slate-400 max-w-2xl mx-auto">
                        Vibedev ออกแบบมาเพื่อแก้ปัญหาเหล่านี้โดยเฉพาะ
                    </p>
                </div>

                <!-- Solutions Grid -->
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div 
                        v-for="(solution, index) in solutions" 
                        :key="index"
                        class="group relative p-6 rounded-2xl border transition-all duration-500 cursor-pointer overflow-hidden"
                        :class="[
                            solution.highlight 
                                ? 'bg-gradient-to-b from-indigo-900/50 to-purple-900/50 border-indigo-500/50 shadow-xl shadow-indigo-500/10' 
                                : 'bg-gradient-to-b from-slate-800/50 to-slate-900/50 border-slate-700/50 hover:border-emerald-500/30',
                            isVisible.solutions ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                        ]"
                        :style="{ transitionDelay: `${index * 100}ms` }"
                        @mouseenter="hoveredCard = `sol-${index}`"
                        @mouseleave="hoveredCard = null"
                    >
                        <!-- Glow Effect -->
                        <div 
                            class="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        />
                        
                        <!-- Popular Badge -->
                        <div 
                            v-if="solution.highlight" 
                            class="absolute -top-px -right-px px-3 py-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-xs font-semibold rounded-bl-xl rounded-tr-2xl flex items-center gap-1"
                        >
                            <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                            คุ้มค่าที่สุด
                        </div>
                        
                        <div class="relative">
                            <!-- Icon -->
                            <div class="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform duration-300">
                                <svg v-if="solution.iconType === 'check'" class="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <svg v-else-if="solution.iconType === 'zap'" class="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                <svg v-else-if="solution.iconType === 'edit'" class="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                <svg v-else-if="solution.iconType === 'smartphone'" class="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                                <svg v-else-if="solution.iconType === 'graduation'" class="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                </svg>
                                <svg v-else-if="solution.iconType === 'shield'" class="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            
                            <h3 class="text-lg font-semibold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                                {{ solution.title }}
                            </h3>
                            <p class="text-slate-400 text-sm leading-relaxed">
                                {{ solution.desc }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Services Section -->
        <section id="services" class="relative py-24 md:py-32">
            <div class="max-w-7xl mx-auto px-6">
                <!-- Section Header -->
                <div class="text-center mb-16">
                    <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
                        <svg class="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        <span class="text-cyan-400 text-sm font-medium">บริการของเรา</span>
                    </div>
                    <h2 class="text-3xl md:text-5xl font-bold text-white mb-4">
                        สิ่งที่เราทำได้
                    </h2>
                    <p class="text-slate-400 max-w-2xl mx-auto">
                        พัฒนาระบบดิจิทัลครบวงจร ตั้งแต่เว็บไซต์ไปจนถึงระบบ AI ด้วยเทคโนโลยีล่าสุด
                    </p>
                </div>

                <!-- Services Grid - 4 columns -->
                <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <!-- Service 1 -->
                    <div class="group relative p-6 rounded-2xl bg-gradient-to-b from-slate-800/60 to-slate-900/60 border border-slate-700/50 hover:border-indigo-500/40 transition-all duration-500 overflow-hidden">
                        <div class="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div class="relative">
                            <!-- Number Badge -->
                            <div class="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center mb-5 shadow-lg shadow-indigo-500/30 text-white font-bold text-xl">
                                01
                            </div>
                            <h3 class="text-lg font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors leading-tight">
                                สร้างเว็บไซต์ธุรกิจ หรือ แบรนด์ของคุณ
                            </h3>
                            <p class="text-slate-400 text-sm leading-relaxed">
                                เว็บไซต์ที่ช่วยให้ธุรกิจของคุณเข้าถึงลูกค้าได้ง่ายขึ้น ดูน่าเชื่อถือ และเพิ่มโอกาสในการขายสินค้าหรือบริการของคุณได้มากขึ้น
                            </p>
                        </div>
                    </div>

                    <!-- Service 2 -->
                    <div class="group relative p-6 rounded-2xl bg-gradient-to-b from-slate-800/60 to-slate-900/60 border border-slate-700/50 hover:border-emerald-500/40 transition-all duration-500 overflow-hidden">
                        <div class="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div class="relative">
                            <!-- Number Badge -->
                            <div class="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mb-5 shadow-lg shadow-emerald-500/30 text-white font-bold text-xl">
                                02
                            </div>
                            <h3 class="text-lg font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors leading-tight">
                                สร้างระบบภายใน หรือ ระบบเฉพาะธุรกิจ
                            </h3>
                            <p class="text-slate-400 text-sm leading-relaxed">
                                แอพช่วยให้ธุรกิจมีความสะดวกสบายมากขึ้น ช่วยให้ธุรกิจสามารถตอบสนองต่อความต้องการของลูกค้าได้อย่างรวดเร็ว
                            </p>
                        </div>
                    </div>

                    <!-- Service 3 -->
                    <div class="group relative p-6 rounded-2xl bg-gradient-to-b from-slate-800/60 to-slate-900/60 border border-slate-700/50 hover:border-violet-500/40 transition-all duration-500 overflow-hidden">
                        <div class="absolute inset-0 bg-gradient-to-b from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div class="relative">
                            <!-- Number Badge -->
                            <div class="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center mb-5 shadow-lg shadow-violet-500/30 text-white font-bold text-xl">
                                03
                            </div>
                            <h3 class="text-lg font-bold text-white mb-3 group-hover:text-violet-300 transition-colors leading-tight">
                                สร้างระบบที่ประยุกต์ใช้ AI (ปัญญาประดิษฐ์)
                            </h3>
                            <p class="text-slate-400 text-sm leading-relaxed">
                                AI ช่วยลดข้อผิดพลาดในการทำงานของคุณ และช่วยทำเรื่องซ้ำๆ ที่คนไม่อยากทำให้เป็นเรื่องง่ายนิดเดียว
                            </p>
                        </div>
                    </div>

                    <!-- Service 4 -->
                    <div class="group relative p-6 rounded-2xl bg-gradient-to-b from-slate-800/60 to-slate-900/60 border border-slate-700/50 hover:border-orange-500/40 transition-all duration-500 overflow-hidden">
                        <div class="absolute inset-0 bg-gradient-to-b from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div class="relative">
                            <!-- Number Badge -->
                            <div class="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center mb-5 shadow-lg shadow-orange-500/30 text-white font-bold text-xl">
                                04
                            </div>
                            <h3 class="text-lg font-bold text-white mb-3 group-hover:text-orange-300 transition-colors leading-tight">
                                สร้างระบบหลังบ้าน และ Dashboard
                            </h3>
                            <p class="text-slate-400 text-sm leading-relaxed">
                                ระบบจัดการข้อมูล วิเคราะห์สถิติ รายงานผลแบบ Real-time ช่วยให้คุณตัดสินใจทางธุรกิจได้อย่างแม่นยำ
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Demo Section -->
        <section 
            id="demo" 
            class="relative py-24 md:py-32"
            :class="isVisible.demo ? 'opacity-100' : 'opacity-0'"
            style="transition: opacity 0.8s ease-out"
        >
            <div class="max-w-7xl mx-auto px-6">
                <!-- Section Header -->
                <div class="text-center mb-16">
                    <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
                        <svg class="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span class="text-purple-400 text-sm font-medium">ลองใช้งานจริง</span>
                    </div>
                    <h2 class="text-3xl md:text-5xl font-bold text-white mb-4">
                        ตัวอย่างระบบธุรกิจ
                    </h2>
                    <p class="text-slate-400 max-w-2xl mx-auto">
                        ระบบหลากหลายประเภท ทดลองใช้งานได้เลย เหมือนระบบจริงทุกประการ
                    </p>
                </div>

                <!-- Demo Cards -->
                <div class="flex flex-wrap justify-center gap-8">
                    <Link 
                        v-for="(demo, index) in demoCards" 
                        :key="demo.id"
                        :href="demo.route"
                        class="group relative rounded-3xl overflow-hidden cursor-pointer w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)]"
                        :class="isVisible.demo ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'"
                        :style="{ transitionDelay: `${index * 150}ms`, transition: 'all 0.6s ease-out' }"
                        @mouseenter="hoveredDemo = demo.id"
                        @mouseleave="hoveredDemo = null"
                    >
                        <!-- Image -->
                        <div class="aspect-[4/3] overflow-hidden">
                            <img 
                                :src="demo.image" 
                                :alt="demo.title"
                                class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                            />
                        </div>
                        
                        <!-- Overlay -->
                        <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                        
                        <!-- Content -->
                        <div class="absolute bottom-0 left-0 right-0 p-6">
                            <!-- Icon -->
                            <div 
                                class="w-12 h-12 rounded-xl bg-gradient-to-r mb-4 flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300"
                                :class="demo.color"
                            >
                                <!-- Restaurant: Fork & Knife Icon -->
                                <svg v-if="demo.id === 'restaurant'" class="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z"/>
                                </svg>
                                <svg v-else-if="demo.id === 'reservation'" class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <svg v-else-if="demo.id === 'ecommerce'" class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <svg v-else-if="demo.id === 'clinic'" class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                                <svg v-else-if="demo.id === 'admin'" class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                                <!-- Gaming: Gamepad Icon -->
                                <svg v-else-if="demo.id === 'gaming'" class="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4-3c-.83 0-1.5-.67-1.5-1.5S18.67 9 19.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
                                </svg>
                                <svg v-else class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            
                            <h3 class="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text transition-all duration-300"
                                :class="demo.color">
                                {{ demo.title }}
                            </h3>
                            <p class="text-slate-300 text-sm mb-4">
                                {{ demo.desc }}
                            </p>
                            
                            <!-- CTA -->
                            <div class="flex items-center gap-2 text-white text-sm font-medium group-hover:gap-3 transition-all duration-300">
                                <span>ดูตัวอย่าง</span>
                                <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </div>
                        </div>
                        
                        <!-- Glassmorphism Border Effect -->
                        <div class="absolute inset-0 rounded-3xl border border-white/10 group-hover:border-white/20 transition-colors pointer-events-none" />
                    </Link>
                </div>
            </div>
        </section>

        <!-- Contact Section -->
        <section 
            id="contact" 
            class="relative py-24 md:py-32"
            :class="isVisible.contact ? 'opacity-100' : 'opacity-0'"
            style="transition: opacity 0.8s ease-out"
        >
            <!-- Background Glow -->
            <div class="absolute inset-0 overflow-hidden pointer-events-none">
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl" />
            </div>
            
            <div class="max-w-4xl mx-auto px-6 relative">
                <!-- Glassmorphism Card -->
                <div 
                    class="relative rounded-3xl overflow-hidden group"
                    :class="isVisible.contact ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'"
                    style="transition: all 0.8s ease-out"
                >
                    <!-- Animated Gradient Border -->
                    <div class="absolute -inset-[1px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <!-- Inner Background -->
                    <div class="absolute inset-[1px] bg-gradient-to-br from-slate-900 via-slate-900/95 to-indigo-950 rounded-3xl" />
                    <div class="absolute inset-[1px] backdrop-blur-xl rounded-3xl" />
                    
                    <!-- Content -->
                    <div class="relative p-10 md:p-16 text-center">
                        <!-- Icon with Glow -->
                        <div class="relative inline-block mb-8">
                            <div class="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl blur-xl opacity-50" />
                            <div class="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-indigo-500/40">
                                <svg class="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                            </div>
                        </div>
                        
                        <h2 class="text-3xl md:text-5xl font-bold text-white mb-4">
                            พร้อมเริ่มต้นหรือยัง?
                        </h2>
                        <p class="text-slate-300 text-lg max-w-lg mx-auto mb-10">
                            ติดต่อเราได้เลย <span class="text-emerald-400 font-semibold">ปรึกษาฟรี!</span>
                            <br />
                            เราพร้อมช่วยคุณสร้างระบบธุรกิจออนไลน์ที่ใช่
                        </p>
                        
                        <!-- Contact Buttons -->
                        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <!-- Fastwork Button -->
                            <a 
                                href="https://fastwork.co/user/vibedev?source=web_marketplace_profile-menu_profile" 
                                target="_blank"
                                class="group/btn relative px-8 py-4 rounded-2xl bg-white shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
                            >
                                <img 
                                    src="https://storage.googleapis.com/fastwork-asset/web/images/logo/fastwork/v2/default.svg" 
                                    alt="Fastwork" 
                                    class="h-8"
                                />
                            </a>
                            
                            <!-- Phone Button -->
                            <a 
                                href="tel:0620017779"
                                class="group/phone px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105 transition-all duration-300 flex items-center gap-3"
                            >
                                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span>062-001-7779</span>
                            </a>
                        </div>
                        
                        <!-- Trust Badge -->
                        <div class="mt-10 flex items-center justify-center gap-6 text-sm text-slate-400">
                            <div class="flex items-center gap-2">
                                <svg class="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>ตอบกลับเร็ว</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <svg class="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>ปรึกษาฟรี</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <svg class="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>ราคาเป็นกันเอง</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <footer class="relative border-t border-slate-800 py-12">
            <div class="max-w-7xl mx-auto px-6">
                <div class="flex flex-col md:flex-row items-center justify-between gap-6">
                    <!-- Logo -->
                    <a href="#hero" class="group flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-300">
                        <div class="w-12 h-12 rounded-xl overflow-hidden shadow-lg shadow-indigo-500/30 group-hover:shadow-indigo-500/50 transition-all duration-300 group-hover:scale-105">
                            <img 
                                src="/images/vibedev-logo.png" 
                                alt="Vibedev Logo"
                                class="w-full h-full object-cover"
                            />
                        </div>
                        <div class="flex flex-col">
                            <span class="text-xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                Vibedev
                            </span>
                            <span class="text-xs text-slate-400 group-hover:text-slate-300 transition-colors">AI-Powered Development</span>
                        </div>
                    </a>
                    
                    <!-- Copyright -->
                    <p class="text-slate-500 text-sm">
                        © 2025 Vibedev. All rights reserved.
                    </p>
                    
                    <!-- Social Links -->
                    <div class="flex items-center gap-4">
                        <a href="#" class="text-slate-500 hover:text-white transition-colors">
                            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                        </a>
                        <a href="#" class="text-slate-500 hover:text-white transition-colors">
                            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>

        <!-- Back to Top Button -->
        <button
            @click="scrollToTop"
            class="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/40 flex items-center justify-center transition-all duration-500 hover:scale-110 hover:shadow-indigo-500/60 hover:-translate-y-1"
            :class="scrollY > 300 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'"
            aria-label="กลับไปบนสุด"
        >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
        </button>
    </div>
</template>

<style>
/* Custom Fonts - Modern Tech Theme */
body {
    font-family: 'Noto Sans Thai', 'Space Grotesk', system-ui, sans-serif;
}

/* Headings use Space Grotesk for modern tech feel */
h1, h2, h3, h4, h5, h6 {
    font-family: 'Space Grotesk', 'Noto Sans Thai', system-ui, sans-serif;
    letter-spacing: -0.02em;
}

/* Smooth Scroll */
html {
    scroll-behavior: smooth;
}

/* GPU Acceleration for Smooth Animations */
.animate-fade-in,
.animate-chevron-1,
.animate-chevron-2,
.animate-chevron-3 {
    will-change: transform, opacity;
    backface-visibility: hidden;
    -webkit-font-smoothing: antialiased;
}

/* Fade In Animation */
@keyframes fade-in {
    from {
        opacity: 0;
        transform: translateY(20px) translateZ(0);
    }
    to {
        opacity: 1;
        transform: translateY(0) translateZ(0);
    }
}

.animate-fade-in {
    animation: fade-in 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

/* Chevron Scroll Animation - Staggered */
@keyframes chevron-pulse {
    0%, 100% {
        opacity: 0.2;
        transform: translateY(0) translateZ(0);
    }
    50% {
        opacity: 1;
        transform: translateY(4px) translateZ(0);
    }
}

.animate-chevron-1 {
    animation: chevron-pulse 1.8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    animation-delay: 0s;
}

.animate-chevron-2 {
    animation: chevron-pulse 1.8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    animation-delay: 0.15s;
}

.animate-chevron-3 {
    animation: chevron-pulse 1.8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    animation-delay: 0.3s;
}

/* Smooth transitions for all interactive elements */
* {
    -webkit-tap-highlight-color: transparent;
}

/* Scrollbar */
::-webkit-scrollbar {
    width: 8px;
}

::-webkit-scrollbar-track {
    background: #0f172a;
}

::-webkit-scrollbar-thumb {
    background: #334155;
    border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
    background: #475569;
}

/* Floating Orb Animations */
@keyframes float-slow {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(2deg); }
}

@keyframes float-medium {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-30px) rotate(-2deg); }
}

@keyframes float-fast {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-15px) rotate(1deg); }
}

.animate-float-slow {
    animation: float-slow 12s ease-in-out infinite;
}

.animate-float-medium {
    animation: float-medium 10s ease-in-out infinite;
}

.animate-float-fast {
    animation: float-fast 8s ease-in-out infinite;
}

/* Particle Animations */
@keyframes particle-float-1 {
    0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.4; }
    25% { transform: translate(10px, -20px) scale(1.2); opacity: 0.6; }
    50% { transform: translate(-5px, -40px) scale(1); opacity: 0.3; }
    75% { transform: translate(15px, -20px) scale(0.8); opacity: 0.5; }
}

@keyframes particle-float-2 {
    0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
    33% { transform: translate(-15px, -30px) scale(1.1); opacity: 0.5; }
    66% { transform: translate(10px, -15px) scale(0.9); opacity: 0.4; }
}

.animate-particle-1 { animation: particle-float-1 8s ease-in-out infinite; }
.animate-particle-2 { animation: particle-float-2 10s ease-in-out infinite 0.5s; }
.animate-particle-3 { animation: particle-float-1 12s ease-in-out infinite 1s; }
.animate-particle-4 { animation: particle-float-2 9s ease-in-out infinite 1.5s; }
.animate-particle-5 { animation: particle-float-1 11s ease-in-out infinite 2s; }
.animate-particle-6 { animation: particle-float-2 7s ease-in-out infinite 0.8s; }
.animate-particle-7 { animation: particle-float-1 13s ease-in-out infinite 1.2s; }
.animate-particle-8 { animation: particle-float-2 8s ease-in-out infinite 0.3s; }

/* Shooting Star Animations */
@keyframes shooting-star {
    0% { 
        transform: translateX(0) translateY(0) rotate(45deg); 
        opacity: 0;
    }
    10% { opacity: 1; }
    70% { opacity: 1; }
    100% { 
        transform: translateX(calc(100vw + 200px)) translateY(100px) rotate(45deg); 
        opacity: 0;
    }
}

.animate-shooting-star-1 {
    animation: shooting-star 4s ease-in-out infinite;
    animation-delay: 0s;
}

.animate-shooting-star-2 {
    animation: shooting-star 5s ease-in-out infinite;
    animation-delay: 3s;
}

.animate-shooting-star-3 {
    animation: shooting-star 6s ease-in-out infinite;
    animation-delay: 6s;
}

/* Pulse Slow for Center Glow */
@keyframes pulse-slow {
    0%, 100% { opacity: 0.08; transform: translate(-50%, -50%) scale(1); }
    50% { opacity: 0.15; transform: translate(-50%, -50%) scale(1.1); }
}

.animate-pulse-slow {
    animation: pulse-slow 6s ease-in-out infinite;
}
</style>
