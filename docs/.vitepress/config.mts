import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  outDir: "./dist",
  base: "/simple-ui/",
  title: "Simple UI",
  head: [["link", { rel: "icon", href: "favicon.ico" }]],
  description: "A simple and user-friendly UI component library based on TypeScript for Vue 3",
  themeConfig: {
    logo: "/logo-64x64.png",
    nav: [
      { text: "Guide", link: "/guide/installation", activeMatch: "/guide/" },
      { text: "Component", link: "", activeMatch: "/component/" }
    ],

    sidebar: {
      "/guide/": [
        {
          text: "Guide",
          items: [
            { text: "Installation", link: "/guide/installation" },
            { text: "Quick Start", link: "/guide/quickStart" }
          ]
        }
      ]
    },

    socialLinks: [{ icon: "github", link: "https://github.com/bobosun0713/simple-ui" }]
  }
});
