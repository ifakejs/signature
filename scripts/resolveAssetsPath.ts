import * as fs from 'fs'
import * as path from 'path'

const baseEntry = [
  path.resolve(__dirname, '../index.html'),
  path.resolve(__dirname, '../normal.html')
]

function task(entrys: string[]): void {
  entrys.forEach(entry => {
    const data = fs.readFileSync(entry).toString('utf-8')
    const newData = data.replace(/dist\/index\.umd\.js/, '/signature/index.umd.js')
    fs.writeFileSync(entry, newData)
  })
}

task(baseEntry)
