import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Simple UI",
  description: "A simple and user-friendly UI component library based on TypeScript for Vue 3",
  themeConfig: {
    logo: "/logo.png",
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
