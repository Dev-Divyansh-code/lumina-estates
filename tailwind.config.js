/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        xs: '400px',
      },
      colors: {
        charcoal: {
          DEFAULT: '#0A0A0B',
          50: '#1A1B1E',
          100: '#121316',
          200: '#0E0F11',
        },
        cream: {
          DEFAULT: '#F0F1F3',
          50: '#FAFBFC',
          100: '#E4E6EA',
          200: '#D4D7DD',
        },
        // Platinum silver accent
        silver: {
          DEFAULT: '#C5CAD3',
          light: '#E8EAEE',
          dark: '#9AA1AD',
          muted: '#C5CAD329',
        },
        // Graphite secondary accent
        graphite: {
          DEFAULT: '#3D4149',
          light: '#6B7280',
          dark: '#25282E',
          muted: '#3D41492E',
        },
        warm: {
          black: '#111214',
          gray: '#2A2D33',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        wide: '0.08em',
        wider: '0.15em',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-out-soft': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(10, 10, 11, 0.5)',
        'silver-glow': '0 0 48px rgba(197, 202, 211, 0.22), 0 0 12px rgba(197, 202, 211, 0.12)',
        'graphite-glow': '0 0 56px rgba(61, 65, 73, 0.45)',
        'royal-glow':
          '0 0 40px rgba(61, 65, 73, 0.3), 0 0 80px rgba(197, 202, 211, 0.1)',
        card: '0 28px 56px -14px rgba(10, 10, 11, 0.75)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        royal: 'linear-gradient(135deg, #3D4149 0%, #6B7280 40%, #C5CAD3 100%)',
        'royal-soft':
          'linear-gradient(135deg, rgba(61,65,73,0.45) 0%, rgba(197,202,211,0.16) 100%)',
        'silver-shine':
          'linear-gradient(120deg, #9AA1AD 0%, #E8EAEE 42%, #C5CAD3 58%, #9AA1AD 100%)',
        velvet:
          'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(61,65,73,0.4) 0%, transparent 55%), radial-gradient(ellipse 50% 40% at 100% 100%, rgba(197,202,211,0.08) 0%, transparent 50%)',
        noise:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\")",
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        float: 'float 6s ease-in-out infinite',
        'shimmer-silver': 'shimmerSilver 3.5s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmerSilver: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
}
