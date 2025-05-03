import { writeFileSync, readFileSync, existsSync, mkdirSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import moment from 'moment';

const __dirname = dirname(fileURLToPath(import.meta.url));

// 保存文章
export function saveCorpus(title, article) {
  const outputDir = resolve(__dirname, '..', 'output');
  const outputTime = moment().format('YYYYMMDD-HHmmss');
  const outputFile = resolve(outputDir, `${title}${outputTime}.txt`);

  if(!existsSync(outputDir)){
    mkdirSync(outputDir);
  }

  const text = `${title}\n\n ${article.join('\n    ')}`;
  writeFileSync(outputFile, text);

  return outputFile;
}

// 加载语料库
export function loadCorpus(src) {
  const path = resolve(__dirname, '..' ,src);
  const data = readFileSync(path, {encoding: 'utf-8'});
  return JSON.parse(data);
}