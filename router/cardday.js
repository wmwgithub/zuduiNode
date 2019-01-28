const card = require('../databases/carddb')
const greaddb = require('../databases/greaddb')

function cardday() {
    return async (ctx, next) => {
        let data = ctx.request.query
        console.log(data)
        let num = 1
        async function cardday() {
            return card.findAll({
                where: {
                    openid: data.openid,
                    actid: data.actid
                }
            }).then((res) => {
                return res.length
            })
        }
        num = await cardday()
        //自己打卡天数
        let outarr = []
        async function cardgread() {
            return card.findAll({
                where: {
                    actid: data.actid
                }
            }).then((res) => {
                if (res.length > 0) {
                    for (let i = 0; i < res.length; i++) {
                        outarr.push(res[i].dataValues)
                    }
                    return outarr
                }
            })
        }
        var out = await cardgread()
        console.log("carddayout", out)

        var userid_arr = []
        for (let i = 0; i < out.length; i++) {
            userid_arr.push(out[i].userid)
        }
        userid_arr = Array.from(new Set(userid_arr))
        //console.log(userid_arr)
        let info_arr = []

        for (let i = 0; i < userid_arr.length; i++) {
            async function arr() {
                return card.findAll({
                    where: {
                        userid: userid_arr[i],
                        actid: data.actid
                    }
                }).then((res) => {
                    let obj
                    return obj = {
                        "a": i,
                        "b_userid": userid_arr[i],
                        "c_num": res.length
                    }
                })
            }
            var obj2 = await arr()
            info_arr.push(obj2)
        }
        for (let i = 0; i < info_arr.length; i++) {
            greaddb.findAll({
                where: {
                    actid: data.actid,
                    userid: info_arr[i].b_userid
                }
            }).then((res) => {
                if (res.length > 0) {
                    greaddb.update({
                        "num": info_arr[i].c_num
                    }, {
                        where: {
                            actid: data.actid,
                            userid: info_arr[i].b_userid
                        }
                    })
                } else {
                    //NULL马上创建
                    greaddb.create({
                        actid: data.actid,
                        userid: info_arr[i].b_userid,
                        num: info_arr[i].c_num
                    })
                }
            })

        }
        ctx.body = {
            "card_day": num
        }
    }
}
module.exports = cardday()