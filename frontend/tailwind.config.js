/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                "outline-variant": "#c4c7c8",
                "surface-container-high": "#e0e9f2",
                "on-background": "#141d23",
                "surface-container-lowest": "#ffffff",
                "surface": "#f6faff",
                "on-surface-variant": "#444749",
                "on-surface": "#141d23",
                "outline": "#747879",
                "surface-container-low": "#ecf5fe",
                "on-tertiary-container": "#737271",
                "gold-accent": "#A67C00",
                "luxury-charcoal": "#1A1A1A"
            },
            fontFamily: {
                headline: ["Hanken Grotesk", "sans-serif"],
                body: ["Inter", "sans-serif"]
            }
        },
    },
    plugins: [],
}