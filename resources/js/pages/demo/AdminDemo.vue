<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3';
import { ref, computed } from 'vue';

// Active tab
const activeTab = ref('dashboard');

// Dashboard stats
const stats = ref({
    todayReservations: 12,
    todayRevenue: 15680,
    pendingOrders: 3,
    availableTables: 7,
});

// Menu items
const menuItems = ref([
    { id: 1, name: 'ต้มยำกุ้ง', price: 180, category: 'main', available: true, image: 'https://images.unsplash.com/photo-1548943487-a2e4e43b4853?w=200' },
    { id: 2, name: 'ผัดไทย', price: 120, category: 'main', available: true, image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=200' },
    { id: 3, name: 'แกงเขียวหวาน', price: 150, category: 'main', available: true, image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=200' },
    { id: 4, name: 'ส้มตำ', price: 80, category: 'appetizer', available: false, image: 'https://images.unsplash.com/photo-1569562211093-4ed0d0758f12?w=200' },
    { id: 5, name: 'ข้าวผัดกุ้ง', price: 140, category: 'main', available: true, image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=200' },
    { id: 6, name: 'ปอเปี๊ยะทอด', price: 60, category: 'appetizer', available: true, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=200' },
]);

// Reservations
const reservations = ref([
    { id: 1, name: 'คุณสมชาย ใจดี', phone: '081-234-5678', date: '2025-01-01', time: '18:00', guests: 4, table: 3, status: 'confirmed' },
    { id: 2, name: 'คุณสมหญิง รักดี', phone: '082-345-6789', date: '2025-01-01', time: '18:30', guests: 2, table: 1, status: 'pending' },
    { id: 3, name: 'คุณวิชัย มากมี', phone: '083-456-7890', date: '2025-01-01', time: '19:00', guests: 6, table: 5, status: 'confirmed' },
    { id: 4, name: 'คุณมานี ดีใจ', phone: '084-567-8901', date: '2025-01-01', time: '19:30', guests: 4, table: 4, status: 'pending' },
    { id: 5, name: 'คุณปิติ สุขใจ', phone: '085-678-9012', date: '2025-01-01', time: '20:00', guests: 8, table: 7, status: 'confirmed' },
]);

// Orders
const orders = ref([
    { id: 1, table: 3, items: ['ต้มยำกุ้ง x2', 'ผัดไทย x1', 'ชาไทย x3'], total: 615, status: 'preparing', time: '18:15' },
    { id: 2, table: 5, items: ['แกงเขียวหวาน x3', 'ส้มตำ x2', 'ข้าวผัดกุ้ง x2'], total: 890, status: 'served', time: '19:20' },
    { id: 3, table: 1, items: ['ปอเปี๊ยะทอด x1', 'ผัดไทย x2'], total: 300, status: 'pending', time: '18:45' },
]);

// Chart data (mock)
const chartData = ref({
    labels: ['จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.', 'อา.'],
    data: [8500, 12300, 9800, 11200, 15600, 21000, 18500],
});

// Edit modal
const showEditModal = ref(false);
const editingItem = ref<typeof menuItems.value[0] | null>(null);

const openEditModal = (item: typeof menuItems.value[0]) => {
    editingItem.value = { ...item };
    showEditModal.value = true;
};

const saveItem = () => {
    if (editingItem.value) {
        const index = menuItems.value.findIndex(m => m.id === editingItem.value!.id);
        if (index !== -1) {
            menuItems.value[index] = { ...editingItem.value };
        }
    }
    showEditModal.value = false;
};

const toggleAvailability = (id: number) => {
    const item = menuItems.value.find(m => m.id === id);
    if (item) {
        item.available = !item.available;
    }
};

const confirmReservation = (id: number) => {
    const reservation = reservations.value.find(r => r.id === id);
    if (reservation) {
        reservation.status = 'confirmed';
    }
};

const updateOrderStatus = (id: number, status: string) => {
    const order = orders.value.find(o => o.id === id);
    if (order) {
        order.status = status;
    }
};
</script>

<template>
    <Head title="ระบบหลังบ้าน - ครัวคุณแม่">
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
    </Head>

    <div class="min-h-screen bg-slate-100 font-sans">
        <!-- Sidebar -->
        <aside class="fixed left-0 top-0 bottom-0 w-64 bg-slate-900 text-white z-40 hidden lg:block">
            <!-- Logo -->
            <div class="p-6 border-b border-slate-700">
                <Link href="/demo/restaurant" class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg">
                        <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    </div>
                    <div>
                        <h1 class="font-bold text-white">ครัวคุณแม่</h1>
                        <p class="text-xs text-slate-400">Admin Panel</p>
                    </div>
                </Link>
            </div>

            <!-- Navigation -->
            <nav class="p-4 space-y-2">
                <button 
                    @click="activeTab = 'dashboard'"
                    class="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left"
                    :class="activeTab === 'dashboard' ? 'bg-orange-500 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'"
                >
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                    <span>แดชบอร์ด</span>
                </button>

                <button 
                    @click="activeTab = 'menu'"
                    class="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left"
                    :class="activeTab === 'menu' ? 'bg-orange-500 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'"
                >
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <span>จัดการเมนู</span>
                </button>

                <button 
                    @click="activeTab = 'reservations'"
                    class="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left"
                    :class="activeTab === 'reservations' ? 'bg-orange-500 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'"
                >
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>การจองโต๊ะ</span>
                    <span v-if="reservations.filter(r => r.status === 'pending').length > 0" class="ml-auto px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                        {{ reservations.filter(r => r.status === 'pending').length }}
                    </span>
                </button>

                <button 
                    @click="activeTab = 'orders'"
                    class="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left"
                    :class="activeTab === 'orders' ? 'bg-orange-500 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'"
                >
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                    <span>ออเดอร์</span>
                    <span v-if="orders.filter(o => o.status === 'pending').length > 0" class="ml-auto px-2 py-0.5 bg-yellow-500 text-white text-xs rounded-full">
                        {{ orders.filter(o => o.status === 'pending').length }}
                    </span>
                </button>
            </nav>

            <!-- Back to Vibedev -->
            <div class="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700">
                <Link 
                    href="/"
                    class="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
                >
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span>กลับ Vibedev</span>
                </Link>
            </div>
        </aside>

        <!-- Mobile Header -->
        <header class="lg:hidden fixed top-0 left-0 right-0 bg-white shadow-sm z-40">
            <div class="px-4 py-3 flex items-center justify-between">
                <Link href="/demo/restaurant" class="flex items-center gap-2">
                    <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                        <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    </div>
                    <span class="font-bold text-slate-800">Admin</span>
                </Link>
                <div class="flex gap-2">
                    <button 
                        v-for="tab in ['dashboard', 'menu', 'reservations', 'orders']"
                        :key="tab"
                        @click="activeTab = tab"
                        class="p-2 rounded-lg transition-colors"
                        :class="activeTab === tab ? 'bg-orange-100 text-orange-600' : 'text-slate-400'"
                    >
                        <svg v-if="tab === 'dashboard'" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
                        </svg>
                        <svg v-else-if="tab === 'menu'" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13" />
                        </svg>
                        <svg v-else-if="tab === 'reservations'" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <svg v-else class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
                        </svg>
                    </button>
                </div>
            </div>
        </header>

        <!-- Main Content -->
        <main class="lg:ml-64 pt-16 lg:pt-0">
            <div class="p-6">
                <!-- Dashboard Tab -->
                <div v-if="activeTab === 'dashboard'">
                    <h1 class="text-2xl font-bold text-slate-800 mb-6">แดชบอร์ด</h1>

                    <!-- Stats Grid -->
                    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <div class="bg-white rounded-2xl p-6 shadow-sm">
                            <div class="flex items-center justify-between mb-4">
                                <div class="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                                    <svg class="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <span class="text-sm text-emerald-600 font-medium">+12%</span>
                            </div>
                            <p class="text-2xl font-bold text-slate-800">{{ stats.todayReservations }}</p>
                            <p class="text-sm text-slate-500">การจองวันนี้</p>
                        </div>

                        <div class="bg-white rounded-2xl p-6 shadow-sm">
                            <div class="flex items-center justify-between mb-4">
                                <div class="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                                    <svg class="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <span class="text-sm text-emerald-600 font-medium">+8%</span>
                            </div>
                            <p class="text-2xl font-bold text-slate-800">฿{{ stats.todayRevenue.toLocaleString() }}</p>
                            <p class="text-sm text-slate-500">รายได้วันนี้</p>
                        </div>

                        <div class="bg-white rounded-2xl p-6 shadow-sm">
                            <div class="flex items-center justify-between mb-4">
                                <div class="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">
                                    <svg class="w-6 h-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                            </div>
                            <p class="text-2xl font-bold text-slate-800">{{ stats.pendingOrders }}</p>
                            <p class="text-sm text-slate-500">ออเดอร์รอดำเนินการ</p>
                        </div>

                        <div class="bg-white rounded-2xl p-6 shadow-sm">
                            <div class="flex items-center justify-between mb-4">
                                <div class="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                                    <svg class="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                    </svg>
                                </div>
                            </div>
                            <p class="text-2xl font-bold text-slate-800">{{ stats.availableTables }}/10</p>
                            <p class="text-sm text-slate-500">โต๊ะว่าง</p>
                        </div>
                    </div>

                    <!-- Chart -->
                    <div class="bg-white rounded-2xl p-6 shadow-sm mb-8">
                        <h3 class="font-semibold text-slate-800 mb-6">รายได้ 7 วันย้อนหลัง</h3>
                        <div class="h-64 flex items-end gap-4">
                            <div 
                                v-for="(value, index) in chartData.data"
                                :key="index"
                                class="flex-1 flex flex-col items-center gap-2"
                            >
                                <div 
                                    class="w-full rounded-t-lg bg-gradient-to-t from-orange-500 to-orange-400 transition-all duration-500 hover:from-orange-600 hover:to-orange-500"
                                    :style="{ height: `${(value / Math.max(...chartData.data)) * 100}%` }"
                                />
                                <span class="text-xs text-slate-500">{{ chartData.labels[index] }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Recent Activity -->
                    <div class="grid lg:grid-cols-2 gap-6">
                        <div class="bg-white rounded-2xl p-6 shadow-sm">
                            <h3 class="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                <svg class="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                </svg>
                                <span>การจองล่าสุด</span>
                            </h3>
                            <div class="space-y-3">
                                <div 
                                    v-for="reservation in reservations.slice(0, 3)"
                                    :key="reservation.id"
                                    class="flex items-center justify-between p-3 bg-slate-50 rounded-xl"
                                >
                                    <div>
                                        <p class="font-medium text-slate-800">{{ reservation.name }}</p>
                                        <p class="text-sm text-slate-500">{{ reservation.time }} • {{ reservation.guests }} คน</p>
                                    </div>
                                    <span 
                                        class="px-3 py-1 rounded-full text-xs font-medium"
                                        :class="reservation.status === 'confirmed' 
                                            ? 'bg-emerald-100 text-emerald-600' 
                                            : 'bg-yellow-100 text-yellow-600'"
                                    >
                                        {{ reservation.status === 'confirmed' ? 'ยืนยันแล้ว' : 'รอยืนยัน' }}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div class="bg-white rounded-2xl p-6 shadow-sm">
                            <h3 class="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                <svg class="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                                <span>ออเดอร์ล่าสุด</span>
                            </h3>
                            <div class="space-y-3">
                                <div 
                                    v-for="order in orders"
                                    :key="order.id"
                                    class="flex items-center justify-between p-3 bg-slate-50 rounded-xl"
                                >
                                    <div>
                                        <p class="font-medium text-slate-800">โต๊ะ {{ order.table }}</p>
                                        <p class="text-sm text-slate-500">฿{{ order.total.toLocaleString() }}</p>
                                    </div>
                                    <span 
                                        class="px-3 py-1 rounded-full text-xs font-medium"
                                        :class="{
                                            'bg-yellow-100 text-yellow-600': order.status === 'pending',
                                            'bg-blue-100 text-blue-600': order.status === 'preparing',
                                            'bg-emerald-100 text-emerald-600': order.status === 'served'
                                        }"
                                    >
                                        {{ order.status === 'pending' ? 'รอรับออเดอร์' : order.status === 'preparing' ? 'กำลังทำ' : 'เสิร์ฟแล้ว' }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Menu Tab -->
                <div v-if="activeTab === 'menu'">
                    <div class="flex items-center justify-between mb-6">
                        <h1 class="text-2xl font-bold text-slate-800">จัดการเมนู</h1>
                        <button class="px-4 py-2 rounded-xl bg-orange-500 text-white font-medium hover:bg-orange-600 transition-colors flex items-center gap-2">
                            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                            </svg>
                            เพิ่มเมนู
                        </button>
                    </div>

                    <!-- Mobile Cards View -->
                    <div class="md:hidden space-y-4">
                        <div 
                            v-for="item in menuItems" 
                            :key="item.id"
                            class="bg-white rounded-2xl p-4 shadow-sm"
                        >
                            <div class="flex items-center gap-4 mb-3">
                                <img :src="item.image" :alt="item.name" class="w-16 h-16 rounded-xl object-cover" />
                                <div class="flex-1">
                                    <h3 class="font-medium text-slate-800">{{ item.name }}</h3>
                                    <p class="text-orange-600 font-semibold">฿{{ item.price }}</p>
                                </div>
                            </div>
                            <div class="flex items-center justify-between">
                                <button 
                                    @click="toggleAvailability(item.id)"
                                    class="px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
                                    :class="item.available 
                                        ? 'bg-emerald-100 text-emerald-600' 
                                        : 'bg-red-100 text-red-600'"
                                >
                                    {{ item.available ? 'พร้อมขาย' : 'หมด' }}
                                </button>
                                <button 
                                    @click="openEditModal(item)"
                                    class="px-4 py-1.5 rounded-lg bg-slate-100 text-slate-600 text-sm font-medium"
                                >
                                    แก้ไข
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Desktop Table View -->
                    <div class="hidden md:block bg-white rounded-2xl shadow-sm overflow-hidden">
                        <div class="overflow-x-auto">
                            <table class="w-full min-w-[600px]">
                                <thead class="bg-slate-50">
                                    <tr>
                                        <th class="px-6 py-4 text-left text-sm font-medium text-slate-500">รูป</th>
                                        <th class="px-6 py-4 text-left text-sm font-medium text-slate-500">ชื่อเมนู</th>
                                        <th class="px-6 py-4 text-left text-sm font-medium text-slate-500">ราคา</th>
                                        <th class="px-6 py-4 text-left text-sm font-medium text-slate-500">สถานะ</th>
                                        <th class="px-6 py-4 text-right text-sm font-medium text-slate-500">จัดการ</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-slate-100">
                                    <tr v-for="item in menuItems" :key="item.id" class="hover:bg-slate-50 transition-colors">
                                        <td class="px-6 py-4">
                                            <img :src="item.image" :alt="item.name" class="w-12 h-12 rounded-lg object-cover" />
                                        </td>
                                        <td class="px-6 py-4">
                                            <span class="font-medium text-slate-800">{{ item.name }}</span>
                                        </td>
                                        <td class="px-6 py-4">
                                            <span class="text-slate-600">฿{{ item.price }}</span>
                                        </td>
                                        <td class="px-6 py-4">
                                            <button 
                                                @click="toggleAvailability(item.id)"
                                                class="px-3 py-1 rounded-full text-xs font-medium transition-colors"
                                                :class="item.available 
                                                    ? 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200' 
                                                    : 'bg-red-100 text-red-600 hover:bg-red-200'"
                                            >
                                                {{ item.available ? 'พร้อมขาย' : 'หมด' }}
                                            </button>
                                        </td>
                                        <td class="px-6 py-4 text-right">
                                            <button 
                                                @click="openEditModal(item)"
                                                class="p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-colors"
                                            >
                                                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- Reservations Tab -->
                <div v-if="activeTab === 'reservations'">
                    <h1 class="text-2xl font-bold text-slate-800 mb-6">การจองโต๊ะ</h1>

                    <!-- Mobile Cards View -->
                    <div class="md:hidden space-y-4">
                        <div 
                            v-for="reservation in reservations" 
                            :key="reservation.id"
                            class="bg-white rounded-2xl p-4 shadow-sm"
                        >
                            <div class="flex items-start justify-between mb-3">
                                <div>
                                    <h3 class="font-medium text-slate-800">{{ reservation.name }}</h3>
                                    <p class="text-sm text-slate-500">{{ reservation.phone }}</p>
                                </div>
                                <span 
                                    class="px-3 py-1 rounded-full text-xs font-medium"
                                    :class="reservation.status === 'confirmed' 
                                        ? 'bg-emerald-100 text-emerald-600' 
                                        : 'bg-yellow-100 text-yellow-600'"
                                >
                                    {{ reservation.status === 'confirmed' ? 'ยืนยันแล้ว' : 'รอยืนยัน' }}
                                </span>
                            </div>
                            <div class="flex flex-wrap items-center gap-2 mb-3 text-sm">
                                <span class="px-2 py-1 rounded-lg bg-slate-100 text-slate-600">{{ reservation.date }}</span>
                                <span class="px-2 py-1 rounded-lg bg-slate-100 text-slate-600">{{ reservation.time }} น.</span>
                                <span class="px-2 py-1 rounded-lg bg-slate-100 text-slate-600">{{ reservation.guests }} คน</span>
                                <span class="px-2 py-1 rounded-lg bg-orange-100 text-orange-600 font-medium">โต๊ะ {{ reservation.table }}</span>
                            </div>
                            <button 
                                v-if="reservation.status === 'pending'"
                                @click="confirmReservation(reservation.id)"
                                class="w-full py-2.5 rounded-lg bg-emerald-500 text-white text-sm font-medium hover:bg-emerald-600 transition-colors"
                            >
                                ยืนยันการจอง
                            </button>
                        </div>
                    </div>

                    <!-- Desktop Table View -->
                    <div class="hidden md:block bg-white rounded-2xl shadow-sm overflow-hidden">
                        <div class="overflow-x-auto">
                            <table class="w-full min-w-[700px]">
                                <thead class="bg-slate-50">
                                    <tr>
                                        <th class="px-6 py-4 text-left text-sm font-medium text-slate-500">ผู้จอง</th>
                                        <th class="px-6 py-4 text-left text-sm font-medium text-slate-500">วันเวลา</th>
                                        <th class="px-6 py-4 text-left text-sm font-medium text-slate-500">โต๊ะ</th>
                                        <th class="px-6 py-4 text-left text-sm font-medium text-slate-500">สถานะ</th>
                                        <th class="px-6 py-4 text-right text-sm font-medium text-slate-500">จัดการ</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-slate-100">
                                    <tr v-for="reservation in reservations" :key="reservation.id" class="hover:bg-slate-50 transition-colors">
                                        <td class="px-6 py-4">
                                            <div>
                                                <p class="font-medium text-slate-800">{{ reservation.name }}</p>
                                                <p class="text-sm text-slate-500">{{ reservation.phone }}</p>
                                            </div>
                                        </td>
                                        <td class="px-6 py-4">
                                            <div>
                                                <p class="font-medium text-slate-800">{{ reservation.date }}</p>
                                                <p class="text-sm text-slate-500">{{ reservation.time }} น. • {{ reservation.guests }} คน</p>
                                            </div>
                                        </td>
                                        <td class="px-6 py-4">
                                            <span class="px-3 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium">
                                                โต๊ะ {{ reservation.table }}
                                            </span>
                                        </td>
                                        <td class="px-6 py-4">
                                            <span 
                                                class="px-3 py-1 rounded-full text-xs font-medium"
                                                :class="reservation.status === 'confirmed' 
                                                    ? 'bg-emerald-100 text-emerald-600' 
                                                    : 'bg-yellow-100 text-yellow-600'"
                                            >
                                                {{ reservation.status === 'confirmed' ? 'ยืนยันแล้ว' : 'รอยืนยัน' }}
                                            </span>
                                        </td>
                                        <td class="px-6 py-4 text-right">
                                            <button 
                                                v-if="reservation.status === 'pending'"
                                                @click="confirmReservation(reservation.id)"
                                                class="px-4 py-2 rounded-lg bg-emerald-500 text-white text-sm font-medium hover:bg-emerald-600 transition-colors"
                                            >
                                                ยืนยัน
                                            </button>
                                            <span v-else class="text-slate-400 text-sm">-</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- Orders Tab -->
                <div v-if="activeTab === 'orders'">
                    <h1 class="text-2xl font-bold text-slate-800 mb-6">จัดการออเดอร์</h1>

                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <!-- Pending -->
                        <div>
                            <h3 class="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                <div class="w-3 h-3 rounded-full bg-yellow-500" />
                                <span>รอรับออเดอร์</span>
                                <span class="text-slate-400 text-sm">({{ orders.filter(o => o.status === 'pending').length }})</span>
                            </h3>
                            <div class="space-y-4">
                                <div 
                                    v-for="order in orders.filter(o => o.status === 'pending')"
                                    :key="order.id"
                                    class="bg-white rounded-xl p-4 shadow-sm border-l-4 border-yellow-500"
                                >
                                    <div class="flex items-center justify-between mb-3">
                                        <span class="font-bold text-slate-800">โต๊ะ {{ order.table }}</span>
                                        <span class="text-sm text-slate-500">{{ order.time }}</span>
                                    </div>
                                    <ul class="text-sm text-slate-600 space-y-1 mb-3">
                                        <li v-for="(item, idx) in order.items" :key="idx">• {{ item }}</li>
                                    </ul>
                                    <div class="flex items-center justify-between">
                                        <span class="font-semibold text-slate-800">฿{{ order.total.toLocaleString() }}</span>
                                        <button 
                                            @click="updateOrderStatus(order.id, 'preparing')"
                                            class="px-3 py-1.5 rounded-lg bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition-colors"
                                        >
                                            รับออเดอร์
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Preparing -->
                        <div>
                            <h3 class="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                <div class="w-3 h-3 rounded-full bg-blue-500" />
                                <span>กำลังทำ</span>
                                <span class="text-slate-400 text-sm">({{ orders.filter(o => o.status === 'preparing').length }})</span>
                            </h3>
                            <div class="space-y-4">
                                <div 
                                    v-for="order in orders.filter(o => o.status === 'preparing')"
                                    :key="order.id"
                                    class="bg-white rounded-xl p-4 shadow-sm border-l-4 border-blue-500"
                                >
                                    <div class="flex items-center justify-between mb-3">
                                        <span class="font-bold text-slate-800">โต๊ะ {{ order.table }}</span>
                                        <span class="text-sm text-slate-500">{{ order.time }}</span>
                                    </div>
                                    <ul class="text-sm text-slate-600 space-y-1 mb-3">
                                        <li v-for="(item, idx) in order.items" :key="idx">• {{ item }}</li>
                                    </ul>
                                    <div class="flex items-center justify-between">
                                        <span class="font-semibold text-slate-800">฿{{ order.total.toLocaleString() }}</span>
                                        <button 
                                            @click="updateOrderStatus(order.id, 'served')"
                                            class="px-3 py-1.5 rounded-lg bg-emerald-500 text-white text-sm font-medium hover:bg-emerald-600 transition-colors"
                                        >
                                            เสิร์ฟแล้ว
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Served -->
                        <div>
                            <h3 class="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                <div class="w-3 h-3 rounded-full bg-emerald-500" />
                                <span>เสิร์ฟแล้ว</span>
                                <span class="text-slate-400 text-sm">({{ orders.filter(o => o.status === 'served').length }})</span>
                            </h3>
                            <div class="space-y-4">
                                <div 
                                    v-for="order in orders.filter(o => o.status === 'served')"
                                    :key="order.id"
                                    class="bg-white rounded-xl p-4 shadow-sm border-l-4 border-emerald-500 opacity-60"
                                >
                                    <div class="flex items-center justify-between mb-3">
                                        <span class="font-bold text-slate-800">โต๊ะ {{ order.table }}</span>
                                        <span class="text-sm text-slate-500">{{ order.time }}</span>
                                    </div>
                                    <ul class="text-sm text-slate-600 space-y-1 mb-3">
                                        <li v-for="(item, idx) in order.items" :key="idx">• {{ item }}</li>
                                    </ul>
                                    <div class="flex items-center justify-between">
                                        <span class="font-semibold text-slate-800">฿{{ order.total.toLocaleString() }}</span>
                                        <span class="text-emerald-600 text-sm font-medium">✓ เสร็จสิ้น</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <!-- Edit Modal -->
        <div 
            v-if="showEditModal"
            class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            @click.self="showEditModal = false"
        >
            <div class="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">
                <h3 class="text-xl font-bold text-slate-800 mb-6">แก้ไขเมนู</h3>
                
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-2">ชื่อเมนู</label>
                        <input 
                            v-model="editingItem!.name"
                            type="text"
                            class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                        />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-2">ราคา (บาท)</label>
                        <input 
                            v-model.number="editingItem!.price"
                            type="number"
                            class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                        />
                    </div>
                </div>

                <div class="flex gap-3 mt-6">
                    <button 
                        @click="showEditModal = false"
                        class="flex-1 px-4 py-3 rounded-xl bg-slate-100 text-slate-700 font-medium hover:bg-slate-200 transition-colors"
                    >
                        ยกเลิก
                    </button>
                    <button 
                        @click="saveItem"
                        class="flex-1 px-4 py-3 rounded-xl bg-orange-500 text-white font-medium hover:bg-orange-600 transition-colors"
                    >
                        บันทึก
                    </button>
                </div>
            </div>
        </div>

        <!-- Vibedev Banner -->
        <div class="lg:ml-64 py-6 px-6 bg-gradient-to-r from-indigo-600 to-purple-600">
            <div class="flex flex-col md:flex-row items-center justify-between gap-4">
                <div class="text-center md:text-left">
                    <p class="text-white/80 text-sm">นี่คือ Demo ระบบหลังบ้านจาก</p>
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
    </div>
</template>

<style>
body {
    font-family: 'IBM Plex Sans Thai', sans-serif;
}
</style>
