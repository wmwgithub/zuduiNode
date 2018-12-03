const greaddb = require('../databases/greaddb')
const user = require('../databases/userdb')
function gread() {
    return async (ctx, next) => {
        let data = ctx.request.query
        let arr = []
        async function fun() {
            return greaddb.findAll({
                'order': [['num','DESC']],
                where: {
                    actid: data.actid
                }
            }).then((res) => {
                for (let i = 0; i < res.length; i++) {
                    arr.push(res[i].dataValues)
                }
                return arr
            })
        }
        out = await fun()
        let myorder = 1
        for (let i = 0; i < out.length; i++) {
            if (out[i].userid == data.userid) {
                //从数组中找到我在哪然后下标加以
                myorder = i + 1
            }
        }

        let out2 = []
        for (let i = 0; i < out.length; i++) {
            async function change_out() {
                return user.findAll({
                    where: {
                        id: out[i].userid
                    }
                }).then((res) => {
                    out[i].userid = res[0].dataValues.name
                    return out[i]
                })
            }
            out2[i] = await change_out()
        }

        await outdata()
        async function outdata() {
            ctx.body = {
                "out": out2,
                "myorder": myorder
            }
        }
    }
}
module.exports = gread()