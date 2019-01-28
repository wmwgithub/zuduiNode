const act = require('../databases/actdb')
const join = require('../databases/joindb')
async function create(ctx, next) {
    let createTime = (new Date).getTime()
    let actinfo = ctx.request.query
    let actid = 0//用来储存接下来查询到的actid
    console.log(actinfo)
    await act.create({
        type: actinfo.act_type,
        open_id: actinfo.open_id,
        head: actinfo.title,
        text: actinfo.text,
        time: createTime,
        qq: actinfo.qq,
        name: actinfo.name,
        tel: actinfo.tel,
        userid: actinfo.user_id
    })
    await act.findAll({
        where: {
            userid: actinfo.user_id,
            head: actinfo.title,
            time: createTime
        }
    }).then((res) => {
        actid = res[0].dataValues.id
    })
    await join.create({
        user_id: actinfo.user_id,
        open_id: actinfo.open_id,
        act_id: actid,
        iscard: 0,
        time: createTime
    })
    ctx.body = {
        "actid": actid
    }
}
module.exports = create