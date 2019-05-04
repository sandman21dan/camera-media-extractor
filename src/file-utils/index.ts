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
    const extension = extname(fileName).toLowerCase();

    if (!typesList.includes(extension)) {
      typesList.push(extension);
    }
  });

  return typesList;
}

export function filterFilesByType(files: string[], fileTypes: string[]): string[] {
  return files.filter((fileName) => {
    const fileExt = extname(fileName).toLowerCase();
    if (fileTypes.includes(fileExt)) {
      return true;
    }
    return false;
  });
}
