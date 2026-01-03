<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3';
import { ref, computed } from 'vue';

// Menu data
const menuCategories = ref([
    { id: 'all', name: 'ทั้งหมด' },
    { id: 'main', name: 'อาหารจานหลัก' },
    { id: 'appetizer', name: 'ของทานเล่น' },
    { id: 'drink', name: 'เครื่องดื่ม' },
    { id: 'dessert', name: 'ของหวาน' },
]);

const activeCategory = ref('all');

const menuItems = ref([
    { id: 1, name: 'ต้มยำกุ้ง', nameEn: 'Tom Yum Goong', price: 180, image: 'https://images.unsplash.com/photo-1548943487-a2e4e43b4853?w=400', category: 'main', spicy: 3, popular: true, desc: 'ต้มยำกุ้งน้ำข้น รสเข้มข้น หอมเครื่องเทศ' },
    { id: 2, name: 'ผัดไทย', nameEn: 'Pad Thai', price: 120, image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400', category: 'main', spicy: 1, popular: true, desc: 'ผัดไทยกุ้งสด โรยถั่ว มะนาว' },
    { id: 3, name: 'แกงเขียวหวาน', nameEn: 'Green Curry', price: 150, image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400', category: 'main', spicy: 2, desc: 'แกงเขียวหวานไก่ พร้อมข้าวหอมมะลิ' },
    { id: 4, name: 'ส้มตำ', nameEn: 'Som Tam', price: 80, image: 'https://images.unsplash.com/photo-1569562211093-4ed0d0758f12?w=400', category: 'appetizer', spicy: 3, popular: true, desc: 'ส้มตำไทย รสจัดจ้าน ถูกปากคนไทย' },
    { id: 5, name: 'ข้าวผัดกุ้ง', nameEn: 'Shrimp Fried Rice', price: 140, image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400', category: 'main', spicy: 0, desc: 'ข้าวผัดกุ้งสด หอมกระเทียม' },
    { id: 6, name: 'ปอเปี๊ยะทอด', nameEn: 'Spring Rolls', price: 60, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400', category: 'appetizer', spicy: 0, desc: 'ปอเปี๊ยะทอดกรอบ เสิร์ฟคู่น้ำจิ้ม' },
    { id: 7, name: 'ชาไทย', nameEn: 'Thai Tea', price: 45, image: 'https://images.unsplash.com/photo-1558857563-b371033873b8?w=400', category: 'drink', spicy: 0, desc: 'ชาไทยเย็น หวานมัน เข้มข้น' },
    { id: 8, name: 'มะม่วงข้าวเหนียว', nameEn: 'Mango Sticky Rice', price: 90, image: 'https://images.unsplash.com/photo-1621293954908-907159247fc8?w=400', category: 'dessert', spicy: 0, popular: true, desc: 'มะม่วงสุกหวาน คู่ข้าวเหนียวมะพร้าว' },
]);

const filteredMenu = computed(() => {
    if (activeCategory.value === 'all') return menuItems.value;
    return menuItems.value.filter(item => item.category === activeCategory.value);
});

// Reviews
const reviews = ref([
    { id: 1, name: 'คุณสมชาย', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', rating: 5, comment: 'อาหารอร่อยมาก บรรยากาศดี บริการประทับใจ จะกลับมาอีกครั้งแน่นอน!', date: '2 วันก่อน' },
    { id: 2, name: 'คุณสมหญิง', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', rating: 5, comment: 'ต้มยำกุ้งอร่อยที่สุดในย่านนี้ รสชาติถูกปาก ราคาไม่แพง', date: '1 สัปดาห์ก่อน' },
    { id: 3, name: 'คุณวิชัย', avatar: 'https://randomuser.me/api/portraits/men/67.jpg', rating: 4, comment: 'ผัดไทยเด็ด ปริมาณเยอะ คุ้มค่ากับราคา', date: '2 สัปดาห์ก่อน' },
]);

// Restaurant info
const restaurantInfo = {
    name: 'ครัวคุณแม่',
    nameEn: 'Khun Mae Kitchen',
    tagline: 'อาหารไทยแท้ รสชาติต้นตำรับ',
    address: '123/45 ถนนสุขุมวิท แขวงคลองตัน เขตคลองเตย กรุงเทพฯ 10110',
    phone: '02-123-4567',
    hours: 'เปิดทุกวัน 10:00 - 22:00',
    rating: 4.8,
    reviews: 328,
};

// Interactive states
const selectedItem = ref<number | null>(null);
const showItemModal = ref(false);
const showCartPanel = ref(false);
const cartItems = ref<{id: number, qty: number}[]>([]);

const addToCart = (itemId: number) => {
    const existing = cartItems.value.find(c => c.id === itemId);
    if (existing) {
        existing.qty++;
    } else {
        cartItems.value.push({ id: itemId, qty: 1 });
    }
};

const removeFromCart = (itemId: number) => {
    const index = cartItems.value.findIndex(c => c.id === itemId);
    if (index > -1) {
        cartItems.value.splice(index, 1);
    }
};

const updateCartQty = (itemId: number, delta: number) => {
    const item = cartItems.value.find(c => c.id === itemId);
    if (item) {
        item.qty += delta;
        if (item.qty <= 0) {
            removeFromCart(itemId);
        }
    }
};

const clearCart = () => {
    cartItems.value = [];
    showCartPanel.value = false;
};

const cartTotal = computed(() => {
    return cartItems.value.reduce((sum, cart) => {
        const item = menuItems.value.find(m => m.id === cart.id);
        return sum + (item ? item.price * cart.qty : 0);
    }, 0);
});

const cartCount = computed(() => {
    return cartItems.value.reduce((sum, cart) => sum + cart.qty, 0);
});

const cartItemsWithDetails = computed(() => {
    return cartItems.value.map(cart => {
        const item = menuItems.value.find(m => m.id === cart.id);
        return {
            ...cart,
            item
        };
    });
});
</script>

<template>
    <Head title="ครัวคุณแม่ - อาหารไทยแท้">
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet" />
    </Head>

    <div class="min-h-screen bg-stone-50 font-sans">
        <!-- Navigation -->
        <nav class="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-stone-200/50 shadow-sm">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 py-3">
                <div class="flex items-center justify-between">
                    <!-- Logo -->
                    <Link href="/" class="flex items-center gap-3 group">
                        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg shadow-orange-500/30 group-hover:scale-105 transition-transform">
                            <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <div>
                            <h1 class="text-lg font-bold text-stone-800">{{ restaurantInfo.name }}</h1>
                            <p class="text-xs text-stone-500">{{ restaurantInfo.nameEn }}</p>
                        </div>
                    </Link>

                    <!-- Nav Links -->
                    <div class="hidden md:flex items-center gap-8">
                        <a href="#menu" class="text-stone-600 hover:text-orange-600 transition-colors text-sm font-medium">เมนู</a>
                        <a href="#reviews" class="text-stone-600 hover:text-orange-600 transition-colors text-sm font-medium">รีวิว</a>
                        <a href="#location" class="text-stone-600 hover:text-orange-600 transition-colors text-sm font-medium">ที่ตั้ง</a>
                    </div>

                    <!-- Actions -->
                    <div class="flex items-center gap-3">
                        <!-- Cart -->
                        <button 
                            @click="showCartPanel = true"
                            class="relative p-2 rounded-xl bg-stone-100 hover:bg-orange-100 transition-colors group"
                        >
                            <svg class="w-6 h-6 text-stone-600 group-hover:text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span v-if="cartCount > 0" class="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-orange-500 text-white text-xs font-bold flex items-center justify-center">
                                {{ cartCount }}
                            </span>
                        </button>

                        <!-- Reservation Button -->
                        <Link 
                            href="/demo/reservation"
                            class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 text-white text-sm font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-105 transition-all duration-300"
                        >
                            จองโต๊ะ
                        </Link>
                    </div>
                </div>
            </div>
        </nav>

        <!-- Hero Section -->
        <section class="relative h-[60vh] sm:h-[70vh] min-h-[400px] sm:min-h-[500px] overflow-hidden">
            <!-- Background Image -->
            <div class="absolute inset-0">
                <img 
                    src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920" 
                    alt="Restaurant Interior"
                    class="w-full h-full object-cover"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/40 to-transparent" />
            </div>

            <!-- Content -->
            <div class="relative h-full flex items-end">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 pb-16 w-full">
                    <div class="max-w-2xl">
                        <!-- Badge -->
                        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
                            <span class="flex items-center gap-1">
                                <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span class="text-white font-semibold">{{ restaurantInfo.rating }}</span>
                            </span>
                            <span class="text-white/60">•</span>
                            <span class="text-white/80 text-sm">{{ restaurantInfo.reviews }} รีวิว</span>
                        </div>

                        <h1 class="text-4xl md:text-6xl font-bold text-white mb-4" style="font-family: 'Playfair Display', serif;">
                            {{ restaurantInfo.name }}
                        </h1>
                        <p class="text-xl text-white/80 mb-8">
                            {{ restaurantInfo.tagline }}
                        </p>

                        <!-- Quick Actions -->
                        <div class="flex flex-wrap gap-4">
                            <a 
                                href="#menu"
                                class="px-6 py-3 rounded-xl bg-white text-stone-900 font-semibold hover:bg-orange-50 transition-colors flex items-center gap-2"
                            >
                                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                                <span>ดูเมนู</span>
                            </a>
                            <Link 
                                href="/demo/reservation"
                                class="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all flex items-center gap-2"
                            >
                                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span>จองโต๊ะ</span>
                            </Link>
                            <a 
                                href="tel:021234567"
                                class="px-6 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold hover:bg-white/20 transition-colors flex items-center gap-2"
                            >
                                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span>โทรสั่ง</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Menu Section -->
        <section id="menu" class="py-16 md:py-24">
            <div class="max-w-7xl mx-auto px-4 sm:px-6">
                <!-- Section Header -->
                <div class="text-center mb-12">
                    <span class="text-orange-600 text-sm font-semibold tracking-wider uppercase">Our Menu</span>
                    <h2 class="text-3xl md:text-4xl font-bold text-stone-800 mt-2" style="font-family: 'Playfair Display', serif;">
                        เมนูอาหาร
                    </h2>
                    <p class="text-stone-500 mt-3 max-w-lg mx-auto">
                        คัดสรรวัตถุดิบคุณภาพ ปรุงด้วยสูตรต้นตำรับ
                    </p>
                </div>

                <!-- Category Filter -->
                <div class="flex flex-wrap justify-center gap-3 mb-12">
                    <button 
                        v-for="category in menuCategories"
                        :key="category.id"
                        @click="activeCategory = category.id"
                        class="px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300"
                        :class="activeCategory === category.id 
                            ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30' 
                            : 'bg-white text-stone-600 hover:bg-orange-50 border border-stone-200'"
                    >
                        {{ category.name }}
                    </button>
                </div>

                <!-- Menu Grid -->
                <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div 
                        v-for="item in filteredMenu"
                        :key="item.id"
                        class="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer"
                        @click="selectedItem = item.id; showItemModal = true"
                    >
                        <!-- Image -->
                        <div class="relative aspect-square overflow-hidden">
                            <img 
                                :src="item.image" 
                                :alt="item.name"
                                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <!-- Popular Badge -->
                            <div v-if="item.popular" class="absolute top-3 left-3 px-3 py-1 rounded-full bg-orange-500 text-white text-xs font-semibold">
                                ยอดนิยม
                            </div>
                            <!-- Add to Cart Button -->
                            <button 
                                @click.stop="addToCart(item.id)"
                                class="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-orange-500 hover:text-white"
                            >
                                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                                </svg>
                            </button>
                        </div>

                        <!-- Content -->
                        <div class="p-4">
                            <div class="flex items-start justify-between gap-2 mb-2">
                                <div>
                                    <h3 class="font-semibold text-stone-800 group-hover:text-orange-600 transition-colors">
                                        {{ item.name }}
                                    </h3>
                                    <p class="text-xs text-stone-400">{{ item.nameEn }}</p>
                                </div>
                                <!-- Spicy Level -->
                                <div v-if="item.spicy > 0" class="flex gap-0.5">
                                    <svg v-for="i in item.spicy" :key="i" class="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                            <p class="text-sm text-stone-500 mb-3 line-clamp-2">{{ item.desc }}</p>
                            <div class="flex items-center justify-between">
                                <span class="text-lg font-bold text-orange-600">฿{{ item.price }}</span>
                                <button 
                                    @click.stop="addToCart(item.id)"
                                    class="px-4 py-1.5 rounded-lg bg-orange-100 text-orange-600 text-sm font-medium hover:bg-orange-500 hover:text-white transition-colors"
                                >
                                    เพิ่ม
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Reviews Section -->
        <section id="reviews" class="py-16 md:py-24 bg-stone-100">
            <div class="max-w-7xl mx-auto px-4 sm:px-6">
                <!-- Section Header -->
                <div class="text-center mb-12">
                    <span class="text-orange-600 text-sm font-semibold tracking-wider uppercase">Reviews</span>
                    <h2 class="text-3xl md:text-4xl font-bold text-stone-800 mt-2" style="font-family: 'Playfair Display', serif;">
                        รีวิวจากลูกค้า
                    </h2>
                </div>

                <!-- Reviews Grid -->
                <div class="grid md:grid-cols-3 gap-6">
                    <div 
                        v-for="review in reviews"
                        :key="review.id"
                        class="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow"
                    >
                        <!-- Header -->
                        <div class="flex items-center gap-4 mb-4">
                            <img 
                                :src="review.avatar" 
                                :alt="review.name"
                                class="w-12 h-12 rounded-full object-cover"
                            />
                            <div>
                                <h4 class="font-semibold text-stone-800">{{ review.name }}</h4>
                                <p class="text-xs text-stone-400">{{ review.date }}</p>
                            </div>
                        </div>

                        <!-- Rating -->
                        <div class="flex gap-1 mb-3">
                            <svg 
                                v-for="i in 5" 
                                :key="i"
                                class="w-5 h-5" 
                                :class="i <= review.rating ? 'text-yellow-400' : 'text-stone-200'"
                                fill="currentColor" 
                                viewBox="0 0 20 20"
                            >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        </div>

                        <!-- Comment -->
                        <p class="text-stone-600 leading-relaxed">{{ review.comment }}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Location Section -->
        <section id="location" class="py-16 md:py-24">
            <div class="max-w-7xl mx-auto px-4 sm:px-6">
                <div class="grid lg:grid-cols-2 gap-12 items-center">
                    <!-- Map -->
                    <div class="aspect-video lg:aspect-square rounded-2xl overflow-hidden shadow-lg">
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.5!2d100.5!3d13.75!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDQ1JzAwLjAiTiAxMDDCsDMwJzAwLjAiRQ!5e0!3m2!1sen!2sth!4v1234567890"
                            class="w-full h-full border-0"
                            :allowfullscreen="true"
                            loading="lazy"
                        />
                    </div>

                    <!-- Info -->
                    <div>
                        <span class="text-orange-600 text-sm font-semibold tracking-wider uppercase">Location</span>
                        <h2 class="text-3xl md:text-4xl font-bold text-stone-800 mt-2 mb-8" style="font-family: 'Playfair Display', serif;">
                            มาเยี่ยมเราได้
                        </h2>

                        <div class="space-y-6">
                            <!-- Address -->
                            <div class="flex gap-4">
                                <div class="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
                                    <svg class="w-6 h-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 class="font-semibold text-stone-800 mb-1">ที่อยู่</h4>
                                    <p class="text-stone-500">{{ restaurantInfo.address }}</p>
                                </div>
                            </div>

                            <!-- Phone -->
                            <div class="flex gap-4">
                                <div class="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
                                    <svg class="w-6 h-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 class="font-semibold text-stone-800 mb-1">โทรศัพท์</h4>
                                    <p class="text-stone-500">{{ restaurantInfo.phone }}</p>
                                </div>
                            </div>

                            <!-- Hours -->
                            <div class="flex gap-4">
                                <div class="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
                                    <svg class="w-6 h-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 class="font-semibold text-stone-800 mb-1">เวลาเปิด-ปิด</h4>
                                    <p class="text-stone-500">{{ restaurantInfo.hours }}</p>
                                </div>
                            </div>
                        </div>

                        <!-- CTA -->
                        <div class="mt-8 flex flex-wrap gap-4">
                            <Link 
                                href="/demo/reservation"
                                class="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all"
                            >
                                จองโต๊ะ
                            </Link>
                            <a 
                                href="https://goo.gl/maps/xxx"
                                target="_blank"
                                class="px-6 py-3 rounded-xl bg-stone-100 text-stone-700 font-semibold hover:bg-stone-200 transition-colors"
                            >
                                เปิด Google Maps
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Back to Vibedev Banner -->
        <section class="py-8 bg-gradient-to-r from-indigo-600 to-purple-600">
            <div class="max-w-7xl mx-auto px-4 sm:px-6">
                <div class="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div class="text-center md:text-left">
                        <p class="text-white/80 text-sm">นี่คือตัวอย่างจาก</p>
                        <p class="text-white font-bold text-xl">Vibedev - ระบบร้านอาหารออนไลน์</p>
                    </div>
                    <Link 
                        href="/"
                        class="px-6 py-3 rounded-xl bg-white text-indigo-600 font-semibold hover:bg-indigo-50 transition-colors"
                    >
                        ← กลับหน้าหลัก Vibedev
                    </Link>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <footer class="bg-stone-900 text-white py-12">
            <div class="max-w-7xl mx-auto px-4 sm:px-6">
                <div class="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                            <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <div>
                            <h3 class="font-bold">{{ restaurantInfo.name }}</h3>
                            <p class="text-sm text-stone-400">{{ restaurantInfo.nameEn }}</p>
                        </div>
                    </div>
                    <p class="text-stone-400 text-sm">
                        © 2025 {{ restaurantInfo.name }}. Powered by Vibedev.
                    </p>
                </div>
            </div>
        </footer>

        <!-- Floating Cart Button -->
        <div 
            v-if="cartCount > 0 && !showCartPanel"
            class="fixed bottom-6 left-1/2 -translate-x-1/2 z-40"
        >
            <button 
                @click="showCartPanel = true"
                class="px-6 py-4 rounded-2xl bg-orange-500 text-white shadow-2xl shadow-orange-500/30 flex items-center gap-4 hover:bg-orange-600 transition-colors"
            >
                <div class="flex items-center gap-2">
                    <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span class="font-semibold">{{ cartCount }} รายการ</span>
                </div>
                <div class="w-px h-6 bg-white/20" />
                <span class="font-bold">฿{{ cartTotal.toLocaleString() }}</span>
            </button>
        </div>

        <!-- Cart Slide Panel -->
        <Transition name="cart-panel">
            <div 
                v-if="showCartPanel"
                class="fixed inset-0 z-50"
            >
                <!-- Overlay -->
                <Transition name="fade">
                    <div 
                        v-if="showCartPanel"
                        class="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        @click="showCartPanel = false"
                    />
                </Transition>
                
                <!-- Panel -->
                <div class="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col cart-panel-content">
                <!-- Header -->
                <div class="flex items-center justify-between p-6 border-b border-stone-200">
                    <div class="flex items-center gap-3">
                        <svg class="w-6 h-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <h2 class="text-xl font-bold text-stone-800">ตะกร้าของคุณ</h2>
                        <span class="px-2 py-0.5 rounded-full bg-orange-100 text-orange-600 text-sm font-medium">
                            {{ cartCount }} รายการ
                        </span>
                    </div>
                    <button 
                        @click="showCartPanel = false"
                        class="p-2 rounded-lg hover:bg-stone-100 transition-colors"
                    >
                        <svg class="w-6 h-6 text-stone-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <!-- Cart Items -->
                <div class="flex-1 overflow-y-auto p-6 space-y-4">
                    <div v-if="cartItems.length === 0" class="text-center py-16">
                        <svg class="w-16 h-16 text-stone-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <p class="text-stone-500">ยังไม่มีรายการในตะกร้า</p>
                    </div>

                    <div 
                        v-for="cartItem in cartItemsWithDetails"
                        :key="cartItem.id"
                        class="flex gap-4 p-4 bg-stone-50 rounded-xl"
                    >
                        <!-- Image -->
                        <img 
                            v-if="cartItem.item"
                            :src="cartItem.item.image" 
                            :alt="cartItem.item.name"
                            class="w-20 h-20 rounded-lg object-cover"
                        />
                        
                        <!-- Details -->
                        <div class="flex-1" v-if="cartItem.item">
                            <h4 class="font-semibold text-stone-800">{{ cartItem.item.name }}</h4>
                            <p class="text-sm text-stone-500">{{ cartItem.item.nameEn }}</p>
                            <p class="text-orange-600 font-bold mt-1">฿{{ cartItem.item.price }}</p>
                        </div>

                        <!-- Quantity Controls -->
                        <div class="flex flex-col items-end justify-between">
                            <button 
                                @click="removeFromCart(cartItem.id)"
                                class="p-1 text-stone-400 hover:text-red-500 transition-colors"
                            >
                                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                            <div class="flex items-center gap-2 bg-white rounded-lg border border-stone-200">
                                <button 
                                    @click="updateCartQty(cartItem.id, -1)"
                                    class="w-8 h-8 flex items-center justify-center text-stone-600 hover:bg-stone-100 rounded-l-lg transition-colors"
                                >
                                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                                    </svg>
                                </button>
                                <span class="w-8 text-center font-semibold text-stone-800">{{ cartItem.qty }}</span>
                                <button 
                                    @click="updateCartQty(cartItem.id, 1)"
                                    class="w-8 h-8 flex items-center justify-center text-stone-600 hover:bg-stone-100 rounded-r-lg transition-colors"
                                >
                                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Footer -->
                <div class="border-t border-stone-200 p-6 space-y-4 bg-white">
                    <!-- Summary -->
                    <div class="space-y-2">
                        <div class="flex justify-between text-sm">
                            <span class="text-stone-500">ยอดรวม</span>
                            <span class="text-stone-800">฿{{ cartTotal.toLocaleString() }}</span>
                        </div>
                        <div class="flex justify-between text-sm">
                            <span class="text-stone-500">ค่าจัดส่ง</span>
                            <span class="text-emerald-600">ฟรี</span>
                        </div>
                        <div class="flex justify-between text-lg font-bold pt-2 border-t border-stone-200">
                            <span class="text-stone-800">รวมทั้งหมด</span>
                            <span class="text-orange-600">฿{{ cartTotal.toLocaleString() }}</span>
                        </div>
                    </div>

                    <!-- Actions -->
                    <div class="flex gap-3">
                        <button 
                            @click="clearCart"
                            class="px-4 py-3 rounded-xl border border-stone-300 text-stone-600 hover:bg-stone-50 transition-colors text-sm font-medium"
                        >
                            ล้างตะกร้า
                        </button>
                        <button 
                            @click="showCartPanel = false"
                            class="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all"
                        >
                            สั่งอาหาร • ฿{{ cartTotal.toLocaleString() }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </Transition>
    </div>
</template>

<style>
body {
    font-family: 'IBM Plex Sans Thai', sans-serif;
}

html {
    scroll-behavior: smooth;
}

/* Cart Panel Slide Animation */
.cart-panel-enter-active,
.cart-panel-leave-active {
    transition: opacity 0.3s ease;
}

.cart-panel-enter-from,
.cart-panel-leave-to {
    opacity: 0;
}

.cart-panel-enter-active .cart-panel-content,
.cart-panel-leave-active .cart-panel-content {
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.cart-panel-enter-from .cart-panel-content,
.cart-panel-leave-to .cart-panel-content {
    transform: translateX(100%);
}

/* Fade Animation */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
