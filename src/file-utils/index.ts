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

export interface MultiSelectChoice {
  title: string;
  value: string;
  selected?: boolean;
}

export function getFileTypeChoices(fileTypes: string[], preselected: string[] = []): MultiSelectChoice[] {
  return fileTypes.map((type) => {
    const choice: MultiSelectChoice = {
      title: type,
      value: type,
    };

    if (preselected.includes(type)) {
      choice.selected = true;
    }

    return choice;
  });
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
