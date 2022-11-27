const plugin = require('tailwindcss/plugin')
const theme = require('./src/config/theme.js');

/** @type {import('tailwindcss').Config} */

/* Parse fontSize */
const fontSize = {};
Object.keys(theme.fontSizes).forEach((key) => {
  fontSize[key] = Object.values(theme.fontSizes[key]);
});

/* Parse screens */
const screens = {};
Object.keys(theme.screens).forEach((screenName) => {
  const value = theme.screens[screenName];
  if (typeof value === 'number') {
    screens[screenName] = `${value}px`;
  } else if (value.max) {
    screens[screenName] = { max: `${value.max}px` };
  } else if (value.min) {
    screens[screenName] = { min: `${value.min}px` };
  } else {
    screens[screenName] = value;
  }
});

/* Result */
const result = {
  darkMode: 'class', // or 'media',
  theme: {
    fontFamily: {
      sans: [],
      mono: [],
    },
    fontSize,
    screens,
    colors: theme.palette,
    spacing: theme.sizes,
  },
  content: [
    './src/**/*.tsx', 
    './src/**/*.ts', 
  ]
};

module.exports = result;
