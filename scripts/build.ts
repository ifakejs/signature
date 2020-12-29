import * as path from 'path'
import { execSync } from 'child_process'
import fsExtra from 'fs-extra'
import chalk from 'chalk'

function resolve(p: string): string {
  return path.resolve(__dirname, '..', p)
}

function copyDTS(): void {
  console.log(chalk.cyan('> start copying .d.ts file to dist dir of library own.'))
  const sourceDir = resolve('lib/src')
  const targetDir = resolve('lib')
  fsExtra.copySync(sourceDir, targetDir)
  console.log(chalk.cyan('> copy job is done.'))
  execSync(`rm -rf ${resolve('lib/src')}`)
  execSync(`rm -rf ${resolve('lib/__test__')}`)
  execSync(`rm -rf ${resolve('dist/src')}`)
  execSync(`rm -rf ${resolve('dist/__test__')}`)
}

try {
  copyDTS()
} catch (e) {
  console.log(e)
  process.exit(1)
}
