// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';

import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  site: 'https://spinnawheel.com',

  integrations: [
      sitemap(),
      partytown({
          // forward GA events if needed:
          // forward: ['dataLayer.push'],
      })
	],

  vite: {
  plugins: [tailwindcss()]
},

  adapter: netlify()
});