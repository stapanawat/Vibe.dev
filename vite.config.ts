import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import laravel from 'laravel-vite-plugin';
import { defineConfig, type PluginOption } from 'vite';

export default defineConfig(({ command }) => {
    const plugins: PluginOption[] = [
        laravel({
            input: ['resources/js/app.ts'],
            ssr: 'resources/js/ssr.ts',
            refresh: true,
        }),
        tailwindcss(),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
    ];

    // Only load wayfinder in development (serve) mode, not during build
    // This is because wayfinder requires PHP to generate types
    if (command === 'serve') {
        try {
            const { wayfinder } = require('@laravel/vite-plugin-wayfinder');
            plugins.push(wayfinder({ formVariants: true }));
        } catch (e) {
            console.warn('Wayfinder plugin not loaded:', e);
        }
    }

    return { plugins };
});
