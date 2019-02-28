const WXBizDataCrypt = require('./WXBizDataCrypt')
const koa2Req = require('koa2-request')
async function code(ctx, next) {
    let data = ctx.request.query
    let userInfo = JSON.parse(data.userInfo)
    console.log(data)
    let [appid, encryptedData, secret, js_code, iv] = [data.appid, data.encryptedData, data.secret, data.js_code, data.iv]
    let res = await koa2Req(`https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${js_code}&grant_type=authorization_code`);
    res = JSON.parse(res.body)
     console.log(res)
    let sessionKey = res.session_key
    let pc = new WXBizDataCrypt(appid, sessionKey)
    let userinfo =pc.decryptData(encryptedData, iv)
    if(userinfo.openId){
        ctx.body = userinfo
        return 0
    }else if(res.openid){
        //注意一个是openId 一个是openid
        ctx.body={
            openId:res.openid,
            ...userInfo
        }
    }else{
        ctx.body=null
    }
}
module.exports = code