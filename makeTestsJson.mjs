import fs from 'fs';
import path from 'path';

function jsonFilesAtPath(folderPath) {
  return fs.readdirSync(folderPath)
    .map(fileName => path.join(folderPath, fileName))
    .filter(filePath => /[.]json$/.test(filePath) && fs.statSync(filePath).isFile())
    .sort()
    .map(filePath => [filePath.match(/([^/]+)[.]json$/)[1], fs.readFileSync(filePath, { encoding: 'base64' })]);
}

const filePaths = Object.fromEntries([
  ...jsonFilesAtPath('JSONTestSuite/test_parsing'),
  ...jsonFilesAtPath('JSONTestSuite/test_transform')
]);

console.log(JSON.stringify(filePaths));
