import { mkdirSync } from 'fs';
import { resolve } from 'path';
import rimraf from 'rimraf';
import { FileWithStatsAndDest } from '../types';

import { copyStatFile, createDir } from './file-copier';
import { fileExists } from '../file-reconciliation';

const distDir = resolve(__dirname, './test/temp');

beforeEach(() => {
  mkdirSync(distDir);
});

afterEach(() => {
  rimraf.sync(distDir);
});

describe('createDir', () => {
  it('creates a dir if it does not exist', async (done) => {
    const expectedPath = resolve(distDir, 'test-dir');
    await createDir(expectedPath);
    const dirExists = await fileExists(expectedPath);
    expect(dirExists).toEqual(true);
    done();
  });

  it('does not fail if dir already exists', (done) => {
    const expectedPath = resolve(distDir, 'test-dir');
    mkdirSync(expectedPath);
    createDir(expectedPath).then(() => {
      // pass the test
      done();
    });
  });
});

describe('copyStatFile', () => {
  it('copies a file from expected src to dist', async (done) => {
    const file: FileWithStatsAndDest = {
      birthtime: new Date('2019-05-24T21:49:000Z'),
      dest: resolve(distDir, '2019-05-24', 'file_2.txt'),
      fileName: resolve(__dirname, './test/file_2.txt'),
      size: 1024,
    };

    await copyStatFile(file);
    const copiedCorrectly = await fileExists(file.dest);
    expect(copiedCorrectly).toEqual(true);
    done();
  });
});
