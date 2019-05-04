import { ExifImage } from 'exif';
import { convertExifToUnix } from './date-converter';

export function getExifCreatedDate(fileName: string): Promise<Date> {
  return new Promise((resolve, reject) => {
    try {
      const exifImage = new ExifImage({ image: fileName }, (error, exifData) => {
        if (error) {
          reject(error);
        } else {
          const exifDate = exifData.exif.DateTimeOriginal || exifData.exif.CreateDate;
          if (exifDate) {
            const unixDate = convertExifToUnix(exifDate);
            resolve(new Date(unixDate));
          } else {
            reject('Exif data contains no creation time');
          }
        }
      });
    } catch (e) {
      reject(e);
    }
  });
}
