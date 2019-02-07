const carddb = require('../databases/carddb')
const joindb = require('../databases/joindb')
async function getcard(ctx, next) {
    let data = ctx.request.query
    let iscard = create_join(data)
    let date = new Date()
    let cardtime = ''+date.getFullYear()+(date.getMonth()+1)+date.getDate()

    await carddb.create({
        userid: data.userid,
        openid: data.openid,
        actid: data.actid,
        iscard: 1,
        cardtime: cardtime,
        cardtext: data.text
    })

    await join.update({
        'iscard': 1
    }, {
            'where': {
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