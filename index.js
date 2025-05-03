import { createRandomPicker} from './lib/random.js';
import { generate } from './lib/generator.js';
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