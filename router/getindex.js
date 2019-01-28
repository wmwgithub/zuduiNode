const actimg = require('../databases/imgurldb')

function getindex() {
    return async (ctx, next) => {
        let data = ctx.request.query
        async function find(id) {
            return actimg.findAll({
                where: {
                    actid: id.actid
                }
            }).then((res) => {
                let arr = []
                for (let i = 0; i < res.length; i++) {
                    arr[i] = res[i].dataValues
                }
                return arr
            })
        }
        out = await find(data)
        // console.log(out)
        ctx.body = {
            "index": out.length - 1,
            "openid": out[0].openid
        }
    }
}
module.exports = getindex()