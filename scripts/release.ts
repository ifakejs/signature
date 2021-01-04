import { execSync } from 'child_process'
import chalk from 'chalk'

const target = process.argv[2]
const allowVersionMark = [
  'minor',
  'major',
  'patch',
  'premajor',
  'prepatch',
  'prerelease',
  'prerelease',
  'from-git'
]

if (!allowVersionMark.includes(target)) {
  console.log(chalk.red('不被允许的版本'))
  process.exit(1)
}
execSync('yarn run changelog')
execSync('git add .')
execSync('git commit -m "docs: update changelog"')
execSync(`npm version ${target} -m "release: v%s"`)
console.log(chalk.green('Success to add tag.'))
