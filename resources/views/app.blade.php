<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    {{-- Inline script to detect system dark mode preference and apply it immediately --}}
    <script>
        (function () {
            const appearance = '{{ $appearance ?? "system" }}';

            if (appearance === 'system') {
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                if (prefersDark) {
                    document.documentElement.classList.add('dark');
                }
            }
        })();
    </script>

    {{-- Inline style to set the HTML background color based on our theme in app.css --}}
    <style>
        html {
            background-color: oklch(1 0 0);
        }

        html.dark {
            background-color: oklch(0.145 0 0);
        }

        /* Loading Screen Styles */
        #app-loader {
            position: fixed;
            inset: 0;
            z-index: 9999;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            /* Glassmorphism / Frosted Glass Effect */
            background: rgba(15, 23, 42, 0.6);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            transition: opacity 0.5s ease-out, visibility 0.5s ease-out;
        }

        #app-loader.hidden {
            opacity: 0;
            visibility: hidden;
        }

        .loader-logo {
            width: 120px;
            height: 120px;
            border-radius: 24px;
            overflow: hidden;
            box-shadow: 0 0 60px rgba(99, 102, 241, 0.4);
            animation: pulse-glow 2s ease-in-out infinite;
        }

        .loader-logo img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .loader-text {
            margin-top: 24px;
            font-size: 24px;
            font-weight: 700;
            background: linear-gradient(90deg, #fff 0%, #c7d2fe 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            font-family: 'Space Grotesk', system-ui, sans-serif;
        }

        .loader-spinner {
            margin-top: 32px;
            width: 40px;
            height: 40px;
            border: 3px solid rgba(99, 102, 241, 0.2);
            border-top-color: #6366f1;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }

        .loader-dots {
            margin-top: 16px;
            display: flex;
            gap: 8px;
        }

        .loader-dots span {
            width: 8px;
            height: 8px;
            background: #6366f1;
            border-radius: 50%;
            animation: bounce 1.4s ease-in-out infinite;
        }

        .loader-dots span:nth-child(1) {
            animation-delay: 0s;
        }

        .loader-dots span:nth-child(2) {
            animation-delay: 0.2s;
        }

        .loader-dots span:nth-child(3) {
            animation-delay: 0.4s;
        }

        @keyframes pulse-glow {

            0%,
            100% {
                box-shadow: 0 0 40px rgba(99, 102, 241, 0.3);
                transform: scale(1);
            }

            50% {
                box-shadow: 0 0 80px rgba(99, 102, 241, 0.6);
                transform: scale(1.05);
            }
        }

        @keyframes spin {
            to {
                transform: rotate(360deg);
            }
        }

        @keyframes bounce {

            0%,
            80%,
            100% {
                transform: scale(0.6);
                opacity: 0.5;
            }

            40% {
                transform: scale(1);
                opacity: 1;
            }
        }
    </style>

    <title inertia>{{ config('app.name', 'Laravel') }}</title>

    <link rel="icon" href="/favicon.ico" sizes="any">
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">

    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

    @vite(['resources/js/app.ts', "resources/js/pages/{$page['component']}.vue"])
    @inertiaHead
</head>

<body class="font-sans antialiased">
    <!-- Loading Screen -->
    <div id="app-loader">
        <div class="loader-logo">
            <img src="/images/vibedev-logo.png" alt="Vibedev Logo" />
        </div>
        <div class="loader-text">Vibedev</div>
        <div class="loader-dots">
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>

    @inertia

    <script>
        // Hide loader when page is ready
        window.addEventListener('load', function () { 
            setTimeout(function ()  {
                const loader = document.getElementById('app-loader');
                if (loader) {
                    loader.classList.add('hidden');
                    // Remove from DOM after animation
                    setTimeout(function ()  {
                        loader.remove();
                    }, 500);
                }
            }, 800); // Minimum display time for better UX
        });
    </script>
</body>

</html>