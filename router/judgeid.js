let anxios = require('axios')
let CryptoJS = require('crypto-js')//加密算法模块
let schoolUrl = 'http://jxglstu.hfut.edu.cn/eams5-student'
let schoolCryptoJS = require('../sha1')
let cheerio = require('cheerio')
async function judgeid(ctx,next) {
    let data = ctx.request.query
    let [stdid, pwd] = [2017213893, '033519']
    // console.log(stdid, pwd)
    //拿到密码salt
    let encryptPasssword = null
    let success = false
    let saltcookie = null
    await anxios
        .get(schoolUrl + '/login-salt')
        .then((salt) => {
            console.log('salt',salt.data)
            saltcookie = salt.headers['set-cookie'][0].split(';')
            saltcookie = saltcookie[0]
            console.log('----------------')
            console.log(salt.data + '-' + pwd)
            
            encryptPasssword = new String(schoolCryptoJS.SHA1(salt.data + '-' + pwd)) + ""
            
            // console.log('encryptPasssword',new String(schoolCryptoJS.SHA1('e7eb0407-5672-4ab2-8fe4-c374ca01ea58-33519')))
            console.log('encryptPasssword',encryptPasssword)
        })
    // console.log('saltcookie', saltcookie)

    let postData = {
        username: stdid,
        password: encryptPasssword,
        captcha: ''
    }
    // 本来以为 请求 login 还会返回新的cookie
    //实际上这一步在学校教务系统里面的作用 就是吧上一步拿到的saltcookie和你自己建立一个对应关系
    await anxios({
        method: 'post',
        url: schoolUrl + '/login',
        data: JSON.stringify(postData),
        headers: {
            'Content-Type': 'application/json',
            'Cookie': saltcookie
        }
    }).then((stdinfo) => {
        if (stdinfo.data.result == true) {
            success = true
        }
    })

    // 用刚刚拿到的cookie请求新的接口获取信息
    // 请求 学生档案  http://jxglstu.hfut.edu.cn/eams5-student/my/profile
    let infoArray=[]
    await anxios({
        method: 'get',
        url: schoolUrl + '/my/profile',
        headers: {
            'Cookie': saltcookie
        }
    }).then((myprofile) => {
        // 用cherio解析html文件、
        let html=myprofile.data
        let $ = cheerio.load(html)
        let info = $('.col-md-6 span').toArray()
        // console.log(info)
        info.forEach((value,index,input)=>{
            if(value.firstChild){
            infoArray[index]=value.firstChild.data
            }else{
            infoArray[index]=null
            }
        })
        // console.log(info)
        // console.log(infoArray)
    })
    // let lesson=[]
    // //获取学生课表信息  http://jxglstu.hfut.edu.cn/eams5-student/ws/schedule-table/datum
    // await anxios({
    //     method:'post',
    //     url:schoolUrl+'/ws/schedule-table/datum',
    //     headers:{
    //         'Cookie':saltcookie
    //     }
    // }).then((lesson)=>{
    //     console.log(lesson.data)
    // })
     ctx.body=infoArray
}
module.exports = judgeid
