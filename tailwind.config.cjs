// tailwind.config.js (ESM)
import uiPlugin from './plugins/ui-plugin.js';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // Laravel + React/Blade
    './resources/views/**/*.blade.php',
    './resources/**/*.{php,js,ts,jsx,tsx,vue}',
    './index.html',
  ],
  theme: { extend: {} },
  plugins: [uiPlugin],
};
