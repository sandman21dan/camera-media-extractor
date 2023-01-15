import { access } from 'fs';
import { F_OK } from 'constants';
import { FileWithStatsAndDest } from '../types';

/**
 * takes the array an array of files with expected destinations and filters out all existing files
 */
export function filterExistingFiles(files: FileWithStatsAndDest[]): Promise<FileWithStatsAndDest[]> {
  return new Promise((resolve) => {
    Promise.all(files.map((file) => fileExists(file.dest))).then((fileResults) => {
      const filteredFiles = files.filter((file, idx) => {
        return !fileResults[idx];
      });

      resolve(filteredFiles);
    });
  });
}

export function fileExists(fileName: string): Promise<boolean> {
  return new Promise((resolve) => {
    access(fileName, F_OK, (err) => {
      if (!err) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
}
