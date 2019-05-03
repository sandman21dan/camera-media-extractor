import { findRegularFilesInDir, getExtensionTypes } from '.';
import { resolve } from 'path';

describe('findRegularFilesInDir', () => {
  it('finds all regular in a given directory files', (done) => {
    const dirName = resolve(__dirname, 'test');

    findRegularFilesInDir(dirName).then((files) => {
      expect(files.length).toEqual(20);

      // only match filenames to avoid using full directory structures
      const fileNames = files.map((file) => {
        return file.split('/').pop();
      });

      expect(fileNames).toMatchSnapshot();
      done();
    });
  });
});

describe('getExtensionTypes', () => {
  let files: string[];

  beforeEach(() => {
    const filePath = '../../some/directory/structure/';

    files = [
      'names.txt',
      'beach.jpg',
      'logo.png',
      'landscape.jpg',
      'list.txt',
      'records.csv',
      'landscape3.JPG',
      'report.txt',
    ].map((fileName) => filePath + fileName);
  });

  it('returns all diferent extensions in a list of files', () => {
    expect(getExtensionTypes(files)).toEqual([
      '.txt',
      '.jpg',
      '.png',
      '.csv',
    ]);
  });
});
