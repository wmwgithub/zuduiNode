const card = require('../databases/carddb')
async function gettime(ctx, next) {
    let data = ctx.request.query
    // actid,openid
    let out_time=[]
    await card.findAll({
        where: {
            actid: data.actid,
            openid: data.openid
        }
    }).then((res) => {
        res.forEach((value,index)=>{
            out_time[index]=value.dataValues.cardtime
        })
    })
    ctx.body = {
        "out_time": out_time
    }
}
module.exports = gettime