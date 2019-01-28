const reasondb=require('../databases/reason')
async function reason(ctx,next){
    let openid = ctx.request.query.openid
    await reasondb.findAll({
        where:{
            openid:openid
        }
    }).then((res)=>{
        ctx.body = res
    })
}
module.exports=reason