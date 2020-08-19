const { resolve } = require('path')
module.exports.getRouter = (p = resolve('./')) => {
  const list  = fs.readdirSync(p)
  return
`
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
${list.map(file => 
`
{
  path: '/${file.replace('.vue', '')}',
  name: '${file.replace('.vue', '')}',
  component: () => import('./views/${file}')
},
`).join('')}
  ]
})
`
}