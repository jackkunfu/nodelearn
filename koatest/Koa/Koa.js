const http = require('http')
const context = require('./ctx')
const request = require('./req')
const response = require('./res')

class Koa {

  constructor () {
    this.middlewares = []
  }

  listen (port, cb) {
    const server = http.createServer((req, res) => {
      let ctx = this.createCtx(req, res)

      // this.callback(ctx)
      this.compose(this.middlewares)
      
      res.end(ctx.body)
    })

    server.listen(port, cb)
  }

  use (cb) {
    // this.callback = cb
    this.middlewares.push(cb)
  }

  createCtx (req, res) {
    const ctx = Object.create(context)
    ctx.request = Object.create(request)
    ctx.response = Object.create(response)

    ctx.req = ctx.request.req = req
    ctx.res = ctx.response.res = res

    return ctx
  }
}