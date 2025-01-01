import type { Config } from "tailwindcss";

export default <Partial<Config>> {
    theme: {
        fontFamily: {
            sans: ["Inter", "sans-serif"],
        },
        extend: {
            gridTemplateRows: {
                "layout": "auto 1fr auto",
            }
        }
    },
}