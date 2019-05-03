import chalk from 'chalk';
import { findRegularFilesInDir, getExtensionTypes } from './file-utils';

export function copyFiles(src: string, dest: string, dryRun: boolean) {
  findRegularFilesInDir(src).then((files) => {
    console.log(chalk.green(`Found ${files.length} files`));

    const fileTypes = getExtensionTypes(files);
    console.log(`Found ${fileTypes.length} file types:`);
    fileTypes.forEach((extension) => {
      console.log(extension);
    });
  });
}
