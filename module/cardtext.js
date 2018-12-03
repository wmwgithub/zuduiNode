const card = require('../databases/carddb')

function cardtext() {
    return async (ctx, next) => {
        let data = ctx.request.query
        async function text() {
            return card.findAll({
                where: {
                    id: data.cardid
                }
            }).then((res) => {
                return res[0].dataValues
            })
        }
        out = await text()
        console.log("out", out)
        ctx.body = {
            "cardinfo": out
        }
    }
}
module.exports = cardtext()