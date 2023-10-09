import { FileWithStats, FileWithCreated, FileWithStatsAndDest } from '../types';
import { replaceDateOnFiles, addDestinationDir, parseDateFromString, parseDateFormatString, DateParseFormat } from './';

describe('replaceDateOnFiles()', () => {
  it('returns a new array of files with updated dates', () => {
    const files: FileWithStats[] = [
      { size: 4, fileName: './some-file.txt', birthtime: new Date('2015-05-05T18:00'), isExif: false },
      { size: 5, fileName: './some-file2.txt', birthtime: new Date('2015-05-05T20:00'), isExif: false },
      { size: 7, fileName: './some-file8.txt', birthtime: new Date('2015-05-05T22:00'), isExif: false },
      { size: 80, fileName: './some-file5.txt', birthtime: new Date('2015-05-06T23:00'), isExif: false },
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

    expect(replaceDateOnFiles(files, newDateFiles, false)).toEqual(expectedFiles);
  });

  it('returns a new array of files with updated dates and mark as exif', () => {
    const files: FileWithStats[] = [
      { size: 4, fileName: './some-file.txt', birthtime: new Date('2015-05-05T18:00'), isExif: false },
      { size: 5, fileName: './some-file2.txt', birthtime: new Date('2015-05-05T20:00'), isExif: false },
      { size: 7, fileName: './some-file8.txt', birthtime: new Date('2015-05-05T22:00'), isExif: false },
      { size: 80, fileName: './some-file5.txt', birthtime: new Date('2015-05-06T23:00'), isExif: false },
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
    expectedFiles[1].isExif = true;
    expectedFiles[3].birthtime = newDate2;
    expectedFiles[3].isExif = true;

    expect(replaceDateOnFiles(files, newDateFiles, true)).toEqual(expectedFiles);
  });
});

describe('addDestinationDir()', () => {
  it('returns an array of files with a destination path based on creation date', () => {
    const files: FileWithStats[] = [
      { size: 5, fileName: './file1.txt', birthtime: new Date('2019-04-03T15:25'), isExif: false },
      { size: 5, fileName: './file2.txt', birthtime: new Date('2019-04-03T15:28'), isExif: false },
      { size: 5, fileName: './file3.txt', birthtime: new Date('2019-04-03T15:40'), isExif: false },
      { size: 5, fileName: './file4.txt', birthtime: new Date('2019-04-18T15:40'), isExif: false },
      { size: 5, fileName: './file5.txt', birthtime: new Date('2018-12-21T11:59'), isExif: false },
    ];

    const dest = './dest-dir';

    const expectedResult: FileWithStatsAndDest[] = [
      // tslint:disable max-line-length
      { size: 5, fileName: './file1.txt', birthtime: new Date('2019-04-03T15:25'), dest: `${dest}/2019-04-03/file1.txt`, isExif: false },
      { size: 5, fileName: './file2.txt', birthtime: new Date('2019-04-03T15:28'), dest: `${dest}/2019-04-03/file2.txt`, isExif: false },
      { size: 5, fileName: './file3.txt', birthtime: new Date('2019-04-03T15:40'), dest: `${dest}/2019-04-03/file3.txt`, isExif: false },
      { size: 5, fileName: './file4.txt', birthtime: new Date('2019-04-18T15:40'), dest: `${dest}/2019-04-18/file4.txt`, isExif: false },
      { size: 5, fileName: './file5.txt', birthtime: new Date('2018-12-21T11:59'), dest: `${dest}/2018-12-21/file5.txt`, isExif: false },
      // tslint:enable max-line-length
    ];

    expect(addDestinationDir(dest, files)).toEqual(expectedResult);
  });
});

describe('parseDateFormatString()', () => {
  const testSuite = [
    { input: 'yyyymmdd', expected: { regex: /(\d{4})(\d{2})(\d{2})/, order: [0, 1, 2] } },
    { input: 'yyyyddmm', expected: { regex: /(\d{4})(\d{2})(\d{2})/, order: [0, 2, 1] } },
    { input: 'ddmmyyyy', expected: { regex: /(\d{2})(\d{2})(\d{4})/, order: [2, 1, 0] } },
    { input: '^ddmmyyyy.*', expected: { regex: /^(\d{2})(\d{2})(\d{4}).*/, order: [2, 1, 0] } },
    { input: '.*yyyy_mm_dd.*', expected: { regex: /.*(\d{4})_(\d{2})_(\d{2}).*/, order: [0, 1, 2] } },
  ];

  for (const test of testSuite) {
    expect(parseDateFormatString(test.input)).toEqual(test.expected);
  }
});

describe('parseDateFromString()', () => {
  it('parses dates from the expected input + formats', () => {
    const testSuite: Array<{ format: DateParseFormat, input: string, expected: Date }> = [
      { format:
        { regex: /(\d{4})(\d{2})(\d{2})/, order: [0, 1, 2] },
        input: '20110324', expected: new Date(2011, 2, 24),
      },
      { format:
        { regex: /(\d{4})(\d{2})(\d{2})/, order: [0, 2, 1]},
        input: '20112403', expected: new Date(2011, 2, 24),
      },
      { format:
        { regex: /.*(\d{4})(\d{2})(\d{2}).*/, order: [0, 1, 2]},
        input: 'abc20110324_other.txt', expected: new Date(2011, 2, 24),
      },
      { format:
        { regex: /.*(\d{4})_(\d{2})_(\d{2}).*/, order: [0, 1, 2]},
        input: 'abc2011_03_24_other.file', expected: new Date(2011, 2, 24),
      },
    ];

    for (const test of testSuite) {
      expect(parseDateFromString(test.format, test.input)).toEqual(test.expected);
    }
  });

  it('parses dates in UTC to avoid shifts during conversions', () => {
      const format: DateParseFormat = {
        regex: /(\d{4})(\d{2})(\d{2})/,
        order: [0, 1, 2],
      };
      const input = '20110324';
      const result = parseDateFromString(format, input);
      expect(result).toEqual(new Date(2011,2, 24));
      expect(result.getTimezoneOffset()).toEqual(0);
  });
});
