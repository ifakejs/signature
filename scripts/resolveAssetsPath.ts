import * as fs from 'fs'
import * as path from 'path'

const baseEntry = [
  path.resolve(__dirname, '../index.html'),
  path.resolve(__dirname, '../normal.html')
]

function task(entrys: string[]): void {
  entrys.forEach((entry, index) => {
    const data = fs.readFileSync(entry).toString('utf-8')
    let newData
    // handle the normal path when come from index.html
    if (index === 0) {
      newData = data
        .replace(/dist\/index\.umd\.js/, '/signature/index.umd.js')
        .replace(/\/normal\.html/, '/signature/normal.html')
    } else {
      newData = data.replace(/dist\/index\.umd\.js/, '/signature/index.umd.js')
    }
    fs.writeFileSync(entry, newData)
  })
}

task(baseEntry)
