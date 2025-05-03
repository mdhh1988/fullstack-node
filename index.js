import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'fs';
import {dirname, resolve} from 'path';
import { fileURLToPath } from 'url';
import { createRandomPicker} from './lib/random.js';
import { generate } from './lib/generator.js';
import moment from 'moment';
import commandLineArgs from 'command-line-args';
import commandLineUsage from 'command-line-usage';

// 读取命令行参数
function parseOptions(option = {}) {
  const argv = process.argv;
  for(let i = 2; i < argv.length; i++) {
    const cmd = argv[i-1];
    const value = argv[i];
    if(cmd==='--title') {
      options.title = value;
    } else if(cmd === '--min') {
      options.min = Number(value);
    } else if(cmd ==='--max') {
      options.max = Number(value);
    }
  }
  return options;
}

// 保存文章
function saveCorpus(title, article) {
  const outputDir = resolve(__dirname, 'output');
  const outputTime = moment().format('YYYYMMDD-HHmmss');
  const outputFile = resolve(outputDir, `${title}${outputTime}.txt`);

  if(!existsSync(outputDir)){
    mkdirSync(outputDir);
  }

  const text = `${title}\n\n ${article.join('\n    ')}`;
  writeFileSync(outputFile, text);

  return outputFile;
}

function loadCorpus(src) {
  const path = resolve(__dirname, src);
  const data = readFileSync(path, {encoding: 'utf-8'});
  return JSON.parse(data);
}

// 定义帮助文档内容
const sections = [
  {
    header: '文章生成器',
    content: '根据给定的标题生成一篇文章'
  },
  {
    header: '选项',
    optionList: [
      {
        name: 'title',
        typeLabel: '{underline title}',
        description: '文章标题'
      },
      {
        name: 'min',
        typeLabel: '{underline min}',
        description: '最小段落数'
      },
      {
        name: 'max',
        typeLabel: '{underline max}',
        description: '最大段落数'
      }
    ]
  }
]
const usage = commandLineUsage(sections);

const __dirname = dirname(fileURLToPath(import.meta.url));
const corpus = loadCorpus('corpus/data.json');
const optionDefinitions = [
  { name: 'help' },
  { name: 'title', type: String },
  { name: 'min', type: Number },
  { name: 'max', type: Number }
];
const options = commandLineArgs(optionDefinitions);
if('help' in options) {
  console.log(usage);
} else {
  const title = options.title || createRandomPicker(corpus.title)();
  const article = generate(title, {corpus, ...options});
  const output = saveCorpus(title, article);
  console.log(`文章已保存到 ${output}`);
}