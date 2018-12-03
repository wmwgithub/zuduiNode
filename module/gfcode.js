const WXBizDataCrypt=require('../WXBizDataCrypt')
const koa2Req = require('koa2-request')
function code() {
    return async (ctx, next) => {
        let obj = ctx.request.query
        let appid = obj.appid
        let encryptedData = obj.encryptedData
        let secret = obj.secret
        let js_code = obj.js_code
        let iv = obj.iv
        var res = await koa2Req(`https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${js_code}&grant_type=authorization_code`);
        let obj2 = JSON.parse(res.body)
        let sessionKey = obj2.session_key
        let openid = obj2.openid
       var pc = new WXBizDataCrypt(appid, sessionKey)
        var run = pc.decryptData(encryptedData, iv)
        if (openid) {
            ctx.response.body = {
                openid,
                run
            }
        }
       
    }
}
module.exports = code()