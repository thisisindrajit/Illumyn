/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--primary)',
          light: 'var(--primary-light)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          light: 'var(--accent-light)',
        },
        secondary: 'var(--secondary)',
        tertiary: 'var(--tertiary)',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      borderColor: {
        primary: 'var(--primary)',
        'primary-light': 'var(--primary-light)',
        accent: 'var(--accent)',
        'accent-light': 'var(--accent-light)',
        secondary: 'var(--secondary)',
        tertiary: 'var(--tertiary)',
      },
      backgroundColor: {
        primary: 'var(--primary)',
        'primary-light': 'var(--primary-light)',
        accent: 'var(--accent)',
        'accent-light': 'var(--accent-light)',
        secondary: 'var(--secondary)',
        tertiary: 'var(--tertiary)',
        background: 'var(--background)',
      },
      textColor: {
        primary: 'var(--primary)',
        'primary-light': 'var(--primary-light)',
        accent: 'var(--accent)',
        'accent-light': 'var(--accent-light)',
        secondary: 'var(--secondary)',
        tertiary: 'var(--tertiary)',
        foreground: 'var(--foreground)',
      },
    },
  },
  plugins: [],
};