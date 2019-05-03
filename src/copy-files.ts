import chalk from 'chalk';
import ora from 'ora';
import { findRegularFilesInDir, getExtensionTypes } from './file-utils';

export function copyFiles(src: string, dest: string, dryRun: boolean) {
  const spinner = ora({
    text: 'Finding your files',
    spinner: 'line',
  }).start();

  findRegularFilesInDir(src).then((files) => {
    spinner.stop();
    console.log(chalk.green(`Found ${files.length} files`));

    const fileTypes = getExtensionTypes(files);
    console.log(`Found ${fileTypes.length} file types:`);
    fileTypes.forEach((extension) => {
      console.log(extension);
    });
  });
}
