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





const corpus = loadCorpus('corpus/data.json');

if('help' in options) {
  console.log(usage);
} else {
  const title = options.title || createRandomPicker(corpus.title)();
  const article = generate(title, {corpus, ...options});
  const output = saveCorpus(title, article);
  console.log(`文章已保存到 ${output}`);
}