import fs from 'node:fs';
import path from 'node:path';

let dataCache = null

function loadData() {
  if(!dataCache) {
    const file = path.resolve(__dirname, '../../mock/data.json')
    const data = JSON.parse(fs.readFileSync(file, {encoding: 'utf-8'}))
    const reports = data.dailyReports
  }
}