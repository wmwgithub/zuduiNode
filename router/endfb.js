const actdb = require('../databases/actdb')

async function endfb(ctx, next) {

    await actdb.update({
        "isend": 0
    }, {
            where: {
                id: ctx.request.query.actid
            }
        })
    ctx.body = 'wdfb'
}
module.exports = endfb
