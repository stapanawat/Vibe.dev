<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3';
import { ref, computed } from 'vue';

// Steps
const currentStep = ref(1);
const steps = [
    { id: 1, name: 'เลือกแผนก', icon: 'building' },
    { id: 2, name: 'เลือกแพทย์', icon: 'user' },
    { id: 3, name: 'เลือกเวลา', icon: 'calendar' },
    { id: 4, name: 'ข้อมูลผู้ป่วย', icon: 'clipboard' },
    { id: 5, name: 'ยืนยัน', icon: 'check' },
];

// Departments
const departments = [
    { id: 'general', name: 'อายุรกรรมทั่วไป', icon: 'heart', color: 'from-blue-500 to-blue-600', desc: 'ตรวจสุขภาพทั่วไป อาการป่วยเบื้องต้น' },
    { id: 'dental', name: 'ทันตกรรม', icon: 'tooth', color: 'from-cyan-500 to-teal-500', desc: 'รักษาฟัน ขูดหินปูน ถอนฟัน' },
    { id: 'eye', name: 'จักษุ', icon: 'eye', color: 'from-purple-500 to-violet-500', desc: 'ตรวจสายตา รักษาโรคตา' },
    { id: 'skin', name: 'ผิวหนัง', icon: 'sparkles', color: 'from-pink-500 to-rose-500', desc: 'รักษาปัญหาผิว สิว ผื่น' },
    { id: 'bone', name: 'กระดูกและข้อ', icon: 'bone', color: 'from-orange-500 to-amber-500', desc: 'รักษาโรคกระดูก ข้อ กล้ามเนื้อ' },
    { id: 'child', name: 'กุมารเวชกรรม', icon: 'child', color: 'from-green-500 to-emerald-500', desc: 'ดูแลสุขภาพเด็ก วัคซีน' },
];

const selectedDepartment = ref<string | null>(null);

