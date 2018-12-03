const join = require('../databases/joindb')

function endcy() {
    return async (ctx, next) => {
        console.log(ctx.request.query)
        join.destroy({
            where: {
                act_id: ctx.request.query.actid,
                open_id: ctx.request.query.openid
            }
        }).then((res) => {
            // ctx.body = {
            //     "data": "success"
            // }
        })
        ctx.body = {
            "data": "success"
        }
    }
}
module.exports = endcy()
