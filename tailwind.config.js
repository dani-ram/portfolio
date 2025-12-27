/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        fascinate: ['Fascinate', 'cursive'],
        changaone: ['Changa one', 'italic'],
        pacifico: ['Pacifico', 'cursive']
      },
    },
  },
  plugins: [],

}
