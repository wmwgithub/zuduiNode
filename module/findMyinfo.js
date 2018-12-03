const teaminfodb = require('../databases/teaminfodb')

function info() {
    return async (ctx, next) => {
        let data = ctx.request.query
        async function out() {
           return teaminfodb.findAll({
                where: {
                    actid: data.actid,
                    openid: data.openid
                }
            }).then((res) => {
               // console.log(res[0].dataValues)
                if (res.length == 0) {
                    return true
                } else {
                    return res[0].dataValues
                }
            })
        }
        var userInfo = await out()
        console.log("userinfo",userInfo)
        if (userInfo == true) {
            ctx.body = {
                "myAct": true
            }
        } else {
            ctx.body = {
                "myAct": false,
                "tel": userInfo.tel,
                "name": userInfo.name,
                "qq": userInfo.qq
            }
        }
    }
}

module.exports = info()