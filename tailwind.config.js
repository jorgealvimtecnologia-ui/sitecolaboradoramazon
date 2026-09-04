/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        amazon: {
          dark: '#131921',
          light_dark: '#232f3e',
          accent: '#febd69',
          yellow: '#f0c14b',
          yellow_hover: '#f7ca00',
          yellow_btn: '#ffd814',
          orange: '#ff9900',
          orange_btn: '#fa8900',
          blue_link: '#007185',
          price_red: '#b12704',
          deal_red: '#cc0c39',
          badge_deal: '#cc0c39',
          border: '#d5d9d9',
          bg_gray: '#eaeded',
          card_bg: '#ffffff',
          star_gold: '#ffa41c',
          prime_blue: '#00a8e1'
        }
      },
      fontFamily: {
        sans: ['"Amazon Ember"', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'amazon-card': '0 2px 5px rgba(15, 17, 17, 0.15)',
        'amazon-hover': '0 4px 12px rgba(15, 17, 17, 0.2)',
      }
    },
  },
  plugins: [],
}
