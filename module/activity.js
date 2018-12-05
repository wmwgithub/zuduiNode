const act = require('../databases/actdb')
const join = require('../databases/joindb')
var activity= function () {
  return async (ctx, next) => {
        var obj = ctx.request.query
        var out = await kk(obj,1)
        async function kk(obj_,isend=1) {
            return act.findAll({
                order:[['id','DESC']],
                where: {
                    type: [parseInt(obj_.x), parseInt(obj_.y)],
                    isend:isend
                }
            }).then((res) => {
                return res
            })
        }
        for (let i = 0; i < out.length; i++) {
            join.findAll({
                where: {
                    act_id: out[i].dataValues.id
                }
            }).then((res) => {
                // out[i].dataValues.count = res.length
                //console.log(res.length)
                act.update({
                    'count': res.length
                }, {
                    'where': {
                        id: out[i].dataValues.id
                    }
                })

            })
        }
        let out2 = await kk(obj,1)
        let endArr = await kk(obj,0)
        // console.log('endArr',endArr)
        out2.push.apply(out2,endArr)
        if (out2.length > 0) {
            ctx.response.type = 'text/html';
            ctx.response.body = out2;
        } else {
            ctx.body = {
                "data": "success"
            }
        }
    }
}
module.exports = activity()