const userdb = require('../databases/userdb')
const card = require('../databases/carddb')
const sequelize = require('sequelize')
async function gread(ctx, next) {
    let data = ctx.request.query
    //data:{actid:'',openid:''}
    await card.findAll({
        attributes: ['openid', [sequelize.fn('COUNT', sequelize.col('iscard.openid')), 'day']],
        order: [[sequelize.fn('COUNT', sequelize.col('iscard.openid')), 'DESC']],
        where: {
            actid: data.actid,
        },
        group: 'iscard.openid',
        include: [{
            model: userdb
        }]

    }).then((res) => {
        console.log(res)
        let day, order
        res.forEach((value, index, input) => {
            if (value.openid == data.openid) {
                day = value.dataValues.day
                order = index + 1
            }
        })
        if (res.length <= 3) {
            ctx.body = {
                phb_arr: res,
                day,
                order
            }
        } else {
            ctx.body = {
                phb_arr: [res[0].dataValues,res[1].dataValues,res[2].dataValues],
                day,
                order
            }
        }

    })
    return 0
}
module.exports = gread