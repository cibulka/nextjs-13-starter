const palette = {
  // meaning
  primary: {
    light: '#71b7fb',
    main: '#3787C8',
    dark: '#005a97',
    darker: '#003D66',
  },
  success: {
    light: '#6ee7b7',
    main: '#10b981',
    dark: '#15803d',
  },
  warning: {
    light: '#fdba74',
    main: '#f97316',
    dark: '#c2410c',
  },
  error: {
    light: '#fca5a5',
    main: '#ef4444',
    dark: '#b91c1c',
    darker: '#601C1C',
  },
  // text

  // border

  // shades
  grey: {
    50: '#f8fafc', // slate
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },
  // css
  transparent: 'transparent',
  current: 'currentColor',
};

palette.border = {
  light: palette.grey[300],
  main: palette.grey[400],
  dark: palette.grey[500],
};

palette.background = {
  paper: '#fff',
  default: palette.neutral[200],
  dark: palette.neutral[300],
};

palette.text = {
  primary: palette.grey[800],
  secondary: palette.grey[700],
  disabled: palette.grey[600],
  white: palette.grey[200],
};

module.exports = palette;
