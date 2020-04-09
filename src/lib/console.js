const colors = require('colors');

// custom console
exports.red = (...str) => {
  console.log(colors.red(str.join(' ')));
};

exports.green = (...str) => {
  console.log(colors.green(str.join(' ')));
};

exports.yellow = (...str) => {
  console.log(colors.yellow(str.join(' ')));
};

exports.cyan = (...str) => {
  console.log(colors.cyan(str.join(' ')));
};

exports.gray = (...str) => {
  console.log(colors.gray(str.join(' ')));
};

exports.grey = (...str) => {
  console.log(colors.grey(str.join(' ')));
};
