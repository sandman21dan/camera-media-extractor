import { file } from 'find';
import { extname } from 'path';
import { stat } from 'fs';
import { FileWithStats } from '../types';

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

export function getExtensionTypeCounts(fileTypes: string[], files: string[]): object {
  const fileTypeCounts: any = {};

  for (const fileType of fileTypes) {
    fileTypeCounts[fileType] = 0;
  }

  files.forEach((fileName) => {
    const extension = extname(fileName).toLowerCase();

    for (const fileType of fileTypes) {
      if (fileType === extension) {
        fileTypeCounts[fileType]++;
      }
    }
  });

  return fileTypeCounts;
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

export function getFileStats(fileName: string): Promise<FileWithStats> {
  return new Promise((resolve, reject) => {
    stat(fileName, (error, stats) => {
      if (!error) {
        resolve({
          fileName,
          size: stats.size,
          birthtime: new Date(stats.birthtime),
        });
      } else {
        reject(error);
      }
    });
  });
}
