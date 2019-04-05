const fs = require('fs');
const path = require('path');

/**
 * @function fileDataToCleanArray
 * @description trims all lines, removes empty lines and splits data into an array
 * @param {String} data
 * @returns {Array} array of text lines
 */
exports.fileDataToCleanArray = data =>
  data
    .replace(/\r\n/g, '\n')
    .split('\n')
    .filter(Boolean)
    .map(line => line.trim());

/**
 * @function readFileToArray
 * @description reads a file and converts each line to an entry in the returned array
 * @param {String} filePath
 * @returns {Array} array of text lines
 */
exports.readFileToArray = async filePath => {
  return new Promise((resolve, reject) => {
    let fileContent;
    const lineReader = fs.createReadStream(path.resolve(filePath), 'utf-8');

    lineReader.on('data', data => {
      fileContent = exports.fileDataToCleanArray(data);
      lineReader.destroy();
    });

    lineReader.on('close', () => {
      resolve(fileContent);
    });

    lineReader.on('error', () => {
      reject(`readFileToArray: Error reading file '${filePath}'`);
    });
  });
};
