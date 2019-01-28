const storydb = require('../databases/story')
const gfactive = require('../databases/gfactive')
const seqelize = require('sequelize')
async function storydt(ctx, next) {
    let data = ctx.request.query
    let openid = data.openid
    if (data.phb == 'true' || data.phb) {
        let overDay = 0, userNum = 0,order = 1;
        let phbInfo = []
        await storydb.findAll({
            attributes: ['openid', [seqelize.fn('count', seqelize.col('story.time')), 'total']],
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
        // await seqelize.query("select openid,count(time) from story group by openid").
        // await storydb.count('time',{
        //     attributes:['openid'],
        //      group:'openid',
        //      plain:false
        // }).then((res)=>{
        //     console.log(res)
        // })
        ctx.body = {
            overDay,
            userNum,
            order,
            phbInfo
        }
        return 0
    }
    let userInfo = []
    await storydb.findAll({
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
                    story: value.dataValues.textarea,
                    time: value.dataValues.time,
                    avatarUrl: value.gfactive.dataValues.avatarUrl,
                    name: value.gfactive.dataValues.name,
                    type:value.dataValues.type,
                    title:value.dataValues.title
                }
                userInfo[index] = twoObj
            })
        }
    })
    console.log('userInfo', userInfo)

    // await seqelize.findAll({
    //     include:[{
    //         model:gfactive
    //     }]
    // }).then((res)=>{
    //     console.log('res',res)
    // })
    // userInfo.map((value,index,input)=>{

    // })

    ctx.body = userInfo
}

module.exports = storydt