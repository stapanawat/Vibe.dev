<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3';
import { ref, computed } from 'vue';

// States
const currentStep = ref(1);
const selectedDate = ref('');
const selectedTime = ref('');
const selectedGuests = ref(2);
const selectedTable = ref<number | null>(null);
const customerInfo = ref({
    name: '',
    phone: '',
    email: '',
    note: '',
});
const isSubmitting = ref(false);
const isComplete = ref(false);

// Generate available dates (next 14 days)
const availableDates = computed(() => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        dates.push({
            value: date.toISOString().split('T')[0],
            day: date.toLocaleDateString('th-TH', { weekday: 'short' }),
            date: date.getDate(),
            month: date.toLocaleDateString('th-TH', { month: 'short' }),
        });
    }
    return dates;
});

// Available time slots
const timeSlots = [
    { time: '11:00', available: true },
    { time: '11:30', available: true },
    { time: '12:00', available: false },
    { time: '12:30', available: true },
    { time: '13:00', available: true },
    { time: '17:00', available: true },
    { time: '17:30', available: true },
    { time: '18:00', available: false },
    { time: '18:30', available: false },
    { time: '19:00', available: true },
    { time: '19:30', available: true },
    { time: '20:00', available: true },
    { time: '20:30', available: true },
    { time: '21:00', available: true },
];

// Tables layout
const tables = ref([
    { id: 1, seats: 2, position: { x: 10, y: 20 }, shape: 'circle', available: true },
    { id: 2, seats: 2, position: { x: 30, y: 20 }, shape: 'circle', available: false },
    { id: 3, seats: 4, position: { x: 50, y: 15 }, shape: 'rect', available: true },
    { id: 4, seats: 4, position: { x: 75, y: 15 }, shape: 'rect', available: true },
    { id: 5, seats: 6, position: { x: 10, y: 50 }, shape: 'rect', available: true },
    { id: 6, seats: 6, position: { x: 40, y: 50 }, shape: 'rect', available: false },
    { id: 7, seats: 8, position: { x: 70, y: 50 }, shape: 'rect', available: true },
    { id: 8, seats: 2, position: { x: 10, y: 80 }, shape: 'circle', available: true },
    { id: 9, seats: 4, position: { x: 30, y: 80 }, shape: 'rect', available: true },
    { id: 10, seats: 4, position: { x: 55, y: 80 }, shape: 'rect', available: true },
]);

const availableTables = computed(() => {
    return tables.value.filter(t => t.available && t.seats >= selectedGuests.value);
});

// Steps
const steps = [
    { id: 1, name: 'เลือกวันเวลา', iconType: 'calendar' },
    { id: 2, name: 'เลือกโต๊ะ', iconType: 'table' },
    { id: 3, name: 'ข้อมูลผู้จอง', iconType: 'user' },
    { id: 4, name: 'ยืนยัน', iconType: 'check' },
];

// Navigation
const canProceed = computed(() => {
    switch (currentStep.value) {
        case 1:
            return selectedDate.value && selectedTime.value && selectedGuests.value > 0;
        case 2:
            return selectedTable.value !== null;
        case 3:
            return customerInfo.value.name && customerInfo.value.phone;
        default:
            return true;
    }
});

const nextStep = () => {
    if (canProceed.value && currentStep.value < 4) {
        currentStep.value++;
    }
};

const prevStep = () => {
    if (currentStep.value > 1) {
        currentStep.value--;
    }
};

const submitReservation = async () => {
    isSubmitting.value = true;
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    isSubmitting.value = false;
    isComplete.value = true;
};

