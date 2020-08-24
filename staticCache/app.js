const http = require('http')
const crypto = require('crypto') // 加密
const { fstat } = require('fs')

http.createServer((req, res) => {
  const { url, method } = req
  if (url === '/') {
    res.end(
      `<html>
        <head><script src="main.js"></script></head>
        <body>
          html ${Date.now()}
        </body>
      </html>`
    )
  } else if (url === '/main.js') {

    let content = `document.write('time: ${Date.now()}')`

    // // 强缓存
    // // http 1.1 的Cache-Control优先级更强
    // // http 1.0
    // // 10秒之内使用缓存
    // res.setHeader('Expires', new Date(Date.now() + 10000).toUTCString()) // Expires
    // // http 1.1
    // // 20秒之内使用缓存
    // res.setHeader('Cache-Control', 'max-age=20') // Cache-Control

    // 协商缓存 last-modified  if-modified-since
    // res.setHeader('Cache-Control', 'no-cache') // 禁止强缓存
    // res.setHeader('last-modified', Date.now())
    // if (req.headers['if-modified-since'] - 0 + 3 * 1000 > Date.now()) {
    //   res.statusCode = 304
    //   res.end()
    //   return
    // }

    // 协商缓存 Etag if-none-match
    let hash = crypto.createHash('sha1').update(content).digest('hex')  // 经过sha1算法加密内容二进制转换为hex十进制数据字符串
    res.setHeader('Etag', hash)
    console.log(req.headers['if-none-match'], hash)
    if (req.headers['if-none-match'] === hash) {
      res.statusCode = 304
      res.end()
      return
    }

    res.statusCode = 200
    res.end(content)
  } else if (method === 'GET' && headers.accept && headers.accept.indexOf('image/*') > -1) { // 处理图片请求
    fs.createReadSteam(path.join('.') + url).pipe(res) // stream流方式返回
  } else if (url === '/favicon.ico') {
    res.end('')
  }
}).listen(3000, () => {
  console.log('服务启动')
})