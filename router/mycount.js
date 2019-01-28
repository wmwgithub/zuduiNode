const gfactivedb = require('../databases/gfactive')
async function mycount(ctx,next) {
    let countInfo=[]
    await gfactivedb.findAll({
        order:[['count','DESC']]
    }).then((res)=>{
            res.forEach((value,index,input)=>{
                countInfo[index] = value
            })
    })
    ctx.body = countInfo
}
module.exports = mycount