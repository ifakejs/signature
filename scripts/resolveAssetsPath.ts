import * as fs from 'fs'
import * as path from 'path'

const baseEntry = [
  path.resolve(__dirname, '../index.html'),
  path.resolve(__dirname, '../index-default.html'),
  path.resolve(__dirname, '../index-with-guide-line.html')
]

function task(entrys: string[]): void {
  entrys.forEach((entry, index) => {
    const data = fs.readFileSync(entry).toString('utf-8')
    let newData
    // handle the normal path when come from index.html
    if (index === 0) {
      newData = data
        .replace(/dist\/index\.umd\.js/, '/signature/index.umd.js')
        .replace(/\/index-default\.html/, '/signature/index-default.html')
        .replace(/\/index-with-guide-line\.html/, '/signature/index-with-guide-line.html')
    } else {
      newData = data.replace(/dist\/index\.umd\.js/, '/signature/index.umd.js')
    }
    fs.writeFileSync(entry, newData)
  })
}

task(baseEntry)
