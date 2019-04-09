const { fileDataToCleanArray, readFileToArray } = require('../fileReader');
const { BASE_PATH } = require('../../_config/constants');

describe('Helpers > fileReader', () => {
  describe('- fileDataToCleanArray', () => {
    const mockFileData = '\r\n\n\n       Line 1\r\n          Line 2               \nLine 3 \r\n\r\n';

    test(JSON.stringify('it should replace all instances of \r\n with \n').replace(/"/g, ''), () => {
      const output = fileDataToCleanArray(mockFileData);
      expect(output).toEqual(['Line 1', 'Line 2', 'Line 3']);
    });

    test('it should trim all lines of trailing and leading spaces', () => {
      const output = fileDataToCleanArray(mockFileData);
      expect(output).toEqual(['Line 1', 'Line 2', 'Line 3']);
    });

    test('it remove all empty lines', () => {
      const output = fileDataToCleanArray(mockFileData);
      expect(output).toEqual(['Line 1', 'Line 2', 'Line 3']);
    });

    test('it should return an array without empty lines', () => {
      const output = fileDataToCleanArray(mockFileData);

      expect(Array.isArray(output)).toBeTruthy();
      expect(output.length).toEqual(3);
    });
  });

  describe('- readFileToArray', () => {
    const dummyFile = '_dummy.txt';

    test('it should return an array with non-empty lines', async () => {
      const output = await readFileToArray(`${BASE_PATH}/src/_helpers/tests/${dummyFile}`);
      expect(output).toEqual(['This', 'is', 'Sparta']);
    });

    test('it should reject with an error message', async () => {
      try {
        await readFileToArray(dummyFile);
        // Test should not pass if it does not go into the catch
        expect(false).toBeTruthy();
      } catch (error) {
        expect(error).toEqual(`readFileToArray: Error reading file '${dummyFile}'`);
      }
    });
  });
});
