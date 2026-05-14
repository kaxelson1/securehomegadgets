import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://securehomegadgets.com',
  integrations: [],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
    },
  },
});
