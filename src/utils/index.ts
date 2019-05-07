import { FileWithStats, FileWithCreated } from '../types';

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
