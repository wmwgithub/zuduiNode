const card = require('../databases/carddb')
const userdb = require('../databases/userdb')
async function cardinfo(ctx, next) {
    let data = ctx.request.query
    await card.findAll({
        where: {
            actid: data.actid
        },
        include:[{
            model:userdb,
            where:{
                openid:data.openid
            }
        }]
    }).then((res) => {
        res.forEach((value)=>{
            value.imglength=new Array(value.imglength)
        })
        ctx.body=res
    })
}
module.exports = cardinfo