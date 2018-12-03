const card = require('../databases/carddb')
const user = require('../databases/userdb')
function cardinfo(){
return async (ctx, next) => {
    let data = ctx.request.query
    let userinfo
    let infoarr = []
    async function time(data) {
        return card.findAll({
            where: {
                actid: data.actid
            }
        }).then(async (res) => {
            for (let i = 0; i < res.length; i++) {
                var openid = res[i].dataValues.openid
                async function getuserinfo(data) {
                    return user.findAll({
                        where: {
                            openid: data
                        }
                    }).then((res) => {
                        userinfo = res[0].dataValues
                    })
                }
                await getuserinfo(openid)
                //console.log("userinfo",i,userinfo)
                var str = Object.assign(userinfo, res[i].dataValues)
                // console.log(str)
                infoarr.push(str)
            }
            return infoarr
        })
    }
    var out = await time(data)
    console.log(out)
    for (let i = 0; i < out.length; i++) {
        var change_date = new Date(parseInt(out[i].cardtime))
        console.log(change_date)
        var month = change_date.getMonth() + 1
        var day = change_date.getDate()
        var new_time = month + "月" + day + "日"
        console.log(new_time)
        out[i].cardtime = new_time
    }
    ctx.body = {
        "cardinfo": out
    }
}
}
module.exports = cardinfo()