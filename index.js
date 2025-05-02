import { readFile } from 'fs';
import {dirname, resolve} from 'path';
import { fileURLToPath } from 'url';

const url = import.meta.url;
const path = resolve(dirname(fileURLToPath(url)), 'corpus/data.json');
readFile(path, (err, data) => {
  if(!err) {
    console.log(data.toString('utf-8'))
  }else {
    console.error(err)
  }
})