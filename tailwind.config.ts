import type { Config } from 'tailwindcss'
const { nextui } = require('@nextui-org/react')
const colors = require('tailwindcss/colors')

delete colors.lightBlue
delete colors.warmGray
delete colors.trueGray
delete colors.coolGray
delete colors.blueGray

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    colors: {
      ...colors,
      white: '#FFFFFF',
      black: colors.black,
      primary: '#33EAFF',
      'primary-hover': '#33EAFF70',
      secondary: '#1F8D99',
      'secondary-hover': '#1F8D9930',
      light: '#EEEEEE',
      dark: '#0F172A',
      'secundary-dark': '#162342',
      'light-grey': '#AFA9A9',
      transparent: 'transparent',
      'semi-transparent-white': 'rgba(255, 255, 255, 0.15)',
      'semi-transparent-black': 'rgba(0, 0, 0, 0.15)',
      'light-border': 'rgba(0, 0, 0, 0.3)',
      'dark-border': 'rgba(255, 255, 255, 0.3)',
      'bg-hover': 'rgba(0, 0, 0, 0.15)',
      'bg-dark-hover': 'rgba(255, 255, 255, 0.15)',
      'black-text': colors.neutral['900'],
      gradient: '#32494C',
      'color-shadow': '#20212447'
    },
    extend: {
      animation: {
        scan: 'scan 3s ease-in-out infinite',
        expand: 'expand 2s ease-out 1'
      },
      keyframes: {
        scan: {
          '0%, 100%': {
            top: '0',
            left: '0'
          },
          '50%': {
            top: '100%',
            left: '0'
          }
        },
        expand: {
          '0%': {
            width: '200px',
            height: '200px',
            borderRadius: '60px'
          },
          '25%': {
            borderRadius: '40px'
          },
          '50%': {
            borderRadius: '20px'
          },
          '75%': {
            borderRadius: '10px'
          },
          '85%': {
            borderRadius: '3px'
          },
          '100%': {
            width: '100%',
            height: '100%',
            borderRadius: '0px'
          }
        }
      }
    }
  },
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        light: {
          layout: {},
          colors: {
            white: '#FFFFFF',
            black: '#000000',
            dark: '#0F172A',
            lightGrey: '#AFA9A9',
            primary: {
              DEFAULT: '#1F8D99',
              foreground: '#FFFFFF'
            },
            secondary: {
              DEFAULT: '#1F8D99'
            },
            danger: {
              DEFAULT: '#DC2626'
            },
            focus: '#1F8D99',
            background: '#FFFFFF',
            foreground: '#000000',
            default: {
              200: '#00000026'
            },
            content1: '#FFFFFF'
          }
        },
        dark: {
          layout: {},
          colors: {
            white: '#FFFFFF',
            black: '#000000',
            dark: '#0F172A',
            lightGrey: '#AFA9A9',
            primary: {
              DEFAULT: '#33EAFF',
              foreground: '#000000'
            },
            danger: {
              DEFAULT: '#DC2626'
            },
            focus: '#33EAFF',
            background: '#000000',
            foreground: '#FFFFFF',
            default: {
              200: '#FFFFFF26'
            },
            content1: '#000000'
          }
        }
      }
    })
  ]
}
export default config
