import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1120px',
      },
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb',
          foreground: '#ffffff',
        },
        success: {
          DEFAULT: '#16a34a',
          foreground: '#ffffff',
        },
        destructive: {
          DEFAULT: '#dc2626',
          foreground: '#ffffff',
        },
        muted: '#f3f4f6',
        border: '#e5e7eb',
        ring: '#93c5fd',
      },
      borderRadius: {
        lg: '12px',
      },
      boxShadow: {
        card: '0 2px 10px rgba(0,0,0,0.05)',
      },
    },
  },
  plugins: [],
}

export default config
