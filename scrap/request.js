'use strict'
const request = require('request')
const iconv = require('iconv-lite') // 语言编码转换库 ->utf-8
const cheerio = require('cheerio') // node层的jq库

function ajax (url, cb, opts = {}) {
  request(url, {
    ...opts, encoding: null
  }, cb)
}

for (let i = 100553; i < 100700; i++) {
  const url = `https://www.dy2018.com/i/${i}.html`
  ajax(url, (err, res, data) => {
    if (err) {
      return console.log('err scrap 页信息面失败')
    }
    let html = iconv.decode(data, 'gb2312')
    // console.log(html)
    var $ = cheerio.load(html)
    console.log(`${i}: ${$('.title_all')}`)
  })
}