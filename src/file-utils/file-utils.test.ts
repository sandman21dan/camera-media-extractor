import { findRegularFilesInDir } from ".";
import { resolve } from "path";

it('finds all regular in a given directory files', (done) => {
  const dirName = resolve(__dirname, 'test');

  findRegularFilesInDir(dirName).then((files) => {
    expect(files.length).toEqual(20);

    // only match filenames to avoid using full directory structures
    const fileNames = files.map((file) => {
      return file.split('/').pop();
    });

    expect(fileNames).toMatchSnapshot();
    done();
  });
});
