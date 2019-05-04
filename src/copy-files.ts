import chalk from 'chalk';
import ora from 'ora';
import prompts from 'prompts';
import {
  findRegularFilesInDir,
  getExtensionTypes,
  filterFilesByType,
  getFileTypeChoices,
} from './file-utils';
import { PreselectedFileTypes } from './configuration';

export async function copyFiles(src: string, dest: string, dryRun: boolean) {
  const spinner = ora({
    text: 'Finding your files',
    spinner: 'line',
  }).start();

  const files = await findRegularFilesInDir(src);
  spinner.stop();
  console.log(chalk.green(`Found ${files.length} files`));

  const fileTypes = getExtensionTypes(files);
  console.log(`Found ${fileTypes.length} file types:`);
  // fileTypes.forEach((extension) => {
  //   console.log(extension);
  // });

  const chosenFileTypes = await prompts({
    type: 'multiselect',
    name: 'value',
    message: 'Choose file types to copy',
    choices: getFileTypeChoices(fileTypes, PreselectedFileTypes),
  });

  const filesToCopy = filterFilesByType(files, chosenFileTypes.value);
  console.log(chalk.green(`Will copy ${filesToCopy.length} files`));
  // filesToCopy.forEach((filteredFile) => {
  //   console.log(filteredFile);
  // });
}
