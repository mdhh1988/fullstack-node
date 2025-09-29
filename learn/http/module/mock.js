import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let dataCache = null

function loadData() {
  if(!dataCache) {
    const file = path.resolve(__dirname, '../mock/data.json')
    const data = JSON.parse(fs.readFileSync(file, {encoding: 'utf-8'}))
    dataCache = {}

    data.forEach(element => {
      dataCache[element.Date] = element
    });
  }

  return dataCache
}

export function getMockDataKeys() {
  return Object.keys(loadData())
}

export function getDataByDate(date) {
  const dailyData = loadData()[date] || {}
  if(dailyData) {
    return dailyData
  }
}
