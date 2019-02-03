const act = require('../databases/actdb')
const join = require('../databases/joindb')
const user = require('../databases/userdb')
let path = require('path')
let fs = require('fs')
async function activity(ctx, next) {
    let data = ctx.request.query
    // data object{x:number,y:number}number代表活动type其中1表示习惯养成2表示比赛组队
    let actArray = []
    await act.findAll({
        order: [['id', 'DESC']],
        where: {
            type: [parseInt(data.x), parseInt(data.y)],
            isend: 1,
            //0 表示结束 1表示未结束 这边只查询 未结束的活动
        },
        include: [{
            model: user,
            //拿到相应活动创建人的用户名和头像
            attributes: ['name', 'image']
        }]
    }).then((res) => {
        actArray = res
    })
    //更新一下 已加入活动的人数
    for (let i = 0; i < actArray.length; i++) {
        join.findAll({
            where: {
                act_id: actArray[i].dataValues.id
            }
        }).then((res) => {
            act.update({
                'count': res.length
            }, {
                    'where': {
                        id: actArray[i].dataValues.id
                    }
                })

        })
    }

    actArray.forEach((value, index, input) => {
        let timestamp = parseInt(value.time)
        let date = new Date(timestamp)
        value.time = `${date.getMonth() + 1}月${date.getDate()}日`
        value.actimage = new Array(value.actimage+1)
    })
    ctx.body = actArray
}
module.exports = activity