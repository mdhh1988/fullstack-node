import commandLineArgs from 'command-line-args';
import commandLineUsage from 'command-line-usage';

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
const optionDefinitions = [
  { name: 'help' },
  { name: 'title', type: String },
  { name: 'min', type: Number },
  { name: 'max', type: Number }
];
const options = commandLineArgs(optionDefinitions);
if('help' in options) {
  console.log(usage);
  process.exit();
}

export {options}