import { convertExifToUnix } from './date-converter';

it('converts from exif date to unix', () => {
  const exifDate = '2015:02:15 19:00:08';
  const expectedDate = '2015-02-15T19:00:08.000Z';

  expect(convertExifToUnix(exifDate)).toEqual(expectedDate);
});
