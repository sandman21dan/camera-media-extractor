import * as path from 'path';
import * as find from 'find';

find.file(path.resolve(__dirname, '../'), (files) => {
  files.forEach((fileName) => {
    console.log('File is: ', fileName);
  });

  console.log('file types are:');
  const typesList: string[] = [];

  files.forEach((fileName) => {
    const ext = path.extname(fileName);
    if (!typesList.includes(ext)) {
      typesList.push(ext)
    }
  });

  console.log('Extentions', typesList);

  console.log('filtered by type');
  const extentionFilter = '.md';
  const filtered = files.filter((fileName) => {
    if (path.extname(fileName) === extentionFilter) {
      return fileName
    }
  });

  console.log(`${extentionFilter} files: `, filtered);
});
