const actdb = require('../databases/actdb')
const joindb = require('../databases/joindb')
async function actinfo(ctx, next) {
    let actid = ctx.request.query.id
    let openid = ctx.request.query.openid
    let active, joininfo
    await actdb.findAll({
        where: {
            id: parseInt(actid)
        }
    }).then((res) => {
        active = res[0].dataValues
    })
    active.actimage = new Array(active.actimage + 1)
    await joindb.findOne({
        where: {
            act_id: parseInt(actid),
            open_id: openid
        }
    }).then((res) => {
        joininfo = res.dataValues
    })
    if (joininfo) {
        ctx.body = { active, joininfo }
    } else {
        ctx.body = { active }
    }

}
module.exports = actinfo