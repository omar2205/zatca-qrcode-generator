const konstaConfig = require('konsta/config')

/** @type {import('tailwindcss').Config} */
module.exports = konstaConfig({
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {},
  },
  plugins: [],
})
