const act = require('../databases/actdb')
const join = require('../databases/joindb')
const actdb = require('../databases/actdb')
//userjoin表 中act_id = active表中id 且active表中type=1
async function needcard(ctx, next) {
    let data = ctx.request.query
    await join.findAll({
        where: {
            open_id: data.openid
        },
        include: [{
            model: actdb,
            where: {
                type: 1
            }
        }]
    }).then((res) => {
        console.log(res)
        ctx.body = res
    })
}
module.exports = needcard