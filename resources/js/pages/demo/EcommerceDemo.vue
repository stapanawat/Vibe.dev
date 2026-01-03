<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3';
import { ref, computed } from 'vue';

// Product categories
const categories = ref([
    { id: 'all', name: 'ทั้งหมด' },
    { id: 'electronics', name: 'อิเล็กทรอนิกส์' },
    { id: 'clothing', name: 'เสื้อผ้า' },
    { id: 'accessories', name: 'เครื่องประดับ' },
    { id: 'home', name: 'ของใช้ในบ้าน' },
]);

const activeCategory = ref('all');

// Products data
const products = ref([
    { id: 1, name: 'หูฟังไร้สาย Pro', price: 2990, originalPrice: 3990, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400', category: 'electronics', badge: 'ขายดี', rating: 4.8 },
    { id: 2, name: 'สมาร์ทวอทช์ Sport', price: 4590, originalPrice: 5990, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400', category: 'electronics', badge: 'ใหม่', rating: 4.6 },
    { id: 3, name: 'กระเป๋าสะพายหนัง', price: 1890, originalPrice: null, image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400', category: 'accessories', badge: null, rating: 4.5 },
    { id: 4, name: 'เสื้อยืดคอกลม Premium', price: 590, originalPrice: 790, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', category: 'clothing', badge: 'ลด 25%', rating: 4.7 },
    { id: 5, name: 'รองเท้าผ้าใบ Classic', price: 2290, originalPrice: 2990, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', category: 'clothing', badge: null, rating: 4.9 },
    { id: 6, name: 'แว่นกันแดด Polarized', price: 1490, originalPrice: 1990, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400', category: 'accessories', badge: 'ฮิต', rating: 4.4 },
    { id: 7, name: 'โคมไฟตั้งโต๊ะ LED', price: 890, originalPrice: null, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400', category: 'home', badge: null, rating: 4.3 },
    { id: 8, name: 'ลำโพง Bluetooth', price: 1790, originalPrice: 2290, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400', category: 'electronics', badge: null, rating: 4.6 },
]);

const filteredProducts = computed(() => {
    if (activeCategory.value === 'all') return products.value;
    return products.value.filter(p => p.category === activeCategory.value);
});

// Cart
const cartItems = ref<{id: number, qty: number}[]>([]);
const showCart = ref(false);
const showCheckout = ref(false);
const orderComplete = ref(false);

// Payment
const selectedPayment = ref<string | null>(null);
const selectedCardType = ref<string | null>(null);

const paymentMethods = [
    { id: 'cash', name: 'เงินสด', desc: 'ชำระเงินปลายทาง', icon: 'cash' },
    { id: 'card', name: 'บัตรเครดิต/เดบิต', desc: 'Visa, MasterCard, PromptPay', icon: 'card' },
    { id: 'qrcode', name: 'QR Code', desc: 'สแกนจ่ายผ่านแอปธนาคาร', icon: 'qr' },
];

const cardTypes = [
    { id: 'visa', name: 'Visa', color: 'from-blue-600 to-blue-800' },
    { id: 'mastercard', name: 'MasterCard', color: 'from-red-500 to-orange-500' },
    { id: 'promptpay', name: 'PromptPay', color: 'from-indigo-500 to-purple-600' },
];

// Customer info
const customerInfo = ref({
    name: '',
    phone: '',
    address: '',
});

// Cart functions
const addToCart = (productId: number) => {
    const existing = cartItems.value.find(c => c.id === productId);
    if (existing) {
        existing.qty++;
    } else {
        cartItems.value.push({ id: productId, qty: 1 });
    }
};

const removeFromCart = (productId: number) => {
    cartItems.value = cartItems.value.filter(c => c.id !== productId);
};

const updateCartQty = (productId: number, delta: number) => {
    const item = cartItems.value.find(c => c.id === productId);
    if (item) {
        item.qty += delta;
        if (item.qty <= 0) removeFromCart(productId);
    }
};

const clearCart = () => {
    cartItems.value = [];
};

const cartTotal = computed(() => {
    return cartItems.value.reduce((sum, cart) => {
        const product = products.value.find(p => p.id === cart.id);
        return sum + (product ? product.price * cart.qty : 0);
    }, 0);
});

const cartCount = computed(() => {
    return cartItems.value.reduce((sum, cart) => sum + cart.qty, 0);
});

const cartItemsWithDetails = computed(() => {
    return cartItems.value.map(cart => {
        const product = products.value.find(p => p.id === cart.id);
        return { ...cart, product };
    });
});

const canCheckout = computed(() => {
    return customerInfo.value.name && customerInfo.value.phone && selectedPayment.value;
});

const submitOrder = () => {
    orderComplete.value = true;
    showCheckout.value = false;
};

const resetOrder = () => {
    orderComplete.value = false;
    showCart.value = false;
    clearCart();
    customerInfo.value = { name: '', phone: '', address: '' };
    selectedPayment.value = null;
    selectedCardType.value = null;
};

const formatPrice = (price: number) => {
    return price.toLocaleString('th-TH');
};
</script>

<template>
    <Head title="ร้านค้าออนไลน์ - VibeDev Shop">
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
    </Head>

    <div class="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 font-sans">
        <!-- Navigation -->
        <nav class="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200/50 shadow-sm">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 py-3">
                <div class="flex items-center justify-between">
                    <!-- Logo -->
                    <Link href="/" class="flex items-center gap-3 group">
                        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center shadow-lg group-hover:shadow-indigo-500/40 transition-all">
                            <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                        </div>
                        <div>
                            <h1 class="text-lg font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">VibeDev Shop</h1>
                            <p class="text-xs text-slate-500">ช้อปออนไลน์ง่ายๆ</p>
                        </div>
                    </Link>

                    <!-- Search Bar -->
                    <div class="hidden md:flex flex-1 max-w-md mx-8">
                        <div class="relative w-full">
                            <input 
                                type="text" 
                                placeholder="ค้นหาสินค้า..." 
                                class="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all text-sm"
                            />
                            <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>

                    <!-- Cart Button -->
                    <button 
                        @click="showCart = true"
                        class="relative p-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 transition-colors group"
                    >
                        <svg class="w-6 h-6 text-indigo-600 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span 
                            v-if="cartCount > 0"
                            class="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-xs font-bold flex items-center justify-center animate-bounce"
                        >
                            {{ cartCount }}
                        </span>
                    </button>
                </div>
            </div>
        </nav>

        <!-- Hero Section -->
        <section class="pt-24 pb-8 px-4 sm:px-6">
            <div class="max-w-7xl mx-auto">
                <div class="relative rounded-3xl overflow-hidden bg-gradient-to-r from-indigo-600 via-violet-500 to-purple-400 p-8 md:p-12">
                    <div class="relative z-10 max-w-xl">
                        <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-sm font-medium mb-4">
                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clip-rule="evenodd" />
                            </svg>
                            โปรโมชั่นพิเศษ
                        </span>
                        <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
                            ลดสูงสุด 50%<br/>ทั้งร้าน!
                        </h2>
                        <p class="text-white/80 mb-6">
                            ช้อปสินค้าคุณภาพ ราคาพิเศษ จัดส่งฟรีทั่วประเทศ
                        </p>
                        <button class="px-6 py-3 rounded-xl bg-white text-indigo-600 font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                            ช้อปเลย
                        </button>
                    </div>
                    <!-- Decorative -->
                    <div class="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:flex items-center justify-center">
                        <div class="absolute right-10 top-1/2 -translate-y-1/2 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                        <div class="absolute right-32 top-1/3 w-32 h-32 bg-white/20 rounded-full blur-2xl" />
                        <img 
                            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600" 
                            alt="Shopping" 
                            class="w-80 h-64 object-cover rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500 relative z-10"
                        />
                    </div>
                </div>
            </div>
        </section>

        <!-- Categories -->
        <section class="py-6 px-4 sm:px-6">
            <div class="max-w-7xl mx-auto">
                <div class="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    <button
                        v-for="cat in categories"
                        :key="cat.id"
                        @click="activeCategory = cat.id"
                        class="px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all"
                        :class="activeCategory === cat.id 
                            ? 'bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-500/30' 
                            : 'bg-white text-slate-600 hover:bg-indigo-50 border border-slate-200'"
                    >
                        {{ cat.name }}
                    </button>
                </div>
            </div>
        </section>

        <!-- Products Grid -->
        <section class="py-8 px-4 sm:px-6">
            <div class="max-w-7xl mx-auto">
                <div class="flex items-center justify-between mb-6">
                    <h2 class="text-xl font-bold text-slate-800">สินค้าทั้งหมด</h2>
                    <span class="text-sm text-slate-500">{{ filteredProducts.length }} รายการ</span>
                </div>

                <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    <div 
                        v-for="product in filteredProducts"
                        :key="product.id"
                        class="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100"
                    >
                        <!-- Image -->
                        <div class="aspect-square overflow-hidden relative">
                            <img 
                                :src="product.image" 
                                :alt="product.name"
                                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <!-- Badge -->
                            <span 
                                v-if="product.badge"
                                class="absolute top-3 left-3 px-2 py-1 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-xs font-semibold shadow-lg"
                            >
                                {{ product.badge }}
                            </span>
                            <!-- Quick Add -->
                            <button 
                                @click="addToCart(product.id)"
                                class="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all hover:bg-indigo-500 hover:text-white"
                            >
                                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                                </svg>
                            </button>
                        </div>
                        <!-- Info -->
                        <div class="p-4">
                            <h3 class="font-medium text-slate-800 mb-1 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                                {{ product.name }}
                            </h3>
                            <div class="flex items-center gap-1 mb-2">
                                <svg class="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                </svg>
                                <span class="text-xs text-slate-500">{{ product.rating }}</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <span class="text-lg font-bold text-indigo-600">฿{{ formatPrice(product.price) }}</span>
                                <span v-if="product.originalPrice" class="text-sm text-slate-400 line-through">
                                    ฿{{ formatPrice(product.originalPrice) }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Cart Panel -->
        <Teleport to="body">
            <Transition name="fade">
                <div v-if="showCart && !orderComplete" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" @click="showCart = false" />
            </Transition>
            <Transition name="slide-right">
                <div v-if="showCart && !orderComplete" class="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col">
                    <!-- Header -->
                    <div class="p-6 border-b border-slate-200 flex items-center justify-between">
                        <h2 class="text-xl font-bold text-slate-800">ตะกร้าสินค้า</h2>
                        <button @click="showCart = false" class="p-2 rounded-lg hover:bg-slate-100 transition-colors">
                            <svg class="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <!-- Cart Items -->
                    <div class="flex-1 overflow-y-auto p-6">
                        <div v-if="cartItems.length === 0" class="text-center py-12">
                            <svg class="w-16 h-16 text-slate-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <p class="text-slate-500">ตะกร้าว่างเปล่า</p>
                        </div>

                        <div v-else class="space-y-4">
                            <div 
                                v-for="item in cartItemsWithDetails"
                                :key="item.id"
                                class="flex gap-4 p-3 rounded-xl bg-slate-50"
                            >
                                <img 
                                    :src="item.product?.image" 
                                    class="w-20 h-20 rounded-lg object-cover"
                                />
                                <div class="flex-1">
                                    <h3 class="font-medium text-slate-800 text-sm">{{ item.product?.name }}</h3>
                                    <p class="text-indigo-600 font-semibold">฿{{ formatPrice(item.product?.price || 0) }}</p>
                                    <div class="flex items-center gap-2 mt-2">
                                        <button 
                                            @click="updateCartQty(item.id, -1)"
                                            class="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-100"
                                        >
                                            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                                            </svg>
                                        </button>
                                        <span class="w-8 text-center font-medium">{{ item.qty }}</span>
                                        <button 
                                            @click="updateCartQty(item.id, 1)"
                                            class="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-100"
                                        >
                                            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <button 
                                    @click="removeFromCart(item.id)"
                                    class="text-slate-400 hover:text-red-500 transition-colors"
                                >
                                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Checkout Section -->
                    <div v-if="!showCheckout && cartItems.length > 0" class="p-6 border-t border-slate-200 bg-slate-50">
                        <div class="flex items-center justify-between mb-4">
                            <span class="text-slate-600">ยอดรวม</span>
                            <span class="text-2xl font-bold text-slate-800">฿{{ formatPrice(cartTotal) }}</span>
                        </div>
                        <button 
                            @click="showCheckout = true"
                            class="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-semibold shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-[1.02] transition-all"
                        >
                            ดำเนินการชำระเงิน
                        </button>
                    </div>

                    <!-- Payment Form -->
                    <div v-if="showCheckout && cartItems.length > 0" class="flex-1 overflow-y-auto p-6">
                        <button @click="showCheckout = false" class="flex items-center gap-2 text-slate-500 hover:text-slate-700 mb-6">
                            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                            </svg>
                            กลับ
                        </button>

                        <h3 class="text-lg font-bold text-slate-800 mb-4">ข้อมูลผู้สั่งซื้อ</h3>
                        
                        <div class="space-y-4 mb-8">
                            <div>
                                <label class="block text-sm font-medium text-slate-700 mb-1">ชื่อ-นามสกุล *</label>
                                <input 
                                    v-model="customerInfo.name"
                                    type="text" 
                                    class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
                                    placeholder="ระบุชื่อ-นามสกุล"
                                />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-slate-700 mb-1">เบอร์โทรศัพท์ *</label>
                                <input 
                                    v-model="customerInfo.phone"
                                    type="tel" 
                                    class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
                                    placeholder="0xx-xxx-xxxx"
                                />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-slate-700 mb-1">ที่อยู่จัดส่ง</label>
                                <textarea 
                                    v-model="customerInfo.address"
                                    rows="3"
                                    class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all resize-none"
                                    placeholder="ระบุที่อยู่สำหรับจัดส่ง"
                                />
                            </div>
                        </div>

                        <!-- Payment Methods -->
                        <h3 class="text-lg font-bold text-slate-800 mb-4">เลือกวิธีชำระเงิน</h3>
                        
                        <div class="space-y-3 mb-6">
                            <button
                                v-for="method in paymentMethods"
                                :key="method.id"
                                @click="selectedPayment = method.id; if(method.id !== 'card') selectedCardType = null"
                                class="w-full p-4 rounded-xl border-2 transition-all flex items-center gap-4 text-left"
                                :class="selectedPayment === method.id 
                                    ? 'border-indigo-500 bg-indigo-50' 
                                    : 'border-slate-200 hover:border-indigo-300 bg-white'"
                            >
                                <!-- Icons -->
                                <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center flex-shrink-0">
                                    <svg v-if="method.icon === 'cash'" class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    <svg v-else-if="method.icon === 'card'" class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                    </svg>
                                    <svg v-else class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                                    </svg>
                                </div>
                                <div class="flex-1">
                                    <h4 class="font-semibold text-slate-800">{{ method.name }}</h4>
                                    <p class="text-sm text-slate-500">{{ method.desc }}</p>
                                </div>
                                <div 
                                    class="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                                    :class="selectedPayment === method.id ? 'border-indigo-500 bg-indigo-500' : 'border-slate-300'"
                                >
                                    <svg v-if="selectedPayment === method.id" class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                            </button>
                        </div>

                        <!-- Card Types (if card selected) -->
                        <Transition name="fade">
                            <div v-if="selectedPayment === 'card'" class="mb-6">
                                <h4 class="text-sm font-medium text-slate-700 mb-3">เลือกประเภทบัตร</h4>
                                <div class="grid grid-cols-3 gap-3">
                                    <button
                                        v-for="card in cardTypes"
                                        :key="card.id"
                                        @click="selectedCardType = card.id"
                                        class="p-3 rounded-xl border-2 transition-all"
                                        :class="selectedCardType === card.id 
                                            ? 'border-indigo-500 bg-indigo-50' 
                                            : 'border-slate-200 hover:border-indigo-300 bg-white'"
                                    >
                                        <div 
                                            class="h-8 rounded-lg bg-gradient-to-r mb-2"
                                            :class="card.color"
                                        />
                                        <span class="text-xs font-medium text-slate-700">{{ card.name }}</span>
                                    </button>
                                </div>
                            </div>
                        </Transition>

                        <!-- QR Code Display (if QR selected) -->
                        <Transition name="fade">
                            <div v-if="selectedPayment === 'qrcode'" class="mb-6 text-center">
                                <div class="inline-block p-6 bg-white rounded-2xl border-2 border-dashed border-slate-300">
                                    <div class="w-40 h-40 bg-slate-100 rounded-xl flex items-center justify-center mb-3">
                                        <svg class="w-20 h-20 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                                        </svg>
                                    </div>
                                    <p class="text-sm text-slate-500">สแกน QR Code เพื่อชำระเงิน</p>
                                    <p class="text-lg font-bold text-indigo-600">฿{{ formatPrice(cartTotal) }}</p>
                                </div>
                            </div>
                        </Transition>

                        <!-- Summary -->
                        <div class="bg-slate-100 rounded-xl p-4 mb-6">
                            <div class="flex justify-between mb-2">
                                <span class="text-slate-600">ยอดสินค้า</span>
                                <span class="text-slate-800">฿{{ formatPrice(cartTotal) }}</span>
                            </div>
                            <div class="flex justify-between mb-2">
                                <span class="text-slate-600">ค่าจัดส่ง</span>
                                <span class="text-green-600 font-medium">ฟรี</span>
                            </div>
                            <div class="border-t border-slate-200 pt-2 mt-2 flex justify-between">
                                <span class="font-semibold text-slate-800">ยอดชำระทั้งหมด</span>
                                <span class="text-xl font-bold text-indigo-600">฿{{ formatPrice(cartTotal) }}</span>
                            </div>
                        </div>

                        <button 
                            @click="submitOrder"
                            :disabled="!canCheckout"
                            class="w-full py-3 rounded-xl font-semibold shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            :class="canCheckout 
                                ? 'bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-[1.02]' 
                                : 'bg-slate-300 text-slate-500'"
                        >
                            ยืนยันการสั่งซื้อ
                        </button>
                    </div>
                </div>
            </Transition>
        </Teleport>

        <!-- Order Complete -->
        <Teleport to="body">
            <Transition name="fade">
                <div v-if="orderComplete" class="fixed inset-0 bg-gradient-to-br from-indigo-500 to-violet-500 z-50 flex items-center justify-center p-4">
                    <div class="max-w-md w-full bg-white rounded-3xl p-8 text-center shadow-2xl">
                        <!-- Success Icon -->
                        <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg class="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        
                        <h2 class="text-2xl font-bold text-slate-800 mb-2">สั่งซื้อสำเร็จ!</h2>
                        <p class="text-slate-500 mb-6">ขอบคุณที่สั่งซื้อสินค้ากับเรา</p>
                        
                        <div class="bg-slate-50 rounded-xl p-4 mb-6 text-left">
                            <div class="flex justify-between mb-2">
                                <span class="text-slate-500">หมายเลขคำสั่งซื้อ</span>
                                <span class="font-mono font-semibold">#VD{{ Date.now().toString().slice(-6) }}</span>
                            </div>
                            <div class="flex justify-between mb-2">
                                <span class="text-slate-500">ยอดชำระ</span>
                                <span class="font-semibold text-indigo-600">฿{{ formatPrice(cartTotal) }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-slate-500">ชำระโดย</span>
                                <span class="font-medium">
                                    {{ paymentMethods.find(p => p.id === selectedPayment)?.name }}
                                    <span v-if="selectedCardType">
                                        ({{ cardTypes.find(c => c.id === selectedCardType)?.name }})
                                    </span>
                                </span>
                            </div>
                        </div>
                        
                        <button 
                            @click="resetOrder"
                            class="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-semibold shadow-lg hover:scale-105 transition-all"
                        >
                            กลับหน้าร้าน
                        </button>
                    </div>
                </div>
            </Transition>
        </Teleport>

        <!-- Vibedev Banner -->
        <section class="py-8 bg-gradient-to-r from-indigo-600 to-purple-600 mt-16">
            <div class="max-w-7xl mx-auto px-4 sm:px-6">
                <div class="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div class="text-center md:text-left">
                        <p class="text-white/80 text-sm">นี่คือตัวอย่างจาก</p>
                        <p class="text-white font-bold text-xl">Vibedev - ระบบร้านค้าออนไลน์</p>
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
    </div>
</template>

<style scoped>
body {
    font-family: 'Prompt', sans-serif;
}

.scrollbar-hide::-webkit-scrollbar {
    display: none;
}

.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.slide-right-enter-active,
.slide-right-leave-active {
    transition: transform 0.3s ease;
}

.slide-right-enter-from,
.slide-right-leave-to {
    transform: translateX(100%);
}
</style>
