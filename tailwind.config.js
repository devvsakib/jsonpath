/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'ai-pink': '#DE6391',
                'ai-orange': '#FF5242',
                'ai-grey': '#818E94',
                'ai-cardOne': '#FBE2E0'
            },
        },
    },
    plugins: [],
}

