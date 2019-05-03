import { file } from 'find';
import { extname } from 'path';

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

export function getExtensionTypes(files: string[]): string[] {
  const typesList: string[] = [];

  files.forEach((fileName) => {
    const extension = extname(fileName);

    if (!typesList.includes(extension)) {
      typesList.push(extension);
    }
  });

  return typesList;
}
