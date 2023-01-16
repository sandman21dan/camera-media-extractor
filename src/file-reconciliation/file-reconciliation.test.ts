import { resolve } from 'path';
import { FileWithStats } from '../types';
import { addDestinationDir } from '../utils';
import { filterExistingFiles } from './';

describe('filterExistingFiles()', () => {
  it('filters out existing files in expected dated folders', async () => {
    const mockFileCreationDate = new Date(2019, 4, 22, 2, 30, 2);
    const filesWithStats: FileWithStats[] = [
      {
        fileName: `${__dirname}/test/src/file_1.txt`,
        size: 1024,
        birthtime: mockFileCreationDate,
        isExif: false,
      },
      {
        fileName: `${__dirname}/test/src/file_2.txt`,
        size: 1024,
        birthtime: mockFileCreationDate,
        isExif: false,
      },
      {
        fileName: `${__dirname}/test/src/file_3.groovy`,
        size: 1024,
        birthtime: mockFileCreationDate,
        isExif: false,
      },
      {
        fileName: `${__dirname}/test/src/file_4.txt`,
        size: 1024,
        birthtime: mockFileCreationDate,
        isExif: false,
      },
    ];

    const filesWithDest = addDestinationDir(resolve(__dirname, './test/dest'), filesWithStats);

    const filteredFilesWithDest = await filterExistingFiles(filesWithDest);

    expect(filteredFilesWithDest.length).toEqual(2);
    expect(filteredFilesWithDest[0].fileName).toContain('file_1.txt');
    expect(filteredFilesWithDest[1].fileName).toContain('file_4.txt');
  });
});
