module.exports = {
  get body () {
    return this.request.body
  },
  set body () {
    this.request.body = val
  }
}