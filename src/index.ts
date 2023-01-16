#!/usr/bin/env node
import yargs from 'yargs';
import { copyFiles } from './copy-files';

const argv = yargs
  .version()
  .alias('version', 'v')
  .usage('Usage: camera-media-extractor [options] <source> <destination>')
  .help('help')
  .alias('help', 'h')
  .boolean('n')
  .alias('dry-run', 'n')
  .default('n', false)
  .describe('n', 'dry run, shows files that would be copied')
  .string('file-date-pattern')
  .describe('file-date-pattern', 'parse date from file pattern if exif fails')
  .example('', 'camera-media-exctractor /mnt/f/photos /username/pictures/')
  .showHelpOnFail(true)
  .demandCommand(2)
  .argv;

copyFiles(argv._[0], argv._[1], argv['dry-run'] || false);
