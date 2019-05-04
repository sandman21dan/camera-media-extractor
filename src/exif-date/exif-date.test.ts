import { resolve } from 'path';

import { getExifCreatedDate } from './';

describe('getExifCreatedDate', () => {
  it('returns a promise date object with the exif created date', (done) => {
    const file = resolve(__dirname, 'test/test-background.jpg');
    const expectedDate = new Date(2019, 4, 1, 18, 0, 44);

    getExifCreatedDate(file).then((date) => {
      expect(date).toEqual(expectedDate);
      done();
    });
  });

  it('rejects a promise if the file has no exif data', (done) => {
    const file = resolve(__dirname, 'test/test-background-no-exif.jpg');

    getExifCreatedDate(file).then(() => {
      // fail the test
      expect(true).toBeFalsy();
    }).catch((error) => {
      // pass the test
      done();
    });
  });
});
