export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0B0B0B',
        ivory: '#F7F4EF',
        gold: '#C6A15B',
        line: '#E5E0D8',
        muted: '#6B6B6B',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 20px 70px rgba(11, 11, 11, 0.10)',
      },
    },
  },
  plugins: [],
};
