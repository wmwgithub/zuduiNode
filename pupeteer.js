const puppeteer = require('puppeteer')
const express = require('express')
const cheerio = require('cheerio')
let app = express()
app.get('/judgeid', async (req, res) => {
    // console.log(req.query)
    let browser = await (puppeteer.launch({
        timeout: 15000,
        ignoreHTTPSErrors: true,
        devtools: false,
        headless: true
    }))//浏览器一些设置
    let page = await browser.newPage()//创建一个新空白页
    await page.goto('http://jxglstu.hfut.edu.cn/eams5-student/login')//进入教务系统用户登陆界面
    await page.keyboard.press('Tab')
    await page.keyboard.type('2017213893')
    await page.keyboard.press('Tab')
    await page.keyboard.type('033519')
    await page.keyboard.press('Enter')
    await page.goto('http://jxglstu.hfut.edu.cn/eams5-student/my/profile')//进入档案
    let html = await page.content()
    let $ = cheerio.load(html)
    let info = $('.col-md-6 span').toArray()
    res.send({ name: info[0].firstChild.data, tel1: info[7].firstChild.data, tel2: info[8].firstChild.data })
})
app.listen(8002)
console.log('run at port 8002')