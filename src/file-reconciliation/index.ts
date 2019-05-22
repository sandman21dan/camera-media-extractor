import { access } from 'fs';
import { F_OK } from 'constants';
import { FileWithStatsAndDest } from '../types';

/**
 * takes the array an array of files with expected destinations and filters out all existing files
 */
export function filterExistingFiles(files: FileWithStatsAndDest[]): Promise<FileWithStatsAndDest[]> {
  return new Promise(async (resolve, reject) => {
    const fileResults = await Promise.all(files.map((file) => fileExists(file.dest)));

    const filteredFiles = files.filter((file, idx) => {
      return !fileResults[idx];
    });

    resolve(filteredFiles);
  });
}

function fileExists(fileName: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    access(fileName, F_OK, (err) => {
      if (!err) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
}
