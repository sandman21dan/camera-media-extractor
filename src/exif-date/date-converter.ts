/**
 * Converts exif date format into unix format
 *
 * @param exifTimestamp Time string in exif format "yyyy:mm:dd hh:mm:ss"
 *
 * @returns Time string in Unix time stamp "yyyy-mm-ddThh:mm:ss.000Z"
 */
export function convertExifToUnix(exifTimestamp: string): string {
  const [ exifDate, exifTime ] = exifTimestamp.split(' ');
  const date = exifDate.split(':').join('-');
  return `${date}T${exifTime}.000Z`;
}
