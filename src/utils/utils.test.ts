import { FileWithStats, FileWithCreated } from '../types';
import { replaceDateOnFiles } from './';

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
