const card = require('../databases/carddb')
function gettime(){
return async (ctx, next) => {
    let data = ctx.request.query
    async function text() {
        return card.findAll({
            where: {
                actid: data.actid,
                openid: data.openid
            }
        }).then((res) => {
            let timearr = []
            for (let i = 0; i < res.length; i++) {
                timearr.push(res[i].dataValues.cardtime)
            }
            return timearr
        })
    }
    out = await text()
    let out_time = []
    for (i = 0; i < out.length; i++) {
        let time = new Date(parseInt(out[i]))
        let year = time.getFullYear()
        let month = time.getMonth() + 1
        let day = time.getDate()
        let time2 = '' + year + month + day
        out_time[i] = time2
    }
    console.log("out", out_time)
    ctx.body = {
        "out_time": out_time
    }
}
}
module.exports = gettime()