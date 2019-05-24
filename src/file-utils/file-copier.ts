import { copyFile, mkdir } from 'fs';
import { dirname } from 'path';
import { FileWithStatsAndDest } from '../types';
import { fileExists } from '../file-reconciliation';

/**
 * Expects a FileWithStatsAndDest to copy from src to dest
 * returns a promise
 */
export function copyStatFile(file: FileWithStatsAndDest): Promise<void> {
  return new Promise(async (resolve, reject) => {
    await createDir(dirname(file.dest));
    copyFile(file.fileName, file.dest, (err) => {
      if (!err) {
        resolve();
      } else {
        reject(err);
      }
    });
  });
}

export function createDir(path: string): Promise<void> {
  return new Promise(async (resolve, reject) => {
    const isDir = await fileExists(path);
    if (!isDir) {
      mkdir(path, (err) => {
        if (!err) {
          resolve();
        } else {
          reject(err);
        }
      });
    } else {
      resolve();
    }
  });
}
