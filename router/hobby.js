const act = require('../databases/actdb')
function hobby(){
   return async (ctx, next) => {
        var obj = ctx.request.query
        await next()
        var out = await kk(obj)
        async function kk(obj_) {
            // console.log(obj_)
            return act.findAll({
                where: {
                    id: parseInt(obj_.id)
                }
            }).then((re) => {
                return re[0].dataValues
            })
        }
        ctx.response.type = 'text/html';
        ctx.response.body = out;
    }
}
module.exports= hobby()