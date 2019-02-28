const card = require('../databases/carddb')
async function cardday(ctx, next) {
    let [actid,openid]=[ctx.request.query.actid,ctx.request.query.openid]
    await card.findAll({
        where:{
            actid:actid,
            openid:openid
        }
    }).then((res)=>{
        ctx.body={
            'card_day':res.length
        }
    })
    return 0
}
module.exports = cardday