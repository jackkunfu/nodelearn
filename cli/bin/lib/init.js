const { promisify } = require('util')
const figlet = promisify(require('figlet')) // 包装使用async await工具 字体放大
const clear = require('clear')
const chalk = require('chalk') // 粉饰文字

const { clone } = require('./download')

const log = text => console.log(chalk.red(text))

// 安装依赖命令
const spawn = async (...argus) => {
  const { spawn } = require('child_process')
  return new Promise((rs, rj) => {
    const proc = spawn(...argus)
    proc.stdout.pipe(process.stdout) // 子进程的数据流和主进程流关联
    proc.stderr.pipe(process.stderr) // 子进程的错误数据流和主进程流关联
    proc.on('close', rs)
  })
}

module.exports = async str => {
  clear()
  
  // 打印粉饰字体
  log(await figlet(str))

  log('创建项目')

  // 下载模板
  log('下载模板')
  await clone('github:su37josephxia/vue-template', str)

  // 安装依赖
  log('安装依赖...')
  await spawn(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['install'], { cwd: `./${str}` })
  log(
    chalk.red(`
    ---------------
    cd ${str}
    npm run serve
    ---------------
    `)
  )
}