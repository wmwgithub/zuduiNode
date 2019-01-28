const Answer = require('../databases/answer')
const querycount = require('../router/querycount')
let isanswer, out
async function yourAnswer(ctx, next) {
    let data = ctx.request.query
    if(data.query){
        await Answer.findAll({
            where:{
                time:data.time
            }
        }).then((res)=>{
            ctx.body={
                usernum:res.length
            }
        })
        return 0
    }
    await Answer.findOne({
        where: {
            openid: data.openid,
            time: data.time
        }
    }).then((res) => {
        isanswer = res
    })
    if (isanswer) {
        // let count =await querycount(true, 0, data.openid)
        // count=parseInt(count)+10
        // let crecount = querycount(false, count, data.openid)
        ctx.body = {
            ans: true
        }

    } else {
        await Answer.create({
            openid: data.openid,
            answer: data.answer,
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

module.exports = yourAnswer