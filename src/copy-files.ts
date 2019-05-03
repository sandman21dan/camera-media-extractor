import { findRegularFilesInDir } from './file-utils';

export function copyFiles(src: string, dest: string, dryRun: boolean) {
  findRegularFilesInDir(src).then((files) => {
    files.forEach((file) => {
      console.log(file);
    });
  });
}
