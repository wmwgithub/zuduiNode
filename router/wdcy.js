const join = require('../databases/joindb')
const actdb = require('../databases/actdb')

async function wdcy(ctx,next) {
    let wdcyarr = []
    let data = ctx.request.query
    await join.findAll({
        where: {
            open_id: data.openid,
            creater:0,
        },
        include:[{
            model:actdb,
            where:{
                isend:1
            }
        }]
    }).then((res) => {
        wdcyarr=res
    })
    ctx.body=wdcyarr
}
module.exports = wdcy