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
                }
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
            },
            attributes: ['id', 'head']
        }).then((res) => {
            actArray = res
        })
    }
    ctx.body = actArray
}
module.exports = search