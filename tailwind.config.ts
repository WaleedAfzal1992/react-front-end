import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                "app-green": "#4CAF50",
                "app-red": "#FF2300",
                "app-yellow": "F77B00",
                "app-grey": "#707070",
                "app-bg-main": "#f2f2f2",
                "app-not-verified": "#e2b203",
            },
        },
    },
    plugins: [],
    safelist: [
        {
            pattern: /bg-(app|red|green|orange)-*/,
        },
        {
            pattern: /text-(app|red|green|orange)-*/,
        },
    ],
};
export default config;
