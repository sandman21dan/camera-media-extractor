import * as path from 'path';
import * as fs from 'fs';
import * as util from 'util';
import * as rand from 'randomstring';

const fileName = path.resolve(__dirname, '../test/file.txt');
console.log('generating file');
const fileData = rand.generate(Math.pow(1024, 2));

const wfp = util.promisify(fs.writeFile);

wfp(fileName, fileData).then(() => {
  console.log('file has been written');
});
