// test('测试autotest', () => {
//   let auto = new (require('../index'))()
//   let file = auto.getFileName('/abc/class.js')
//   console.log(file)
//   expect(file).toBe('/abc/__test__/class.spec.js')
// })

// test('测试getSource', () => {
//   let auto = new (require('../index'))()
//   let file = auto.getTestSource('fun', 'class')
//   console.log(file)
//   expect(file).toBe(`
//   test('Test fun', () => {
//     let fun = new (require('../index'))()
//     let file = fun()
//     console.log(file)
//     // expect(file).toBe('/abc/__test__/class.spec.js')
//   })
//   `)
// })

// 代码自动生成测试
const fs = require('fs')
test('代码自动生成测试', () => {
  fs.rmdirSync(__dirname + '/codes/__test__', { recursive : true })
  let auto = new (require('../index'))()
  auto.getJestSource(__dirname + '/codes')
})