
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
        //res 为数组 数组长度是打卡人数 数组里面含用户头像
       ctx.body=res
    })
}
module.exports = findwe