// Doctors
const doctors = ref([
    { id: 1, name: 'นพ. สมชาย ใจดี', specialty: 'อายุรกรรมทั่วไป', department: 'general', experience: 15, rating: 4.9, image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200' },
    { id: 2, name: 'พญ. สุภาพร รักษาดี', specialty: 'อายุรกรรมทั่วไป', department: 'general', experience: 10, rating: 4.8, image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200' },
    { id: 3, name: 'ทพ. วิชัย ฟันสวย', specialty: 'ทันตกรรมทั่วไป', department: 'dental', experience: 12, rating: 4.7, image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200' },
    { id: 4, name: 'ทพญ. มาลี ยิ้มใส', specialty: 'ทันตกรรมเด็ก', department: 'dental', experience: 8, rating: 4.9, image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200' },
    { id: 5, name: 'นพ. ประเสริฐ ตาดี', specialty: 'จักษุวิทยา', department: 'eye', experience: 20, rating: 4.9, image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200' },
    { id: 6, name: 'พญ. นิภา ผิวใส', specialty: 'ตจวิทยา', department: 'skin', experience: 7, rating: 4.6, image: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=200' },
    { id: 7, name: 'นพ. กิตติ กระดูกแข็ง', specialty: 'ออร์โธปิดิกส์', department: 'bone', experience: 18, rating: 4.8, image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=200' },
    { id: 8, name: 'พญ. อรุณี เด็กดี', specialty: 'กุมารเวชกรรม', department: 'child', experience: 14, rating: 4.9, image: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=200' },
]);

const selectedDoctor = ref<number | null>(null);

const filteredDoctors = computed(() => {
    if (!selectedDepartment.value) return [];
    return doctors.value.filter(d => d.department === selectedDepartment.value);
});

// Date & Time
const selectedDate = ref('');
const selectedTime = ref('');

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
            isWeekend: date.getDay() === 0 || date.getDay() === 6,
        });
    }
    return dates;
});

const timeSlots = [
    { time: '09:00', period: 'เช้า', available: true },
    { time: '09:30', period: 'เช้า', available: true },
    { time: '10:00', period: 'เช้า', available: false },
    { time: '10:30', period: 'เช้า', available: true },
    { time: '11:00', period: 'เช้า', available: true },
    { time: '11:30', period: 'เช้า', available: true },
    { time: '13:00', period: 'บ่าย', available: true },
    { time: '13:30', period: 'บ่าย', available: false },
    { time: '14:00', period: 'บ่าย', available: true },
    { time: '14:30', period: 'บ่าย', available: true },
    { time: '15:00', period: 'บ่าย', available: true },
    { time: '15:30', period: 'บ่าย', available: false },
    { time: '16:00', period: 'บ่าย', available: true },
];

// Patient Info
const patientInfo = ref({
    name: '',
    phone: '',
    email: '',
    idCard: '',
    birthDate: '',
    symptoms: '',
});

// Booking Complete
const isComplete = ref(false);

// Navigation
const canProceed = computed(() => {
    switch (currentStep.value) {
        case 1: return selectedDepartment.value !== null;
        case 2: return selectedDoctor.value !== null;
        case 3: return selectedDate.value && selectedTime.value;
        case 4: return patientInfo.value.name && patientInfo.value.phone;
        default: return true;
    }
});

const nextStep = () => {
    if (currentStep.value < 5 && canProceed.value) {
        currentStep.value++;
    }
};

const prevStep = () => {
    if (currentStep.value > 1) {
        currentStep.value--;
    }
};

const submitBooking = () => {
    isComplete.value = true;
};

const resetBooking = () => {
    currentStep.value = 1;
    selectedDepartment.value = null;
    selectedDoctor.value = null;
    selectedDate.value = '';
    selectedTime.value = '';
    patientInfo.value = { name: '', phone: '', email: '', idCard: '', birthDate: '', symptoms: '' };
    isComplete.value = false;
};

// Helpers
const selectedDepartmentInfo = computed(() => departments.find(d => d.id === selectedDepartment.value));
const selectedDoctorInfo = computed(() => doctors.value.find(d => d.id === selectedDoctor.value));
const formattedDate = computed(() => {
    if (!selectedDate.value) return '';
    const date = new Date(selectedDate.value);
    return date.toLocaleDateString('th-TH', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
});
</script>

<template>
    <Head title="ระบบนัดหมายคลินิก - VibeDev Clinic">
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
    </Head>

    <div class="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50 font-sans">
        <!-- Header -->
        <header class="bg-white/80 backdrop-blur-xl shadow-sm sticky top-0 z-50 border-b border-teal-100">
            <div class="max-w-5xl mx-auto px-4 py-4">
                <div class="flex items-center justify-between">
                    <Link href="/" class="flex items-center gap-3 group">
                        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-lg group-hover:shadow-teal-500/40 transition-all">
                            <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </div>
                        <div>
                            <h1 class="text-lg font-bold text-slate-800 group-hover:text-teal-600 transition-colors">VibeDev Clinic</h1>
                            <p class="text-xs text-slate-500">นัดพบแพทย์ออนไลน์</p>
                        </div>
                    </Link>
                    <Link 
                        href="/"
                        class="text-sm text-slate-500 hover:text-teal-600 transition-colors flex items-center gap-1"
                    >
                        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        กลับหน้าหลัก
                    </Link>
                </div>
            </div>
        </header>

        <!-- Success Screen -->
        <div v-if="isComplete" class="min-h-[80vh] flex items-center justify-center px-4 py-12">
            <div class="max-w-md w-full text-center">
                <!-- Success Animation -->
                <div class="w-24 h-24 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-teal-500/30 animate-bounce">
                    <svg class="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                
                <h2 class="text-2xl font-bold text-slate-800 mb-2">นัดหมายสำเร็จ!</h2>
                <p class="text-slate-500 mb-8">ระบบบันทึกการนัดหมายเรียบร้อยแล้ว</p>

                <!-- Booking Summary -->
                <div class="bg-white rounded-2xl p-6 shadow-xl text-left mb-6">
                    <h3 class="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                        <svg class="w-5 h-5 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        รายละเอียดการนัดหมาย
                    </h3>
                    <div class="space-y-3">
                        <div class="flex justify-between py-2 border-b border-slate-100">
                            <span class="text-slate-500">หมายเลขนัดหมาย</span>
                            <span class="font-mono font-semibold text-teal-600">#CL{{ Date.now().toString().slice(-6) }}</span>
                        </div>
                        <div class="flex justify-between py-2 border-b border-slate-100">
                            <span class="text-slate-500">แผนก</span>
                            <span class="font-medium">{{ selectedDepartmentInfo?.name }}</span>
                        </div>
                        <div class="flex justify-between py-2 border-b border-slate-100">
                            <span class="text-slate-500">แพทย์</span>
                            <span class="font-medium">{{ selectedDoctorInfo?.name }}</span>
                        </div>
                        <div class="flex justify-between py-2 border-b border-slate-100">
                            <span class="text-slate-500">วันที่</span>
                            <span class="font-medium">{{ formattedDate }}</span>
                        </div>
                        <div class="flex justify-between py-2 border-b border-slate-100">
                            <span class="text-slate-500">เวลา</span>
                            <span class="font-medium">{{ selectedTime }} น.</span>
                        </div>
                        <div class="flex justify-between py-2">
                            <span class="text-slate-500">ผู้ป่วย</span>
                            <span class="font-medium">{{ patientInfo.name }}</span>
                        </div>
                    </div>
                </div>

                <button 
                    @click="resetBooking"
                    class="w-full py-3 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-semibold shadow-lg shadow-teal-500/30 hover:scale-105 transition-all"
                >
                    นัดหมายใหม่
                </button>
            </div>
        </div>

        <!-- Booking Flow -->
        <div v-else class="max-w-5xl mx-auto px-4 py-8">
            <!-- Progress Steps -->
            <div class="mb-8">
                <div class="flex items-center justify-between max-w-2xl mx-auto">
                    <template v-for="(step, index) in steps" :key="step.id">
                        <div class="flex flex-col items-center">
                            <div 
                                class="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all"
                                :class="currentStep >= step.id 
                                    ? 'bg-gradient-to-r from-teal-500 to-cyan-600 text-white shadow-lg shadow-teal-500/30' 
                                    : 'bg-white text-slate-400 border-2 border-slate-200'"
                            >
                                <svg v-if="currentStep > step.id" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                </svg>
                                <span v-else>{{ step.id }}</span>
                            </div>
                            <span class="text-xs text-slate-500 mt-2 hidden sm:block">{{ step.name }}</span>
                        </div>
                        <!-- Connector -->
                        <div 
                            v-if="index < steps.length - 1"
                            class="flex-1 h-1 mx-2 rounded-full transition-all"
                            :class="currentStep > step.id ? 'bg-gradient-to-r from-teal-500 to-cyan-600' : 'bg-slate-200'"
                        />
                    </template>
                </div>
            </div>

            <!-- Step Content -->
            <div class="bg-white rounded-3xl shadow-xl p-6 md:p-8 min-h-[400px]">
                <!-- Step 1: Select Department -->
                <div v-if="currentStep === 1">
                    <h2 class="text-xl font-bold text-slate-800 mb-2">เลือกแผนกที่ต้องการพบแพทย์</h2>
                    <p class="text-slate-500 mb-6">กรุณาเลือกแผนกตามอาการหรือความต้องการของท่าน</p>
                    
                    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <button
                            v-for="dept in departments"
                            :key="dept.id"
                            @click="selectedDepartment = dept.id"
                            class="p-5 rounded-2xl border-2 transition-all text-left group hover:scale-[1.02]"
                            :class="selectedDepartment === dept.id 
                                ? 'border-teal-500 bg-teal-50 shadow-lg' 
                                : 'border-slate-200 hover:border-teal-300 bg-white'"
                        >
                            <div 
                                class="w-12 h-12 rounded-xl bg-gradient-to-r flex items-center justify-center mb-3 shadow-lg"
                                :class="dept.color"
                            >
                                <svg v-if="dept.icon === 'heart'" class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                                <svg v-else-if="dept.icon === 'tooth'" class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C9.51 2 8 3.51 8 6v2c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2V6c0-2.49-1.51-4-4-4zm-2 4c0-1.1.9-2 2-2s2 .9 2 2v2h-4V6z"/>
                                </svg>
                                <svg v-else-if="dept.icon === 'eye'" class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                <svg v-else-if="dept.icon === 'sparkles'" class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                </svg>
                                <svg v-else-if="dept.icon === 'bone'" class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 4a2 2 0 012-2 2 2 0 012 2v1h-4V4zm8 0a2 2 0 012-2 2 2 0 012 2v1h-4V4zM8 19a2 2 0 01-2 2 2 2 0 01-2-2v-1h4v1zm8 0a2 2 0 012 2 2 2 0 012-2v-1h-4v1zM4 8v8h4v-8H4zm12 0v8h4v-8h-4z"/>
                                </svg>
                                <svg v-else class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                </svg>
                            </div>
                            <h3 class="font-semibold text-slate-800 mb-1">{{ dept.name }}</h3>
                            <p class="text-sm text-slate-500">{{ dept.desc }}</p>
                        </button>
                    </div>
                </div>

                <!-- Step 2: Select Doctor -->
                <div v-if="currentStep === 2">
                    <h2 class="text-xl font-bold text-slate-800 mb-2">เลือกแพทย์</h2>
                    <p class="text-slate-500 mb-6">แผนก: {{ selectedDepartmentInfo?.name }}</p>
                    
                    <div class="grid md:grid-cols-2 gap-4">
                        <button
                            v-for="doctor in filteredDoctors"
                            :key="doctor.id"
                            @click="selectedDoctor = doctor.id"
                            class="p-4 rounded-2xl border-2 transition-all text-left flex gap-4 hover:scale-[1.02]"
                            :class="selectedDoctor === doctor.id 
                                ? 'border-teal-500 bg-teal-50 shadow-lg' 
                                : 'border-slate-200 hover:border-teal-300 bg-white'"
                        >
                            <img 
                                :src="doctor.image" 
                                :alt="doctor.name"
                                class="w-20 h-20 rounded-xl object-cover"
                            />
                            <div class="flex-1">
                                <h3 class="font-semibold text-slate-800">{{ doctor.name }}</h3>
                                <p class="text-sm text-slate-500 mb-2">{{ doctor.specialty }}</p>
                                <div class="flex items-center gap-3 text-xs">
                                    <span class="flex items-center gap-1 text-yellow-500">
                                        <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                        </svg>
                                        {{ doctor.rating }}
                                    </span>
                                    <span class="text-slate-400">{{ doctor.experience }} ปี</span>
                                </div>
                            </div>
                        </button>
                    </div>
                </div>

                <!-- Step 3: Select Date & Time -->
                <div v-if="currentStep === 3">
                    <h2 class="text-xl font-bold text-slate-800 mb-2">เลือกวันและเวลา</h2>
                    <p class="text-slate-500 mb-6">แพทย์: {{ selectedDoctorInfo?.name }}</p>
                    
                    <!-- Date Selection -->
                    <h3 class="font-medium text-slate-700 mb-3">เลือกวันที่</h3>
                    <div class="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
                        <button
                            v-for="date in availableDates"
                            :key="date.value"
                            @click="selectedDate = date.value"
                            class="flex-shrink-0 w-16 py-3 rounded-xl border-2 transition-all text-center"
                            :class="[
                                selectedDate === date.value 
                                    ? 'border-teal-500 bg-teal-50' 
                                    : 'border-slate-200 hover:border-teal-300',
                                date.isWeekend ? 'text-red-500' : ''
                            ]"
                        >
                            <div class="text-xs text-slate-500">{{ date.day }}</div>
                            <div class="text-lg font-bold">{{ date.date }}</div>
                            <div class="text-xs text-slate-500">{{ date.month }}</div>
                        </button>
                    </div>

                    <!-- Time Selection -->
                    <h3 class="font-medium text-slate-700 mb-3">เลือกเวลา</h3>
                    <div class="grid grid-cols-4 md:grid-cols-6 gap-2">
                        <button
                            v-for="slot in timeSlots"
                            :key="slot.time"
                            @click="slot.available && (selectedTime = slot.time)"
                            class="py-3 rounded-xl border-2 transition-all text-center font-medium"
                            :class="[
                                !slot.available 
                                    ? 'border-slate-100 bg-slate-50 text-slate-300 cursor-not-allowed' 
                                    : selectedTime === slot.time 
                                        ? 'border-teal-500 bg-teal-50 text-teal-600' 
                                        : 'border-slate-200 hover:border-teal-300 text-slate-700'
                            ]"
                        >
                            {{ slot.time }}
                        </button>
                    </div>
                </div>

                <!-- Step 4: Patient Info -->
                <div v-if="currentStep === 4">
                    <h2 class="text-xl font-bold text-slate-800 mb-2">ข้อมูลผู้ป่วย</h2>
                    <p class="text-slate-500 mb-6">กรุณากรอกข้อมูลให้ครบถ้วน</p>
                    
                    <div class="grid md:grid-cols-2 gap-4 max-w-2xl">
                        <div>
                            <label class="block text-sm font-medium text-slate-700 mb-1">ชื่อ-นามสกุล *</label>
                            <input 
                                v-model="patientInfo.name"
                                type="text" 
                                class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition-all"
                                placeholder="ระบุชื่อ-นามสกุล"
                            />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-slate-700 mb-1">เบอร์โทรศัพท์ *</label>
                            <input 
                                v-model="patientInfo.phone"
                                type="tel" 
                                class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition-all"
                                placeholder="0xx-xxx-xxxx"
                            />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-slate-700 mb-1">อีเมล</label>
                            <input 
                                v-model="patientInfo.email"
                                type="email" 
                                class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition-all"
                                placeholder="email@example.com"
                            />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-slate-700 mb-1">เลขบัตรประชาชน</label>
                            <input 
                                v-model="patientInfo.idCard"
                                type="text" 
                                class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition-all"
                                placeholder="x-xxxx-xxxxx-xx-x"
                            />
                        </div>
                        <div class="md:col-span-2">
                            <label class="block text-sm font-medium text-slate-700 mb-1">อาการเบื้องต้น</label>
                            <textarea 
                                v-model="patientInfo.symptoms"
                                rows="3"
                                class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition-all resize-none"
                                placeholder="อธิบายอาการหรือเหตุผลที่ต้องการพบแพทย์"
                            />
                        </div>
                    </div>
                </div>

                <!-- Step 5: Confirmation -->
                <div v-if="currentStep === 5">
                    <h2 class="text-xl font-bold text-slate-800 mb-2">ยืนยันการนัดหมาย</h2>
                    <p class="text-slate-500 mb-6">กรุณาตรวจสอบข้อมูลให้ถูกต้องก่อนยืนยัน</p>
                    
                    <div class="max-w-xl">
                        <div class="bg-teal-50 rounded-2xl p-6 mb-6">
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <span class="text-sm text-slate-500">แผนก</span>
                                    <p class="font-semibold text-slate-800">{{ selectedDepartmentInfo?.name }}</p>
                                </div>
                                <div>
                                    <span class="text-sm text-slate-500">แพทย์</span>
                                    <p class="font-semibold text-slate-800">{{ selectedDoctorInfo?.name }}</p>
                                </div>
                                <div>
                                    <span class="text-sm text-slate-500">วันที่</span>
                                    <p class="font-semibold text-slate-800">{{ formattedDate }}</p>
                                </div>
                                <div>
                                    <span class="text-sm text-slate-500">เวลา</span>
                                    <p class="font-semibold text-slate-800">{{ selectedTime }} น.</p>
                                </div>
                                <div class="col-span-2 pt-4 border-t border-teal-200">
                                    <span class="text-sm text-slate-500">ผู้ป่วย</span>
                                    <p class="font-semibold text-slate-800">{{ patientInfo.name }}</p>
                                    <p class="text-sm text-slate-500">{{ patientInfo.phone }}</p>
                                </div>
                            </div>
                        </div>

                        <div class="bg-amber-50 rounded-xl p-4 flex gap-3 mb-6">
                            <svg class="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                            </svg>
                            <div>
                                <p class="text-sm text-amber-800 font-medium">กรุณามาก่อนเวลานัด 15 นาที</p>
                                <p class="text-xs text-amber-600">เตรียมบัตรประชาชนและบัตรประกันสุขภาพ (ถ้ามี)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Navigation Buttons -->
            <div class="mt-6 flex justify-between">
                <button
                    v-if="currentStep > 1"
                    @click="prevStep"
                    class="px-6 py-3 rounded-xl border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-all flex items-center gap-2"
                >
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    ย้อนกลับ
                </button>
                <div v-else></div>

                <button
                    v-if="currentStep < 5"
                    @click="nextStep"
                    :disabled="!canProceed"
                    class="px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    :class="canProceed 
                        ? 'bg-gradient-to-r from-teal-500 to-cyan-600 text-white shadow-lg shadow-teal-500/30 hover:scale-105' 
                        : 'bg-slate-200 text-slate-400'"
                >
                    ถัดไป
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
                <button
                    v-else
                    @click="submitBooking"
                    class="px-8 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold shadow-lg shadow-green-500/30 hover:scale-105 transition-all flex items-center gap-2"
                >
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    ยืนยันการนัดหมาย
                </button>
            </div>
        </div>

        <!-- Vibedev Banner -->
        <section class="py-8 bg-gradient-to-r from-teal-600 to-cyan-600 mt-8">
            <div class="max-w-5xl mx-auto px-4">
                <div class="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div class="text-center md:text-left">
                        <p class="text-white/80 text-sm">นี่คือตัวอย่างจาก</p>
                        <p class="text-white font-bold text-xl">Vibedev - ระบบนัดหมายคลินิกออนไลน์</p>
                    </div>
                    <Link 
                        href="/"
                        class="px-6 py-3 rounded-xl bg-white text-teal-600 font-semibold hover:bg-teal-50 transition-colors"
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
</style>
