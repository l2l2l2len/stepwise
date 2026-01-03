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
                apple: {
                    blue: '#007AFF',
                    gray: '#8E8E93',
                    lightGray: '#F2F2F7',
                    darkGray: '#1D1D1F',
                    bg: '#FBFBFD',
                    success: '#34C759',
                    warning: '#FF9500',
                    danger: '#FF3B30'
                }
            },
            fontFamily: {
                sans: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Text"', '"SF Pro Display"', '"SF UI Text"', '"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
                mono: ['"JetBrains Mono"', 'monospace'],
            },
            borderRadius: {
                'apple-xl': '20px',
                'apple-2xl': '24px',
                'apple-3xl': '32px',
            },
            boxShadow: {
                'apple-soft': '0 8px 32px rgba(0, 0, 0, 0.04)',
                'apple-deep': '0 12px 48px rgba(0, 0, 0, 0.08)',
            }
        },
    },
    plugins: [],
}
