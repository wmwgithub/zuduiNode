const answerdb = require('../databases/answer')
const gfactive = require('../databases/gfactive')
async function getansewr(ctx, next) {
    let data = ctx.request.query
    let answerArr = []
    await answerdb.findAll({
        where: {
            time: data.time
        },
        order: [['id', 'DESC']],
        include: [{
            model: gfactive
        }]
    }).then((res) => {
        res.forEach((value, inedx) => {
            console.log(value)
            let obj ={
                answer:value.answer,
                name:value.gfactive.name,
                avatarUrl:value.gfactive.avatarUrl
            }
            answerArr[inedx] = obj
        })
    })
    ctx.body = answerArr
}
module.exports = getansewr