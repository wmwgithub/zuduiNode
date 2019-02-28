const carddb = require('../databases/carddb')
const joindb = require('../databases/joindb')
async function getcard(ctx, next) {
    let data = ctx.request.query
    let date = new Date()
    let cardtime = '' + date.getFullYear() + (date.getMonth() + 1) + date.getDate()
    let iscard
    await joindb.findOne({
        where: {
            open_id: data.openid,
            act_id: data.actid
        }
    }).then((res) => {
        iscard = res.iscard
    })
    if (iscard == 1) {
        ctx.body = {
            iscard: 1
        }
        return 0
    }
    await carddb.create({
        openid: data.openid,
        actid: data.actid,
        iscard: 1,
        cardtime: cardtime,
        cardtext: data.text
    })
    await joindb.update({
        'iscard': 1
    }, {
            where: {
                user_id: data.userid,
                open_id: data.openid,
                act_id: data.actid
            }
        })
    ctx.body = {
        "iscard": true,
    }
}
module.exports = getcard