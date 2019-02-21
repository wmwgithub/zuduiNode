const join = require('../databases/joindb')
const card = require('../databases/carddb')
const actdb = require('../databases/actdb')
async function endcy(ctx, next) {
    await join.destroy({
        where: {
            act_id: ctx.request.query.actid,
            open_id: ctx.request.query.openid
        },

    }).then((res) => {

    })
    await card.destroy({
        where: {
            actid: ctx.request.query.actid,
            openid: ctx.request.query.openid
        }
    }).then((res) => {

    })
    await actdb.findOne({
        where: {
            id: ctx.request.query.actid,
        }
    }).then(function (findres) {
        return findres.increment({'count':-1}).then((res)=>{

        })
    })


    ctx.body = 'ency'
}

module.exports = endcy
