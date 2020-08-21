const app = new (require('koa'))()

app.use(async (ctx, next) => {
  const start = Date.now()
  await next() // 等待后续所有步骤完成
  const end = Date.now()
  console.log(`耗时：${ end - start }ms`)
  ctx.body = "hello world"
})

app.use(async (ctx, next) => {
  
  ctx.body = "hello world"
})

app.listen(3000, () => {
  console.log('服务开启')
})