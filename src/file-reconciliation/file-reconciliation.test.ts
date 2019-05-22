import { resolve } from 'path';
import { findRegularFilesInDir, getFileStats } from '../file-utils';
import { addDestinationDir } from '../utils';
import { filterExistingFiles } from './';

describe('filterExistingFiles()', () => {
  it('filters out existing files in expected dated folders', async () => {
    const files = await findRegularFilesInDir(resolve(__dirname, './test/src'));

    const filesWithStats = await Promise.all(files.map((fileName) => {
      return getFileStats(fileName);
    }));

    const filesWithDest = addDestinationDir(resolve(__dirname, './test/dest'), filesWithStats);

    const filteredFilesWithDest = await filterExistingFiles(filesWithDest);

    expect(filteredFilesWithDest.length).toEqual(2);
    expect(filteredFilesWithDest[0].fileName).toContain('file_1.txt');
    expect(filteredFilesWithDest[1].fileName).toContain('file_4.txt');
  });
});
