/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#1f2937',       // slate-800
        accent: '#38bdf8',        // sky-400
        warning: '#fbbf24',       // yellow-400
        success: '#22c55e'        // green-500
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem'
      },
      screens: {
        'xs': '420px',
        '3xl': '1600px'
      },
      boxShadow: {
        soft: '0 4px 10px rgba(0, 0, 0, 0.06)',
        glow: '0 0 10px #38bdf8'
      },
      transitionTimingFunction: {
        'custom-ease': 'cubic-bezier(0.4, 0, 0.2, 1)'
      },
      fontSize: {
        'xs': '.75rem',
        'sm': '.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
      }
    }





    ,
contrast: {
        high: 'contrast(1.5)',
      },

    
  },
  plugins: [],
};
