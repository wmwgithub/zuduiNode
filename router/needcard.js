const act = require('../databases/actdb')
const join = require('../databases/joindb')

function needcard() {
    return async (ctx, next) => {
        var obj = ctx.request.query
        let join_arr = []
        var out = await kk(obj)
        async function kk(obj_) {
            return join.findAll({
                where: {
                    open_id: obj_.openid
                }
            }).then((res) => {
                for (let i = 0; i < res.length; i++) {
                    join_arr[i] = res[i].dataValues
                }
                return join_arr
            })
        }
        console.log("needcard_out",out)

        let acts = []
        for (let i = 0; i < out.length; i++) {
                await act.findAll({
                    where: {
                        id: out[i].act_id
                    }
                }).then((res) => {
                    if (res.length > 0 & res[0].dataValues.type == 1) {
                        var str = Object.assign(res[0].dataValues, {
                            'iscard': out[i].iscard
                        })
                        // console.log("str",str)
                        acts.push(str)
                    }
                })
        }
        
        console.log(acts)

        ctx.body = acts;
    }
}
module.exports = needcard()