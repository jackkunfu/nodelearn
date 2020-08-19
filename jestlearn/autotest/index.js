const path = require('path')
const fs = require('fs')
module.exports = class AutoTest {

  testFile (p) {
    let testFname = this.getFileName(p)
    if (fs.existsSync(testFile)) return
    let mod = require(p)
    let source
    let basename = path.basename(p)
    if (typeof mod === 'object') {
      source = Object.keys(mod).map(el => this.getTestSource(el, basename, true)).join('\n')
    } else if (typeof mod === 'function') {
      source = this.getTestSource(basename.replace('.js', ''), basename)
    }
    fs.writeFileSync(testFname, source)
  }

  getJestSource (sourcePath = path.resolve('./')) {
    let sPath = sourcePath + '/__test__'
    if (!fs.existsSync(sPath)) {
      fs.mkdirSync(sPath)
    }

    let list = fs.readdirSync(sPath)
    list.map(p => sourcePath + '/' + p) // 获取相对完整路径
      .filter(p => fs.statSync(p).isFile()) // 过滤文件
      .filter(p => p.indexOf('.spec') === -1) // 过滤测试代码
      .map(p => this.testFile(p))
  }

  getTestSource (fn, requirePath, isClass = false) {
    return `
      test('Test ${fn}', () => {
        let ${ isClass ? '{ fn }' : fn } = require('../${requirePath}'))
        let ret = ${fn}()
        console.log(ret)
        expect(ret).toBe('/data/__test__/${fn}.spec.js')
      })
    `
  }

  getFileName (fname) {
    const dirPath = path.dirname(fname)
    const name = path.basename(fname)
    const ext = path.extname(fname)
    const destname = `${dirPath}/__test__/${name.replace(ext, '')}.spec${ext}`
    console.log(dirPath, name, ext, destname)
    // return '/abc/__test__/class.spec.js'
    return destname
  }
}