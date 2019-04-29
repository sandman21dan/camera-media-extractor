import { file } from 'find';

export function findRegularFilesInDir(dirName: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    try {
      file(dirName, (files) => {
        resolve(files);
      });
    } catch (e) {
      reject(e);
    }
  });
}