// Format selected date
const formattedDate = computed(() => {
    if (!selectedDate.value) return '';
    const date = new Date(selectedDate.value);
    return date.toLocaleDateString('th-TH', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
});

const selectedTableInfo = computed(() => {
    return tables.value.find(t => t.id === selectedTable.value);
});
</script>

<template>
    <Head title="จองโต๊ะ - ครัวคุณแม่">
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
    </Head>

    <div class="min-h-screen bg-gradient-to-br from-stone-50 to-orange-50 font-sans">
        <!-- Header -->
        <header class="bg-white shadow-sm sticky top-0 z-50">
            <div class="max-w-4xl mx-auto px-4 py-4">
                <div class="flex items-center justify-between">
                    <Link href="/demo/restaurant" class="flex items-center gap-3 group">
                        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg shadow-orange-500/30 group-hover:scale-105 transition-transform">
                            <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <div>
                            <h1 class="text-lg font-bold text-stone-800">ครัวคุณแม่</h1>
                            <p class="text-xs text-stone-500">Khun Mae Kitchen</p>
                        </div>
                    </Link>
                    <Link 
                        href="/demo/restaurant"
                        class="text-sm text-stone-500 hover:text-orange-600 transition-colors flex items-center gap-1"
                    >
                        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        กลับหน้าร้าน
                    </Link>
                </div>
            </div>
        </header>

        <!-- Success Screen -->
        <div v-if="isComplete" class="min-h-[80vh] flex items-center justify-center px-4">
            <div class="max-w-md w-full text-center">
                <!-- Success Animation -->
                <div class="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-emerald-500/30 animate-bounce">
                    <svg class="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                    </svg>
                </div>

                <h1 class="text-3xl font-bold text-stone-800 mb-4">จองโต๊ะสำเร็จ!</h1>
                <p class="text-stone-500 mb-8">
                    ขอบคุณที่จองโต๊ะกับเรา เราจะส่ง SMS ยืนยันไปที่เบอร์โทรของคุณ
                </p>

                <!-- Reservation Summary -->
                <div class="bg-white rounded-2xl p-6 shadow-lg mb-8 text-left">
                    <h3 class="font-semibold text-stone-800 mb-4 flex items-center gap-2">
                        <svg class="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                        </svg>
                        <span>รายละเอียดการจอง</span>
                    </h3>
                    <div class="space-y-3 text-sm">
                        <div class="flex justify-between">
                            <span class="text-stone-500">วันที่</span>
                            <span class="font-medium text-stone-800">{{ formattedDate }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-stone-500">เวลา</span>
                            <span class="font-medium text-stone-800">{{ selectedTime }} น.</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-stone-500">จำนวนคน</span>
                            <span class="font-medium text-stone-800">{{ selectedGuests }} ท่าน</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-stone-500">โต๊ะ</span>
                            <span class="font-medium text-stone-800">โต๊ะ {{ selectedTable }} ({{ selectedTableInfo?.seats }} ที่นั่ง)</span>
                        </div>
                        <div class="border-t border-stone-100 pt-3 mt-3">
                            <div class="flex justify-between">
                                <span class="text-stone-500">ชื่อ</span>
                                <span class="font-medium text-stone-800">{{ customerInfo.name }}</span>
                            </div>
                            <div class="flex justify-between mt-2">
                                <span class="text-stone-500">เบอร์โทร</span>
                                <span class="font-medium text-stone-800">{{ customerInfo.phone }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex gap-4">
                    <Link 
                        href="/demo/restaurant"
                        class="flex-1 px-6 py-3 rounded-xl bg-stone-100 text-stone-700 font-semibold hover:bg-stone-200 transition-colors"
                    >
                        กลับหน้าร้าน
                    </Link>
                    <Link 
                        href="/"
                        class="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all"
                    >
                        ดู Vibedev
                    </Link>
                </div>
            </div>
        </div>

        <!-- Booking Flow -->
        <main v-else class="max-w-4xl mx-auto px-4 py-8">
            <!-- Page Title -->
            <div class="text-center mb-8">
                <h1 class="text-2xl md:text-3xl font-bold text-stone-800 mb-2">จองโต๊ะออนไลน์</h1>
                <p class="text-stone-500">เลือกวันเวลาและโต๊ะที่ต้องการได้เลย</p>
            </div>

            <!-- Progress Steps -->
            <div class="flex justify-between mb-12 relative">
                <!-- Progress Line -->
                <div class="absolute top-6 left-0 right-0 h-0.5 bg-stone-200">
                    <div 
                        class="h-full bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-500"
                        :style="{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }"
                    />
                </div>

                <!-- Steps -->
                <div 
                    v-for="step in steps"
                    :key="step.id"
                    class="relative flex flex-col items-center"
                >
                    <div 
                        class="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 z-10"
                        :class="currentStep >= step.id 
                            ? 'bg-gradient-to-br from-orange-500 to-red-600 text-white shadow-lg shadow-orange-500/30' 
                            : 'bg-white border-2 border-stone-200 text-stone-400'"
                    >
                        <svg v-if="step.iconType === 'calendar'" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <svg v-else-if="step.iconType === 'table'" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                        </svg>
                        <svg v-else-if="step.iconType === 'user'" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <svg v-else-if="step.iconType === 'check'" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <span 
                        class="mt-2 text-xs font-medium hidden sm:block"
                        :class="currentStep >= step.id ? 'text-orange-600' : 'text-stone-400'"
                    >
                        {{ step.name }}
                    </span>
                </div>
            </div>

            <!-- Step Content -->
            <div class="bg-white rounded-3xl shadow-xl p-6 md:p-8 mb-8">
                <!-- Step 1: Date & Time -->
                <div v-if="currentStep === 1">
                    <h2 class="text-xl font-bold text-stone-800 mb-6 flex items-center gap-2">
                        <svg class="w-6 h-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>เลือกวันและเวลา</span>
                    </h2>

                    <!-- Guests Selector -->
                    <div class="mb-8">
                        <label class="block text-sm font-medium text-stone-700 mb-3">จำนวนผู้ใช้บริการ</label>
                        <div class="flex items-center gap-4">
                            <button 
                                @click="selectedGuests = Math.max(1, selectedGuests - 1)"
                                class="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center hover:bg-stone-200 transition-colors"
                            >
                                <svg class="w-5 h-5 text-stone-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                                </svg>
                            </button>
                            <div class="text-3xl font-bold text-stone-800">
                                {{ selectedGuests }}
                            </div>
                            <button 
                                @click="selectedGuests = Math.min(20, selectedGuests + 1)"
                                class="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center hover:bg-stone-200 transition-colors"
                            >
                                <svg class="w-5 h-5 text-stone-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                                </svg>
                            </button>
                            <span class="text-stone-500">ท่าน</span>
                        </div>
                    </div>

                    <!-- Date Selector -->
                    <div class="mb-8">
                        <label class="block text-sm font-medium text-stone-700 mb-3">เลือกวัน</label>
                        <div class="flex gap-3 overflow-x-auto pb-4 -mx-2 px-2">
                            <button 
                                v-for="date in availableDates"
                                :key="date.value"
                                @click="selectedDate = date.value"
                                class="flex-shrink-0 w-20 py-4 rounded-2xl text-center transition-all duration-300"
                                :class="selectedDate === date.value 
                                    ? 'bg-gradient-to-br from-orange-500 to-red-600 text-white shadow-lg shadow-orange-500/30' 
                                    : 'bg-stone-50 text-stone-600 hover:bg-orange-50'"
                            >
                                <div class="text-xs uppercase opacity-70">{{ date.day }}</div>
                                <div class="text-2xl font-bold">{{ date.date }}</div>
                                <div class="text-xs">{{ date.month }}</div>
                            </button>
                        </div>
                    </div>

                    <!-- Time Selector -->
                    <div>
                        <label class="block text-sm font-medium text-stone-700 mb-3">เลือกเวลา</label>
                        <div class="grid grid-cols-4 sm:grid-cols-7 gap-2">
                            <button 
                                v-for="slot in timeSlots"
                                :key="slot.time"
                                @click="slot.available && (selectedTime = slot.time)"
                                :disabled="!slot.available"
                                class="py-3 rounded-xl text-sm font-medium transition-all duration-300"
                                :class="[
                                    !slot.available 
                                        ? 'bg-stone-100 text-stone-300 cursor-not-allowed line-through' 
                                        : selectedTime === slot.time 
                                            ? 'bg-gradient-to-br from-orange-500 to-red-600 text-white shadow-lg shadow-orange-500/30' 
                                            : 'bg-stone-50 text-stone-600 hover:bg-orange-50'
                                ]"
                            >
                                {{ slot.time }}
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Step 2: Table Selection -->
                <div v-if="currentStep === 2">
                    <h2 class="text-xl font-bold text-stone-800 mb-6 flex items-center gap-2">
                        <svg class="w-6 h-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                        </svg>
                        <span>เลือกโต๊ะ</span>
                    </h2>

                    <!-- Legend -->
                    <div class="flex flex-wrap gap-4 mb-6 text-sm">
                        <div class="flex items-center gap-2">
                            <div class="w-4 h-4 rounded bg-emerald-500" />
                            <span class="text-stone-600">ว่าง</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <div class="w-4 h-4 rounded bg-stone-300" />
                            <span class="text-stone-600">ไม่ว่าง</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <div class="w-4 h-4 rounded bg-orange-500" />
                            <span class="text-stone-600">เลือกแล้ว</span>
                        </div>
                    </div>

                    <!-- Floor Plan -->
                    <div class="relative bg-stone-50 rounded-2xl p-4 sm:p-6 aspect-[4/3] sm:aspect-video overflow-hidden min-h-[280px]">
                        <!-- Kitchen Icon -->
                        <div class="absolute top-2 right-2 px-3 py-1.5 bg-stone-200 text-stone-600 text-xs font-medium rounded-lg flex items-center gap-1">
                            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
                            </svg>
                            <span>ครัว</span>
                        </div>
                        
                        <!-- Entrance -->
                        <div class="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-stone-200 text-stone-600 text-xs font-medium rounded-lg flex items-center gap-1">
                            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                            </svg>
                            <span>ทางเข้า</span>
                        </div>

                        <!-- Tables -->
                        <button 
                            v-for="table in tables"
                            :key="table.id"
                            @click="table.available && (selectedTable = table.id)"
                            :disabled="!table.available || table.seats < selectedGuests"
                            class="absolute transition-all duration-300 flex flex-col items-center justify-center cursor-pointer hover:scale-110"
                            :class="[
                                table.shape === 'circle' ? 'rounded-full w-10 h-10 sm:w-14 sm:h-14' : 'rounded-xl w-14 h-10 sm:w-20 sm:h-14',
                                !table.available || table.seats < selectedGuests
                                    ? 'bg-stone-300 cursor-not-allowed' 
                                    : selectedTable === table.id 
                                        ? 'bg-orange-500 shadow-lg shadow-orange-500/50 ring-2 sm:ring-4 ring-orange-300' 
                                        : 'bg-emerald-500 hover:bg-emerald-400 shadow-md'
                            ]"
                            :style="{ left: `${table.position.x}%`, top: `${table.position.y}%` }"
                        >
                            <span class="text-white text-xs font-bold">{{ table.id }}</span>
                            <span class="text-white/80 text-[10px]">{{ table.seats }}p</span>
                        </button>
                    </div>

                    <!-- Selected Table Info -->
                    <div v-if="selectedTable" class="mt-6 p-4 bg-orange-50 rounded-xl border border-orange-200">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="font-semibold text-stone-800">โต๊ะ {{ selectedTable }}</p>
                                <p class="text-sm text-stone-500">{{ selectedTableInfo?.seats }} ที่นั่ง</p>
                            </div>
                            <svg class="w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <!-- Step 3: Customer Info -->
                <div v-if="currentStep === 3">
                    <h2 class="text-xl font-bold text-stone-800 mb-6 flex items-center gap-2">
                        <svg class="w-6 h-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>ข้อมูลผู้จอง</span>
                    </h2>

                    <div class="space-y-6">
                        <!-- Name -->
                        <div>
                            <label class="block text-sm font-medium text-stone-700 mb-2">ชื่อ-นามสกุล *</label>
                            <input 
                                v-model="customerInfo.name"
                                type="text"
                                placeholder="กรอกชื่อ-นามสกุล"
                                class="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                            />
                        </div>

                        <!-- Phone -->
                        <div>
                            <label class="block text-sm font-medium text-stone-700 mb-2">เบอร์โทรศัพท์ *</label>
                            <input 
                                v-model="customerInfo.phone"
                                type="tel"
                                placeholder="0XX-XXX-XXXX"
                                class="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                            />
                        </div>

                        <!-- Email -->
                        <div>
                            <label class="block text-sm font-medium text-stone-700 mb-2">อีเมล (ไม่บังคับ)</label>
                            <input 
                                v-model="customerInfo.email"
                                type="email"
                                placeholder="email@example.com"
                                class="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                            />
                        </div>

                        <!-- Note -->
                        <div>
                            <label class="block text-sm font-medium text-stone-700 mb-2">หมายเหตุเพิ่มเติม</label>
                            <textarea 
                                v-model="customerInfo.note"
                                rows="3"
                                placeholder="เช่น มีเด็กเล็ก, ต้องการโต๊ะริมหน้าต่าง, แพ้อาหาร ฯลฯ"
                                class="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all resize-none"
                            />
                        </div>
                    </div>
                </div>

                <!-- Step 4: Confirmation -->
                <div v-if="currentStep === 4">
                    <h2 class="text-xl font-bold text-stone-800 mb-6 flex items-center gap-2">
                        <svg class="w-6 h-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>ยืนยันการจอง</span>
                    </h2>

                    <!-- Summary -->
                    <div class="bg-stone-50 rounded-2xl p-6 space-y-4 mb-6">
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                                <svg class="w-6 h-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <p class="text-sm text-stone-500">วันที่</p>
                                <p class="font-semibold text-stone-800">{{ formattedDate }}</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                                <svg class="w-6 h-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <p class="text-sm text-stone-500">เวลา</p>
                                <p class="font-semibold text-stone-800">{{ selectedTime }} น.</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                                <svg class="w-6 h-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <div>
                                <p class="text-sm text-stone-500">จำนวนคน</p>
                                <p class="font-semibold text-stone-800">{{ selectedGuests }} ท่าน</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                                <svg class="w-6 h-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                </svg>
                            </div>
                            <div>
                                <p class="text-sm text-stone-500">โต๊ะ</p>
                                <p class="font-semibold text-stone-800">โต๊ะ {{ selectedTable }} ({{ selectedTableInfo?.seats }} ที่นั่ง)</p>
                            </div>
                        </div>
                        <hr class="border-stone-200" />
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                                <svg class="w-6 h-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <div>
                                <p class="text-sm text-stone-500">ผู้จอง</p>
                                <p class="font-semibold text-stone-800">{{ customerInfo.name }}</p>
                                <p class="text-sm text-stone-500">{{ customerInfo.phone }}</p>
                            </div>
                        </div>
                        <div v-if="customerInfo.note" class="flex items-start gap-4">
                            <div class="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                                <svg class="w-6 h-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            </div>
                            <div>
                                <p class="text-sm text-stone-500">หมายเหตุ</p>
                                <p class="font-semibold text-stone-800">{{ customerInfo.note }}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Terms -->
                    <div class="bg-orange-50 rounded-xl p-4 text-sm text-stone-600 mb-6">
                        <p class="font-medium text-stone-800 mb-2 flex items-center gap-1">
                            <svg class="w-4 h-4 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            เงื่อนไขการจอง
                        </p>
                        <ul class="space-y-1 list-disc list-inside">
                            <li>กรุณามาถึงก่อนเวลาจอง 10 นาที</li>
                            <li>โต๊ะจะถูกยกเลิกหากมาช้าเกิน 15 นาที</li>
                            <li>หากต้องการยกเลิก กรุณาแจ้งล่วงหน้าอย่างน้อย 2 ชั่วโมง</li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Navigation Buttons -->
            <div class="flex gap-4">
                <button 
                    v-if="currentStep > 1"
                    @click="prevStep"
                    class="px-6 py-3 rounded-xl bg-stone-100 text-stone-700 font-semibold hover:bg-stone-200 transition-colors flex items-center gap-2"
                >
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    ย้อนกลับ
                </button>
                
                <button 
                    v-if="currentStep < 4"
                    @click="nextStep"
                    :disabled="!canProceed"
                    class="flex-1 px-6 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
                    :class="canProceed 
                        ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50' 
                        : 'bg-stone-200 text-stone-400 cursor-not-allowed'"
                >
                    ถัดไป
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                </button>

                <button 
                    v-if="currentStep === 4"
                    @click="submitReservation"
                    :disabled="isSubmitting"
                    class="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all flex items-center justify-center gap-2"
                >
                    <svg v-if="isSubmitting" class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>{{ isSubmitting ? 'กำลังจอง...' : 'ยืนยันการจอง' }}</span>
                </button>
            </div>
        </main>

        <!-- Vibedev Banner -->
        <section class="py-8 bg-gradient-to-r from-indigo-600 to-purple-600 mt-8">
            <div class="max-w-4xl mx-auto px-4">
                <div class="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div class="text-center md:text-left">
                        <p class="text-white/80 text-sm">นี่คือ Demo ระบบจองโต๊ะจาก</p>
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
    </div>
</template>

<style>
body {
    font-family: 'IBM Plex Sans Thai', sans-serif;
}
</style>
