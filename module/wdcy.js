const join = require('../databases/joindb')
const act = require('../databases/actdb')

function wdcy() {
    return async (ctx, next) => {
        let wdcyarr = []
        var data = ctx.request.query

        async function fun(data) {
            return join.findAll({
                where: {
                    open_id: data.openid
                }
            }).then((res) => {
                if (res[0]) {
                    for (let i = 0; i < res.length; i++) {
                        wdcyarr.push(res[i].dataValues)
                    }
                }
                return wdcyarr
            })

        }
        var out = await fun(data)
         console.log('wdcy',out)
        let actinfo = []
        for (let i = 0; i < out.length; i++) {
            let actid = out[i].act_id
            //console.log(actid)
            async function fun2(data) {
                return act.findAll({
                    where: {
                        id: actid
                    }
                }).then((res) => {
                    if (res[0]) {
                        actinfo.push(res[0].dataValues)
                    }
                    return actinfo
                })
            }
            await fun2(data)
        }
        ctx.body = {
            "arr": actinfo
        }
    }
}
module.exports = wdcy()