const act = require('../databases/actdb')

function endfb() {
    return async (ctx, next) => {
        // console.log(ctx.request.query)
        act.update({
            "isend": 0
        }, {
            where: {
                id: ctx.request.query.actid
            }
        })
        ctx.body = {
            "data": "success"
        }
    }
}

module.exports = endfb()
