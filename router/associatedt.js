const associatedb = require('../databases/associate')
const gfactive = require('../databases/gfactive')
const seqelize = require('sequelize')
async function associatedt(ctx, next) {
    let data = ctx.request.query
    let openid = data.openid
    if (data.phb == 'true' || data.phb) {
        let overDay = 0, userNum = 0,order = 1;
        let phbInfo = []
        await associatedb.findAll({
            attributes: ['openid', [seqelize.fn('count', seqelize.col('associate.time')), 'total']],
            group: 'openid',
            order: [['time', 'DESC']],
            include: [{
                model: gfactive
            }]
        }).then((res) => {
            res.forEach((value,index,input)=>{
                let obj = {
                    openid:value.dataValues.openid,
                    total:value.dataValues.total,
                    gfactive:value.dataValues.gfactive.dataValues
                }
                phbInfo[index] =obj
            })
        })
        userNum = phbInfo.length
        phbInfo.forEach((value,index,input)=>{
            if(value.openid==data.openid){
                overDay = value.total,
                order = index+1
            }
        })
        console.log(phbInfo)

        ctx.body = {
            overDay,
            userNum,
            order,
            phbInfo
        }
        return 0
    }
    let userInfo = []
    await associatedb.findAll({
        order: [['id', 'DESC']],
        include: [{
            model: gfactive
        }]
    }).then((res) => {
        if (res.length == 0) {
            ctx.body = {
                userInfo: []
            }
            return 0
        } else {
            res.forEach((value, index, input) => {
                let twoObj = {
                    id: value.dataValues.id,
                    imgUrl: value.dataValues.imgUrl,
                    openid: value.dataValues.openid,
                    study: value.dataValues.study,
                    time: value.dataValues.time,
                    avatarUrl: value.gfactive.dataValues.avatarUrl,
                    name: value.gfactive.dataValues.name,
                    imgLength:value.dataValues.length
                }
                userInfo[index] = twoObj
            })
        }
    })
    console.log('userInfo', userInfo)


    ctx.body = userInfo
}

module.exports = associatedt