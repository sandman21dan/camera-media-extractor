import { FileWithStats, FileWithCreated, FileWithStatsAndDest } from '../types';
import { replaceDateOnFiles, addDestinationDir } from './';

describe('replaceDateOnFiles()', () => {
  it('returns a new array of files with updated dates', () => {
    const files: FileWithStats[] = [
      { size: 4, fileName: './some-file.txt', birthtime: new Date('2015-05-05T18:00') },
      { size: 5, fileName: './some-file2.txt', birthtime: new Date('2015-05-05T20:00') },
      { size: 7, fileName: './some-file8.txt', birthtime: new Date('2015-05-05T22:00') },
      { size: 80, fileName: './some-file5.txt', birthtime: new Date('2015-05-06T23:00') },
    ];
    const newDate = new Date('2018-06-21T06:30');
    const newDate2 = new Date('2017-09-21T04:30');
    const newDateFiles: FileWithCreated[] = [
      { fileName: './some-file2.txt', created: newDate },
      { fileName: './some-file5.txt', created: newDate2 },
    ];
    const expectedFiles = [
      ...files,
    ];
    expectedFiles[1].birthtime = newDate;
    expectedFiles[3].birthtime = newDate2;

    expect(replaceDateOnFiles(files, newDateFiles)).toEqual(expectedFiles);
  });
});

describe('addDestinationDir()', () => {
  it('returns an array of files with a destination path based on creation date', () => {
    const files: FileWithStats[] = [
      { size: 5, fileName: './file1.txt', birthtime: new Date('2019-04-03T15:25') },
      { size: 5, fileName: './file2.txt', birthtime: new Date('2019-04-03T15:28') },
      { size: 5, fileName: './file3.txt', birthtime: new Date('2019-04-03T15:40') },
      { size: 5, fileName: './file4.txt', birthtime: new Date('2019-04-18T15:40') },
      { size: 5, fileName: './file5.txt', birthtime: new Date('2018-12-21T11:59') },
    ];

    const dest = './dest-dir';

    const expectedResult: FileWithStatsAndDest[] = [
      // tslint:disable max-line-length
      { size: 5, fileName: './file1.txt', birthtime: new Date('2019-04-03T15:25'), dest: `${dest}/2019-04-03/file1.txt` },
      { size: 5, fileName: './file2.txt', birthtime: new Date('2019-04-03T15:28'), dest: `${dest}/2019-04-03/file2.txt` },
      { size: 5, fileName: './file3.txt', birthtime: new Date('2019-04-03T15:40'), dest: `${dest}/2019-04-03/file3.txt` },
      { size: 5, fileName: './file4.txt', birthtime: new Date('2019-04-18T15:40'), dest: `${dest}/2019-04-18/file4.txt` },
      { size: 5, fileName: './file5.txt', birthtime: new Date('2018-12-21T11:59'), dest: `${dest}/2018-12-21/file5.txt` },
      // tslint:enable max-line-length
    ];

    expect(addDestinationDir(dest, files)).toEqual(expectedResult);
  });
});
