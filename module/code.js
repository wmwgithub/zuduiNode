const koa2Req = require('koa2-request')
function code() {
    return async (ctx, next) => {
        let obj = ctx.request.query
        // userinfo = JSON.parse(obj.userinfo)
        // // console.log("code-obj",userinfo)
        let appid = obj.appid
        // let encryptedData = userinfo.encryptedData
        let secret = obj.secret
        let js_code = obj.js_code
        // let iv = userinfo.iv
        var res = await koa2Req(`https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${js_code}&grant_type=authorization_code`);
        let requestInfo =JSON.parse(res.body)
        console.log("requestInfo", requestInfo)
        let sessionKey = requestInfo.session_key
        let openid = requestInfo.openid
        let errcode = requestInfo.errcode
        let errmsg = requestInfo.errmsg
        if (openid) {
            ctx.body = {
                openid
            }
            return 0
        }
        ctx.body = {
            errcode,
            errmsg
        }

        // if (data.openId) {

        //     (async () => {
        //         var dog = await user.create({
        //             name: (new Date).getTime(),
        //             image: data.avatarUrl,
        //             openid: data.openId,
        //             city: data.city,
        //             province: data.province,
        //             country: data.country
        //         });
        //         console.log('created: ' + JSON.stringify(dog));
        //     })();

        // }
    }
}
module.exports = code()