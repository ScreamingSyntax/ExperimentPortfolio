/** @type {import('tailwindcss').Config} */

// Neobrutalist design system — see the "Hard Edge" spec.
// Colours are CSS-variable backed so the .dark class re-resolves the whole
// palette from one place (index.css) instead of duplicating every utility.
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['"Archivo Black"', 'Arial Black', 'Impact', 'sans-serif'],
        sans: ['"Space Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
        mono: ['"Space Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      colors: {
        // Structure
        ink: 'var(--ink)',
        'ink-soft': 'var(--ink-soft)',
        paper: 'var(--paper)',
        cream: 'var(--cream)',
        grid: 'var(--grid)',

        // Accents. These deliberately shadow Tailwind's built-in ramps of the
        // same name — there is exactly one pink, one lime and one violet here.
        pink: 'var(--pink)',
        lime: 'var(--lime)',
        violet: 'var(--violet)',

        // Foreground colours for text sitting on an accent fill. Accents are
        // light in both themes, so these stay dark in both themes.
        'on-pink': 'var(--on-pink)',
        'on-lime': 'var(--on-lime)',
        'on-violet': 'var(--on-violet)',
      },
      borderWidth: {
        3: '3px',
      },
      boxShadow: {
        'hard-xs': '2px 2px 0 var(--ink)',
        'hard-sm': '4px 4px 0 var(--ink)',
        hard: '7px 7px 0 var(--ink)',
        'hard-lg': '12px 12px 0 var(--ink)',
        none: '0 0 0 var(--ink)',
      },
      fontSize: {
        // Fluid scale, ratio ~1.33. Nothing off-scale.
        '2xs': 'clamp(0.72rem, 0.69rem + 0.15vw, 0.8rem)',
        xs: 'clamp(0.78rem, 0.75rem + 0.15vw, 0.86rem)',
        base: 'clamp(0.88rem, 0.85rem + 0.16vw, 0.97rem)',
        lg: 'clamp(1.1rem, 1.02rem + 0.4vw, 1.35rem)',
        xl: 'clamp(1.5rem, 1.3rem + 1vw, 2.1rem)',
        '2xl': 'clamp(2.1rem, 1.6rem + 2.4vw, 3.4rem)',
        '3xl': 'clamp(2.8rem, 1.8rem + 4.6vw, 5.6rem)',
      },
      transitionTimingFunction: {
        // Snappy and mechanical, never floaty.
        snap: 'cubic-bezier(0.2, 0, 0, 1)',
      },
      animation: {
        marquee: 'marquee 22s linear infinite',
        'marquee-slow': 'marquee 40s linear infinite',
        blink: 'blink 1s step-end infinite',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};
