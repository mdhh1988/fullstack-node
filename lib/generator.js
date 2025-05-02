import { randomInt, createRandomPicker } from './random.js';

function sentence(pick, replacer) {
  let ret = pick(); // 返回一个句子文本
  // replacer是一个对象，包含了需要替换的内容
  for(const key in replacer) {
    // 如果replacer[key]是一个函数，那么执行他随即取一条替换占位符，否则将它直接替换占位符
    ret = ret.replace(new RegExp(`{{${key}}}`, `g`), typeof replacer[key] === 'function' ? replacer[key]() : replacer[key]);
  }
  return ret;
}
export function generate (title, {
  corpus,
  min= 6000,
  max= 10000,
} = {}) {
  const articleLength = randomInt(min, max)
  const {famous, bosh_before, bosh, said, conclude} = corpus
  const [pickFamous, pickBoshBefore, pickBosh, pickSaid, pickConclude] = [famous, bosh_before, bosh, said, conclude].map(item => {
    return createRandomPicker(item)
  })
  const article = [];
  let totalLength = 0;
  while(totalLength < articleLength ) {
    // 如果文章内容的数字未超过文章总字数
    let section = ''; // 添加段落
    const sectionLength = randomInt(100, 500) // 将段落长度设为200-500字之间
    // 如果当前段落字数小于段落长度，或者当前段落不以句号或问号结尾
    while(section.length < sectionLength || !/[。？]$/.test(section)) {
      // 取一个 0～100的随机数
      const n = randomInt(0, 100);
      if(n<20) { // 如果n小于20， 生成一条名人名言，也就是文章中有百分之二十的句子是名人名言
        section += sentence(pickFamous, {said: pickSaid, conclude: pickConclude});
      } else if(n < 50) {
        // 如果n小于50， 生成一个带有前置从句的废话
        section += sentence(pickBoshBefore, {title}) + sentence(pickBosh, {title});
      } else {
        // 否则， 生成一个废话
        section += sentence(pickBosh, {title});
      }
    }
    // 段落结束，更新总长度
    totalLength += section.length;
    // 将段落存放到文章列表中
    article.push(section);
  }
  return article;
}