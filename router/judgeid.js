let anxios = require('axios')
let CryptoJS = require('crypto-js')//加密算法模块
let schoolUrl = 'http://jxglstu.hfut.edu.cn/eams5-student'
async function judgeid(ctx, next) {
    let data = ctx.request.query
    let [stdid, pwd] = [data.stdid, data.pwd]
    // console.log(stdid, pwd)
    //拿到密码salt
    let encryptPasssword = null
    let cookie = null
    await anxios
        .get(schoolUrl + '/login-salt')
        .then((salt) => {
            encryptPasssword = new String(CryptoJS.SHA1(salt.data + '-' + pwd))+""
            cookie=salt.data
        })
    let postData = {
        username: stdid,
        password: encryptPasssword,
        captcha: ''
    }
    console.log(postData.password)
    anxios({
        method: 'post',
        url: schoolUrl + '/home',
        data: JSON.stringify(postData),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((stdinfo) => {
        console.log(stdinfo)
    })


}
module.exports = judgeid
// 上述办法放弃 改用模拟浏览器方式