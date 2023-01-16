import { FileWithStats, FileWithCreated, FileWithStatsAndDest } from '../types';
import { basename } from 'path';

/**
 * Given a list of files with stats, replace the creation date on the file with the given filename
 */
export function replaceDateOnFiles(
  annotatedFiles: FileWithStats[],
  filesWithCreated: FileWithCreated[],
): FileWithStats[] {
  return annotatedFiles.map((annotatedFile) => {
    const newDateFile = filesWithCreated.find((fileWithDate) => {
      return fileWithDate.fileName === annotatedFile.fileName;
    });

    if (newDateFile) {
      return {
        ...annotatedFile,
        birthtime: newDateFile.created,
      };
    }

    return annotatedFile;
  });
}

/**
 * Takes a list of FilesWithStats and a destination directory
 * and returns a list of files with stats and the destination path
 * with a directory based on the file creation date
 */
export function addDestinationDir(dest: string, files: FileWithStats[]): FileWithStatsAndDest[] {
  return files.map((file) => {
    return {
      ...file,
      dest: `${dest}/${getDateString(file.birthtime)}/${basename(file.fileName)}`,
    };
  });
}

function getDateString(date: Date): string {
  return date.toISOString().split('T')[0];
}

export interface DateParseFormat {
  regex: RegExp;
  // stands for 0 year, 1 month, 2 day
  order: [number, number, number];
}

export function parseDateFormatString(format: string): DateParseFormat {
  const parts = [
    'yyyy',
    'mm',
    'dd',
  ];

  const partOrder: [number, number][] = [];
  let regexFormat = format;

  parts.forEach((part, i) => {
    const partIdx = format.indexOf(part);
    if (partIdx === -1) {
      throw new Error(`not found expected date format part "${part}"`);
    }
    partOrder.push([partIdx, i])
    regexFormat = regexFormat.replace(part, `(\\d{${part.length}})`)
  });

  partOrder.sort((a, b) => a[0] - b[0]);

  return {
    regex: new RegExp(regexFormat),
    order: [
      partOrder[0][1],
      partOrder[1][1],
      partOrder[2][1],
    ],
  };
}
export function parseDateFromString(format: DateParseFormat, input: string): Date {
  const match = input.match(format.regex);
  if (match === null) {
    throw new Error(`unable to parse date from ${input}`);
  } else {
    const [year, month, day] = [1,2,3].map((regexIdx, i) => {
      const orderIdx = format.order[i];
      const value = match[regexIdx];
      if (!value) {
        throw new Error(`unable to parse date from ${input}`);
      }

      let intVal: number;
      try {
        intVal = parseInt(value);
      } catch (e) {
        throw new Error(`unable to parse date from ${input}`);
      }

      if (orderIdx === 1) {
        intVal -= 1;
      }

      return [orderIdx, intVal];
    })
      .sort((a, b) => a[0] - b[0])
      .map((v) => v[1]);

    return new Date(year, month, day);
  }
}
