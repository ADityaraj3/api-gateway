import * as fs from 'fs';
import * as path from 'path';

export default async function createUploadsFolder() {
  try {
    const dir = path.resolve(path.join(`${__dirname}/../../`, 'uploads'));
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
  } catch (e) {
    console.log(e);
  }
}
