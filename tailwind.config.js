/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            borderRadius: {
                half: "calc(0.5rem - 2px)"
            },
            backgroundColor: {
                'darkBg': '#161B21',
                'darkSecondary': '#191e3a',
                'darkTertiary': '#0077E4',
                'darkGray600': '#7D8FA9',
                'darkInput': '#384250',
                'darkProgress': '#2CDAE6',
            },
            colors: {
                'darkBorder': '#1b2e4b',
                'darkInputValue': '#BAC4D1',
                'darkText': '#BAC4D1',
                'ai-pink': '#DE6391',
                'ai-orange': '#FF5242',
                'ai-grey': '#818E94',
                'ai-cardOne': '#FBE2E0'
            },
            width: {
                '700': '700px'
            }
        },
    },
    plugins: [],
}

