const app = require('koa')()
const mysql = require('mysql')

const request = require('request')

function ajax (url, cb, opts = {}) {
  request(url, {
    ...opts, encoding: null
  }, cb)
}

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.listen(3000, () => {
  console.log('服务启动')
})