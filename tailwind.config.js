/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                // Enterprise AI Color Palette (AI71-inspired)
                enterprise: {
                    // Primary Navy Blues
                    navy: '#0A1628',
                    navyLight: '#0F1D32',
                    navyMid: '#152238',

                    // Accent Blues
                    blue: '#3B82F6',
                    blueLight: '#60A5FA',
                    blueDark: '#2563EB',

                    // Purple Accents
                    purple: '#8B5CF6',
                    purpleLight: '#A78BFA',
                    purpleDark: '#7C3AED',

                    // Gradients will use these
                    gradientStart: '#3B82F6',
                    gradientEnd: '#8B5CF6',

                    // Backgrounds
                    bg: '#F8FAFC',
                    bgAlt: '#F1F5F9',
                    surface: '#FFFFFF',

                    // Text Colors
                    text: '#0F172A',
                    textMuted: '#64748B',
                    textLight: '#94A3B8',

                    // Borders
                    border: '#E2E8F0',
                    borderLight: '#F1F5F9',

                    // Status Colors
                    success: '#10B981',
                    warning: '#F59E0B',
                    danger: '#EF4444',
                    info: '#06B6D4'
                }
            },
            fontFamily: {
                sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
                mono: ['"JetBrains Mono"', 'Fira Code', 'monospace'],
                display: ['Inter', 'system-ui', 'sans-serif'],
            },
            borderRadius: {
                'enterprise': '12px',
                'enterprise-lg': '16px',
                'enterprise-xl': '20px',
                'enterprise-2xl': '24px',
            },
            boxShadow: {
                'enterprise-sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
                'enterprise': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                'enterprise-md': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
                'enterprise-lg': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
                'enterprise-xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
                'enterprise-glow': '0 0 40px rgba(59, 130, 246, 0.15)',
                'enterprise-glow-purple': '0 0 40px rgba(139, 92, 246, 0.15)',
            },
            backgroundImage: {
                'gradient-enterprise': 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
                'gradient-enterprise-dark': 'linear-gradient(135deg, #0A1628 0%, #152238 100%)',
                'gradient-hero': 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(59, 130, 246, 0.15), transparent)',
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'glow': 'glow 2s ease-in-out infinite alternate',
                'slide-up': 'slideUp 0.5s ease-out',
                'fade-in': 'fadeIn 0.5s ease-out',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                glow: {
                    '0%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.2)' },
                    '100%': { boxShadow: '0 0 40px rgba(139, 92, 246, 0.3)' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
            }
        },
    },
    plugins: [],
}
