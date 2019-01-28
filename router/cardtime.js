const card = require('../databases/carddb')
function cardtime() {
    return async (ctx, next) => {
        let data = ctx.request.query
        async function time(data) {
            return card.findAll({
                where: {
                    actid: data.actid
                }
            }).then((res) => {
                return res[0].dataValues
            })
        }
        var out = await time(data)
        // console.log(out)
        ctx.body = {
            "cardtime": out.cardtime
        }
    }
}

module.exports = cardtime()