#!/usr/bin/env node

/*
 * 配置开发工具  package.json 中增加 "bin": { "命令名称": "命令执行的js的相对路径" }
 * npm i commander download-git-repo ora handlebars figlet clear chalk -S
 */

const cmd = require('commander')
cmd.version(require('../package.json').version)

// 设置 init 命令
cmd.command('init <name>')
  .description('init project')
  .action(name => {
    // init 命令相关的操作
    require('./lib/init')(name)
  })

cmd.parse(process.argv) // 解析输入的命令


