const join = require('../databases/joindb')
async function userjoin(ctx, next) {
    var data = ctx.request.query
    await join.create({
        user_id: data.userid,
        open_id: data.openid,
        act_id: data.actid,
        iscard: 0,
        time: (new Date).getTime(),
        name:data.name,
        qq:data.qq,
        phone:data.phone
    })
    ctx.body = {
        "join": true
    }
}
module.exports = userjoin