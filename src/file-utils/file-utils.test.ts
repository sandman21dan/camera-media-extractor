import { findRegularFilesInDir, getExtensionTypes, filterFilesByType } from '.';
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

describe('filterFilesByType', () => {
  const filePath = '../../some/directory/structure/';
  let files: string[];

  beforeEach(() => {

    files = [
      'names.txt',
      'beach.jpg',
      'logo.png',
      'video6.MP4',
      'landscape.jpg',
      'list.txt',
      'records.csv',
      'video.mp4',
      'landscape3.JPG',
      'report.txt',
      'video2.mp4',
    ].map((fileName) => filePath + fileName);
  });

  it('filters the files with the given extensions', () => {
    const extensions = [
      '.jpg',
      '.mp4',
    ];

    expect(filterFilesByType(files, extensions)).toEqual([
      `${filePath}beach.jpg`,
      `${filePath}video6.MP4`,
      `${filePath}landscape.jpg`,
      `${filePath}video.mp4`,
      `${filePath}landscape3.JPG`,
      `${filePath}video2.mp4`,
    ]);
  });
});
