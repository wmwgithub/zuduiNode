const sportdb = require('../databases/sport')
const querycount = require('../router/querycount')
let issport, out
async function sport(ctx, next) {
    let data = ctx.request.query
    await sportdb.findOne({
        where: {
            openid: data.openid,
            time: data.time
        }
    }).then((res) => {
        issport = res
    })
    if (issport) {
        ctx.body = {
            ans: true
        }

    } else {
        await sportdb.create({
            openid: data.openid,
            textarea: data.textarea,
            time: data.time,
            step:data.step
        }).then((res) => {
            out = res
        })
        if (out) {
            let count =await querycount(true, 0, data.openid)
             count=parseInt(count)+10
            let crecount = querycount(false, count, data.openid)
            ctx.body = {
                success: true,
                ans: false
            }
        } else {
            ctx.body = {
                success: false,
                ans: false
            }
        }

    }

}

module.exports = sport