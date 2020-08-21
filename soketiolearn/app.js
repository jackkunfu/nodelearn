const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
  let a = Date.now()

  socket.on('msg', msg => {
    io.emit('msg', msg) // 广播给所有人msg
  })

  socket.on('disconnect', data => { console.log(a + ' disconnnect', data) })
})

http.listen(3000, () => {
  console.log('服务启动')
})