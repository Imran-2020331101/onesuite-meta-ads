// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // The unmodified Astro starter page at "/" was removed (see README) —
  // send root visitors straight to the real landing page instead.
  redirects: {
    '/': '/meta-sales-page',
  },
});
