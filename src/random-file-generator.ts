import * as rand from 'randomstring';

/**
 *
 * @param megabytes Number of megabytes of the random the file data
 */
export function getRandomFileData(megabytes: number): string {
  return rand.generate(Math.pow(1024, 2) * megabytes);
}

/**
 *
 * @param kilobytes Number of megabytes of the random the file data
 */
export function getRandomFileDataKB(kilobytes: number): string {
  return rand.generate(1024 * kilobytes);
}
