let joindb = require('../databases/joindb')
async function showjoinuser(ctx, next) {
    await joindb.findAll({
        where:{
            act_id:ctx.request.query.actid
        }
    }).then((res)=>{
        ctx.body=res
    })

}
module.exports = showjoinuser