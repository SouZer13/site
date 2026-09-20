/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'evenora-rose': '#D66A7A',
        'evenora-deep': '#C95368',
        'evenora-blush': '#F8E8E5',
        'evenora-nude': '#F4D9CD',
        'evenora-champagne': '#C9A66B',
        'evenora-brown': '#4B302C',
        'evenora-ink': '#211A1A',
        'evenora-ivory': '#FFF9F6',
        'evenora-white': '#FFFFFF',
        'evenora-secondary': '#756866',
        'evenora-border': '#EFE4DF',
        'evenora-available': '#8CB89C',
        'evenora-pending': '#D9A05B',
        'evenora-booked': '#D6828E',
      },
      fontFamily: {
        display: ['"Source Serif 4"', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        subtle: '0 1px 2px rgba(75, 48, 44, 0.04), 0 8px 24px -12px rgba(75, 48, 44, 0.10)',
        card: '0 2px 8px rgba(75, 48, 44, 0.05), 0 16px 40px -20px rgba(75, 48, 44, 0.16)',
        lifted: '0 4px 16px rgba(75, 48, 44, 0.08), 0 24px 60px -24px rgba(201, 83, 104, 0.22)',
      },
      borderRadius: {
        xl2: '20px',
        card: '24px',
        pill: '9999px',
      },
      maxWidth: {
        content: '1240px',
      },
    },
  },
  plugins: [],
}
