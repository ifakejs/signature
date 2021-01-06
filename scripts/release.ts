// Reference from https://github.com/vitejs/vite. Thanks vitejs.
import * as path from 'path'
import * as fs from 'fs'
import enquirer from 'enquirer'
import chalk from 'chalk'
import execa from 'execa'
import semver from 'semver'
const args = require('minimist')(process.argv.slice(2))

type ReleaseType = 'major' | 'premajor' | 'minor' | 'preminor' | 'patch' | 'prepatch' | 'prerelease'

const pkgDir = process.cwd()
const pkgPath = path.resolve(pkgDir, 'package.json')
const pkg = require(pkgPath)
const pkgName = pkg.name
const currentVersion = pkg.version

const versionIncrements: Array<ReleaseType> = [
  'patch',
  'minor',
  'major',
  'prepatch',
  'preminor',
  'premajor',
  'prerelease'
]

/**
 * @type {boolean}
 */
const isDryRun = args.dry
/**
 * @type {boolean}
 */
const skipBuild = args.skipBuild

const inc = (i: ReleaseType) => semver.inc(currentVersion, i)

const step = (msg: string) => console.log(chalk.cyan(msg))

const run = (bin: string, args: string[], opts = {}) =>
  execa(bin, args, { stdio: 'inherit', ...opts })

const dryRun = (bin: string, args: string[], opts = {}) =>
  console.log(chalk.blue(`[dryrun] ${bin} ${args.join(' ')}`), opts)

const runIfNotDry = isDryRun ? dryRun : run

async function worker() {
  let targetVersion = args._[0]
  if (!targetVersion) {
    // no explicit version, offer suggestions
    // @ts-ignore
    const { release } = await enquirer.prompt({
      type: 'select',
      name: 'release',
      message: 'Select release type',
      choices: versionIncrements.map(i => `${i} (${inc(i)})`).concat(['custom'])
    })

    if (release === 'custom') {
      /**
       * @type {{ version: string }}
       */
      const res = await enquirer.prompt({
        type: 'input',
        name: 'version',
        message: 'Input custom version',
        initial: currentVersion
      })
      targetVersion = (res as any).version
    } else {
      targetVersion = (release as any).match(/\((.*)\)/)[1]
    }
  }
  if (!semver.valid(targetVersion)) {
    throw new Error(`invalid target version: ${targetVersion}`)
  }
  const tag = `v${targetVersion}`

  // @ts-ignore
  const { yes } = await enquirer.prompt({
    type: 'confirm',
    name: 'yes',
    message: `Releasing ${tag}. Confirm?`
  })

  if (!yes) {
    return
  }

  step('\nUpdating package version...')
  updateVersion(targetVersion)

  step('\nBuilding package...')
  if (!skipBuild && !isDryRun) {
    await run('yarn', ['build'])
  } else {
    console.log(`(skipped)`)
  }

  step('\nGenerating changelog...')
  await run('yarn', ['changelog'])

  const { stdout } = await run('git', ['diff'], { stdio: 'pipe' })
  if (stdout) {
    step('\nCommitting changes...')
    await runIfNotDry('git', ['add', '-A'])
    await runIfNotDry('git', ['commit', '-m', `release: ${tag}`])
  } else {
    console.log('No changes to commit.')
  }

  step('\nPublishing package...')
  await publishPackage(targetVersion, runIfNotDry)

  step('\nPushing to GitHub...')
  await runIfNotDry('git', ['tag', tag])
  await runIfNotDry('git', ['push', 'origin', `refs/tags/${tag}`])
  await runIfNotDry('git', ['push'])
}

function updateVersion(version: string) {
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
  pkg.version = version
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n')
}

async function publishPackage(version: string, runIfNotDry: Function) {
  const publicArgs = [
    'publish',
    '--no-git-tag-version',
    '--new-version',
    version,
    '--access',
    'public'
  ]
  if (args.tag) {
    publicArgs.push(`--tag`, args.tag)
  }
  try {
    await runIfNotDry('yarn', publicArgs, {
      stdio: 'pipe'
    })
    console.log(chalk.green(`Successfully published ${pkgName}@${version}`))
  } catch (e) {
    if (e.stderr.match(/previously published/)) {
      console.log(chalk.red(`Skipping already published: ${pkgName}`))
    } else {
      throw e
    }
  }
}

worker().catch(err => {
  console.error(err)
})
