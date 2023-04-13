// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            title: "Charting Library Nuxtjs 3 Demo",
            htmlAttrs: {
                lang: "en",
            },
            meta: [
                { charset: "utf-8" },
                {
                    name: "viewport",
                    content: "width=device-width, initial-scale=1",
                },
                { hid: "description", name: "description", content: "" },
            ],
            link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
            script: [{ src: "/datafeeds/udf/dist/bundle.js" }],
        },
    },
    plugins: [{ src: "~/plugins/TVChart.js", mode: "client" }],
    components: true,
});
