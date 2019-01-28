const team = require('../databases/teaminfodb')

function teaminfo() {
    return async (ctx, next) => {
        var data = ctx.request.query
        console.log(data)
        if (data.update == "true") {
            var out = await team.update({
                name: data.name,
                tel: data.tel,
                qq: data.qq
            }, {
                where: {
                    openid: data.openid,
                    actid: data.actid,
                }
            })
        } else {
            var out = await team.create({
                openid: data.openid,
                actid: data.actid,
                name: data.name,
                tel: data.tel,
                qq: data.qq
            })
        }
        if (out) {
            ctx.body = {
                "msg": 1
            }
        }
    }
}
module.exports = teaminfo()