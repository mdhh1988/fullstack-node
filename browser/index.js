import {generate} from '../lib/generator.js'
import { createRandomPicker } from '../lib/random.js';

const defaultCorpus = require('../corpus/data.json');

async function loadCorpus(corpusPath) {
  if(corpusPath) {
    const corpus = await (await fetch(corpusPath)).json();
    return corpus;
  }
  return defaultCorpus;
}

export { generate, createRandomPicker, loadCorpus}