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
