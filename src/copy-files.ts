import chalk from 'chalk';
import ora from 'ora';
import prompts from 'prompts';
import {
  findRegularFilesInDir,
  getExtensionTypes,
  filterFilesByType,
  getFileTypeChoices,
  getFileStats,
  getExtensionTypeCounts,
  MultiSelectChoice,
} from './file-utils';
import { PreselectedFileTypes } from './configuration';
import { getExifCreatedDate } from './exif-date';
import { FileWithCreated } from './types';
import { replaceDateOnFiles, addDestinationDir, parseDateFormatString, parseDateFromString } from './utils';
import { resolve, basename } from 'path';
import { copyStatFile } from './file-utils/file-copier';
import { filterExistingFiles } from './file-reconciliation';

export async function copyFiles(
  src: string,
  dest: string,
  dryRun: boolean,
  fileDatePattern: string,
  skipExif: boolean,
) {
  const spinner = ora({
    text: 'Finding your files',
    spinner: 'line',
  }).start();

  const files = await findRegularFilesInDir(src);
  spinner.stop();
  console.log(chalk.green(`Found ${files.length} files`));

  const fileTypes = getExtensionTypes(files);
  console.log(`Found ${fileTypes.length} file types:`);

  const fileTypeCounts = getExtensionTypeCounts(fileTypes, files);

  const choices = getFileTypeChoices(fileTypes, PreselectedFileTypes);

  const fileCountAnnotatedChoices: MultiSelectChoice[] = choices.map((choice) => {
    return {
      ...choice,
      title: `${choice.title} (${(fileTypeCounts as any)[choice.value]})`,
    };
  });

  const chosenFileTypes = await prompts({
    type: 'multiselect',
    name: 'value',
    message: 'Choose file types to copy',
    choices: fileCountAnnotatedChoices,
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

  if (!skipExif) {
    for (const [idx, file] of jpgFiles.entries()) {
      spinner.text = `Scanning file creation dates ${idx + 1}..${jpgFiles.length}`;

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
  }

  let filesWithCreated = replaceDateOnFiles(filesWithStats, exifFileDates, true);

  if (fileDatePattern !== '') {
    const dateFormat = parseDateFormatString(fileDatePattern);

    const filesWithDatesFromPattern: FileWithCreated[] = filesWithCreated
      .filter((file) => !file.isExif)
      .map((file) => {
        const name = basename(file.fileName);
        const fileDate = parseDateFromString(dateFormat, name);

        return {
          fileName: file.fileName,
          created: fileDate,
        };
      });

    filesWithCreated = replaceDateOnFiles(filesWithStats, filesWithDatesFromPattern, false);
  }

  const filesWithDest = addDestinationDir(resolve(dest), filesWithCreated);
  const filteredFilesWithDest = await filterExistingFiles(filesWithDest);

  console.log(`Will copy ${filteredFilesWithDest.length} missing files out of ${filesWithDest.length}`);
  const size = filteredFilesWithDest.reduce((acum, file) => {
    return acum + file.size;
  }, 0);
  console.log(`For a size of ${Math.floor(size / (1024 * 1024))}MB`);

  if (!dryRun) {
    spinner.text = 'Copying files';
    spinner.start();

    for (const [idx, file] of filteredFilesWithDest.entries()) {
      spinner.text = `Copying files [${basename(file.fileName)}] ${idx + 1}..${filteredFilesWithDest.length}`;
      await copyStatFile(file);
    }

    spinner.stop();

    console.log(chalk.green('Finished copying!'));
  } else {
    console.log('Dry run, would copy the following');
    filteredFilesWithDest.forEach((file) => {
      console.log(file.dest);
    });
  }
}
