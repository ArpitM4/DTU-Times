// tailwind.config.js
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      'heading': ['Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      'body': ['Lora', 'ui-serif', 'Georgia', 'serif'],
      'accent': ['Playfair Display', 'ui-serif', 'serif'],
    },
    extend: {
      keyframes: {
        'hero-bounce': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { filter: 'drop-shadow(0 0 12px rgba(59,130,246,0.7))' },
          '50%': { filter: 'drop-shadow(0 0 28px rgba(59,130,246,1))' },
        },
      },
      animation: {
        'hero-bounce': 'hero-bounce 2.5s ease-in-out infinite',
        glow: 'glow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
