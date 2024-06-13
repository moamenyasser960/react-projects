/** @type {import('tailwindcss').Config} */
// tailwind.config.js
module.exports = {
  content: [
    '/opt/lampp/htdocs/my-app/src/*.{html,js,css}', // Include your main JavaScript entry point
    './my-app/{public,src}/*.{html,js,css}', // Look for HTML, JS, and CSS files in specific directories
    './{public,src}/*.{html,js,css}', // Look for HTML, JS, and CSS files in public and src directories
    '*.{html,js,css}' // Look for HTML, JS, and CSS files in the root directory
  ],
  theme: {
    extend: {}
  },
  plugins: []
}
