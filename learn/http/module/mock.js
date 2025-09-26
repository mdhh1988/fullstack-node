import fs from 'node:fs';
import path from 'node:path';

let dataCache = null

function loadData() {
  if(!dataCache) {
    const file = path.resolve(__dirname, '../../mock/data.json')
    const data = JSON.parse(fs.readFileSync(file, {encoding: 'utf-8'}))
    const reports = data.dailyReports
    dataCache = {}

    reports.forEach(element => {
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
