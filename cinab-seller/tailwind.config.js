module.exports = {
  darkMode: 'media',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {},
  },
  animation: {
    'fade-in-down': "fade-in-down 0.2s ease-in-out both",
  },
  plugins: [
    require('flowbite/plugin')
]
}