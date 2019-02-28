let actdb = require('../databases/actdb')
async function search(ctx, next) {
    let actName = ctx.request.query.name
    let actArray = []
    if (actName) {
        let likeName = '%' + actName.split("").join('%') + '%'
        await actdb.findAll({
            order: ['count'],
            where: {
                head: {
                    $like: likeName
                },
                review: 1//只能搜索到已经通过审核的活动
            },
            attributes: ['id', 'head']
        }).then((res) => {
            actArray = res
        })
    } else {
        await actdb.findAll({
            order: ['count'],
            limit: 6,
            where: {
                review: 1//展示已通过审核的参加人数最多的前6个活动
            },
            attributes: ['id', 'head']
        }).then((res) => {
            actArray = res
        })
    }
    ctx.body = actArray
}
module.exports = search