const path = require('path')
module.exports = class AutoTest {
  getFileName (fname) {
    const dirPath = path.dirname(fname)
    const name = path.basename(fname)
    const ext = path.extname(fname)
    const destname = `${dirPath + name}.spec.${ext}`
    return destname
  }
}