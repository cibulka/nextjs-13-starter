const fontSizes = require('./theme/fontSizes');
const maxWidth = require('./theme/maxWidth');
const palette = require('./theme/palette');
const screens = require('./theme/screens');
const sizes = require('./theme/sizes');

const theme = {
  borderRadius: {
    md: '0.25rem',
  },
  fontSizes,
  palette,
  screens,
  sizes,
  maxWidth,
};

module.exports = theme;
