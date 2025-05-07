import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#e3b873",     // Золотистый акцент
                dark: "#0f0f0f",        // Тёмный фон
                light: "#f5f5f5",       // Светлый фон
            },
        },
    },
    plugins: [],
};

export default config;
