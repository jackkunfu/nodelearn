const { promisify } = require('util')

async function clone (repo, des) {
  const download = promisify(require('download-git-repo'))

  // 显示进度打印
  const ora = require('ora')
  const progress = ora(`下载 ${ repo }`)
  progress.start() // 启动旋转动效 表示下载中
  try {
    await download(repo, des)
  } catch (e) {
    console.log(e)
  }
  progress.succeed()
}

module.exports.clone = clone