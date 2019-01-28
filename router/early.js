const earlydb = require('../databases/early')
const querycount = require('../router/querycount')
let isearly, out
async function early(ctx, next) {
    let data = ctx.request.query
    await earlydb.findOne({
        where: {
            openid: data.openid,
            time: data.time
        }
    }).then((res) => {
        isearly = res
    })
    if (isearly) {
        ctx.body = {
            ans: true
        }

    } else {
        await earlydb.create({
            openid: data.openid,
            textarea: data.textarea,
            time: data.time
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

module.exports = early