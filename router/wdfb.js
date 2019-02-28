const actdb = require('../databases/actdb')

async function wdfb(ctx, next) {
    await actdb.findAll({
        where: {
            isend:1,//没有结束的
            open_id: ctx.request.query.openid
        }
    }).then((res) => {

        ctx.body = res
    })
}
module.exports = wdfb