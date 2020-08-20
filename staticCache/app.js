const http = require('http')

http.createServer((req, res) => {
  const { url } = req
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

    // 增加强缓存
    // http 1.1 的Cache-Control优先级更强

    // http 1.0
    // 10秒之内使用缓存
    res.setHeader('Expires', new Date(Date.now() + 10000).toUTCString()) // Expires

    // http 1.1
    // 20秒之内使用缓存
    res.setHeader('Cache-Control', 'max-age=20') // Cache-Control

    res.statusCode = 200
    res.end(`document.write('time: ${Date.now()}')`)
  } else if (url === '/favicon.ico') {
    res.end('')
  }
}).listen(3000, () => {
  console.log('服务启动')
})