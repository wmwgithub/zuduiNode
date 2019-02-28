
const card = require('../databases/carddb')
const userdb = require('../databases/userdb')
async function findwe(ctx, next) {
    let data = ctx.request.query
    await card.findAll({
        where: {
            actid: data.actid
        },
        group: 'openid',
        include: [{
            model: userdb
        }]
    }).then((res)=>{
       ctx.body=res
    })
}
module.exports = findwe