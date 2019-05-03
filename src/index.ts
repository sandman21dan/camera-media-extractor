#!/usr/bin/env node
import yargs from 'yargs';

const argv = yargs
  .version()
  .alias('version', 'v')
  .usage('Usage: camera-media-extractor [options] <source> <destination>')
  .help('help')
  .alias('help', 'h')
  .boolean('n')
  .alias('dry-run', 'n')
  .describe('n', 'dry run, shows files that would be copied')
  .example('', 'camera-media-exctractor /mnt/f/photos /username/pictures/')
  .showHelpOnFail(true)
  .demandCommand(2)
  .argv;

console.log(argv);
