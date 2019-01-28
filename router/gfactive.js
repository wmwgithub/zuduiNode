const gfactivedb = require('../databases/gfactive')
async function gfactive(ctx, next) {
    let data = ctx.request.query
    function upsertgf() {
      return  gfactivedb.upsert({
            name: data.nickName,
            time:(new Date).getTime(),
            avatarUrl:data.avatarUrl,
            open_id:data.openid
        }).then((res)=>{
            return res
        })
    }
    let out = await upsertgf()
    console.log(out)
    ctx.body = {
        'out':out,
        'query':data
    }
}

module.exports = gfactive