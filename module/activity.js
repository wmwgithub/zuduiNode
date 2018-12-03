const act = require('../databases/actdb')
const join = require('../databases/joindb')
var activity= function () {
  return async (ctx, next) => {
        var obj = ctx.request.query
        var out = await kk(obj)
        async function kk(obj_) {
            return act.findAll({
                where: {
                    type: [parseInt(obj_.x), parseInt(obj_.y)]
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
        let out2 = await kk(obj)
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