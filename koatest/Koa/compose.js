function compose (fns) {
  return function () {

    return dispatch(0)

    function dispatch (idx) {
      let fn = fns[idx]
      if (!fn) return Promise.resolve()
      return Promise.resolve(
        fn(
          function next () {
            return dispatch(idx + 1)
          }
        )
      )
    }
  }
}

const mockFn = str => console.log(str)
const ms = [
  async next => {
    mockFn('1 start')
    next()
    mockFn('1 end')
  },
  async next => {
    mockFn('2 start')
    next()
    mockFn('2 end')
  }
]

compose(ms)()