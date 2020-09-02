const fs = require('fs');
const path = require('path');

const fileList = [];
/**
 *
 * @param {string} dir
 * @param {bool} inner
 * @returns {array of files}
 * @description Walks down a file directory returning the path of the children directory,.
 *  The inner params causes the function to return just the name of the children directory
 */
function walkSync(dir, inner) {
  const files = fs.readdirSync(dir).forEach((file) => {
    fs.statSync(path.join(dir, file)).isDirectory()
      ? walkSync(path.join(dir, file))
      : fileList.push(path.join(dir, file));
  });
  if (inner) return fileList.map((pth) => pth.replace(/\b\w+\\/, ''));
  return fileList;
}

module.exports = walkSync;
