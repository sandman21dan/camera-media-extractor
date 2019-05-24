import chalk from 'chalk';
import ora from 'ora';
import prompts from 'prompts';
import {
  findRegularFilesInDir,
  getExtensionTypes,
  filterFilesByType,
  getFileTypeChoices,
  getFileStats,
} from './file-utils';
import { PreselectedFileTypes } from './configuration';
import { getExifCreatedDate } from './exif-date';
import { FileWithCreated } from './types';
import { replaceDateOnFiles, addDestinationDir } from './utils';
import { resolve } from 'path';

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

  const chosenFileTypes = await prompts({
    type: 'multiselect',
    name: 'value',
    message: 'Choose file types to copy',
    choices: getFileTypeChoices(fileTypes, PreselectedFileTypes),
  });

  const filesToCopy = filterFilesByType(files, chosenFileTypes.value);
  console.log(chalk.green(`Will copy ${filesToCopy.length} files`));

  const filesWithStats = await Promise.all(filesToCopy.map((fileName) => {
    return getFileStats(fileName);
  }));

  const jpgFiles = filterFilesByType(filesToCopy, ['.jpg', '.jpeg']);

  spinner.text = 'Scanning file creation dates';
  spinner.start();
  let exifFiles = 0;
  let nonExifFiles = 0;
  const exifFileDates: FileWithCreated[] = [];

  for (const [idx, file] of jpgFiles.entries()) {
    spinner.text = `Scanning file creation dates ${idx}..${jpgFiles.length}`;

    try {
      const exifDate = await getExifCreatedDate(file);
      exifFileDates.push({ fileName: file, created: exifDate });
      exifFiles++;
    } catch {
      nonExifFiles++;
    }
  }
  spinner.stop();

  console.log(`Exif files found: ${exifFiles}, non exif files: ${nonExifFiles}`);

  const filesWithCreated = replaceDateOnFiles(filesWithStats, exifFileDates);

  const filesWithDest = addDestinationDir(resolve(dest), filesWithCreated);
  console.log(`Will copy ${filesWithDest.length} files`);
  const size = filesWithDest.reduce((acum, file) => {
    return acum + file.size;
  }, 0);
  console.log(`For a size of ${Math.floor(size / (1024 * 1024))}MB`);
}
