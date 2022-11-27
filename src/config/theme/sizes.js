const result = {
  px: '1px',
};

[0, 0.5, 1, 1.5, 2, 2.5, 3, 4, 5, 6, 7, 8, 9, 10].forEach((index) => {
  result[index.toString()] = `${0.25 * index}rem`;
});
[12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 96].forEach((index) => {
  result[index.toString()] = `${0.25 * index}rem`;
});

module.exports = result;
