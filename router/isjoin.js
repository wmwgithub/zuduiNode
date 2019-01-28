const join = require('../databases/joindb')
function isjoin() {
    return async (ctx, next) => {
        var data = ctx.request.query
        console.log("isjoindata", data)
        var out = await find(data)
        async function find(data) {
            return join.findAll({
                where: {
                    open_id: data.openid,
                    act_id: data.actid
                }
            }).then((res) => {
                if (res.length == 0) {
                    if (data.userid > 0) {
                        //console.log("cuanjianyonghu")
                        var isjoin = create_join(data)
                        async function create_join(data) {
                            var cre_join = await join.create({
                                user_id: data.userid,
                                open_id: data.openid,
                                act_id: data.actid,
                                iscard: 0,
                                time: (new Date).getTime()
                            })
                            console.log("cre_join", cre_join)
                        }
                        ctx.body = {
                            "isjoin": true,
                            "buttontext": "您已加入"
                        }
                    } else {
                        ctx.body = {
                            "isjoin": false,
                            "buttontext": "我要加入"
                        }
                    }
                } else {

                    ctx.body = {
                        "isjoin": true,
                        "buttontext": "您已加入"
                    }
                }
            })
        }
    }
}
module.exports = isjoin()