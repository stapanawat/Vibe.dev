<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::get('dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Demo Routes
Route::prefix('demo')->name('demo.')->group(function () {
    Route::get('/restaurant', fn() => Inertia::render('demo/RestaurantDemo'))->name('restaurant');
    Route::get('/reservation', fn() => Inertia::render('demo/ReservationDemo'))->name('reservation');
    Route::get('/ecommerce', fn() => Inertia::render('demo/EcommerceDemo'))->name('ecommerce');
    Route::get('/clinic', fn() => Inertia::render('demo/ClinicDemo'))->name('clinic');
    Route::get('/admin', fn() => Inertia::render('demo/AdminDemo'))->name('admin');
    Route::get('/gaming', fn() => Inertia::render('demo/GamingDemo'))->name('gaming');
});

require __DIR__ . '/settings.php';

