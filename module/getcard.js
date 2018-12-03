const card = require('../databases/carddb')
const join = require('../databases/joindb')
function getcard() {
    return async (ctx, next) => {
        var data = ctx.request.query
        var iscard = create_join(data)
        //console.log(data)
        async function create_join(data) {
            var cre_iscard = await card.create({
                userid: data.userid,
                openid: data.openid,
                actid: data.actid,
                iscard: 1,
                cardtime: (new Date).getTime(),
                cardtext: data.text
            })
        }
        async function fun(data) {
            return join.update({
                'iscard': 1
            }, {
                'where': {
                    user_id: data.userid,
                    open_id: data.openid,
                    act_id: data.actid
                }
            })
        }
        var out = fun(data)
        ctx.body = {
            "iscard": true,
        }

    }
}
module.exports = getcard()