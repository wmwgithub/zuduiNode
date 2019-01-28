const act = require('../databases/actdb')

function wdfb() {
    return async (ctx, next) => {
        let wdfbarr = []
        var data = ctx.request.query
        async function fun(data) {
            return act.findAll({
                where: {
                    open_id: data.openid
                }
            }).then((res) => {
                if (res[0]) {
                    for (let i = 0; i < res.length; i++) {
                        wdfbarr.push(res[i].dataValues)
                    }
                }
                return wdfbarr
            })

        }
        var out = await fun(data)
        //console.log(out)
        ctx.body = {
            "arr": out
        }
    }
}
module.exports = wdfb()