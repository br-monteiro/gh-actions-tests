const fs = require('fs')
const { argv } = require('process')

const CHECK_RELEASE_TYPE_PATTERN = /^(MAJOR|MINOR|PATCH)$/
const EXTRACT_VERSION_NUMBERS_PATTERN = /^(\d+)\.(\d+).(\d+)$/
const releaseType = argv[2]?.match(CHECK_RELEASE_TYPE_PATTERN) ? argv[2] : 'PATCH'
const FILES = [
  'package.json',
  'src/manifest.json',
]

function updateVersion(target, type) {
  let [ _, major, minor, patch ] = EXTRACT_VERSION_NUMBERS_PATTERN.exec(target)

  if (type === 'MAJOR') {
    major = Number(major) + 1
  } else if (type === 'MINOR') {
    minor = Number(minor) + 1
  } else {
    patch = Number(patch) + 1
  }

  return `${major}.${minor}.${patch}`
}

FILES.forEach((file) => {
  const contentString = fs.readFileSync(file).toString()
  const contentJson = JSON.parse(contentString)

  contentJson.version = updateVersion(contentJson.version, releaseType)

  fs.writeFileSync(file, JSON.stringify(contentJson, null, 2))
  console.log(`#### update version of ${file} to ${contentJson.version}`)
})
