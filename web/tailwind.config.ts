import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    container: {
      center: true,
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-2': 'linear-gradient(270deg, #f55925 0%, #D75986 100%)',
      },
      gridTemplateColumns: {},
      colors: {
        white: '#FFF',
        black: '#161616',
        gray: '#F8F8F8',
        blue: {
          100: '#C7FFFE',
          200: '#5465FF',
          300: '#111963',
        },
      },
    },
    borderRadius: {
      lg: '.5rem',
      full: '9999px',
      swooshBR: '1rem',
      swooshPB: '9999px',
    },
  },
  plugins: [],
};

export default config;
