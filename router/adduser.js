const user = require('../databases/userdb')
let out = {}
/*
        id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true
    },
    name: Sequelize.STRING(20),
    image: Sequelize.STRING(300),
    openid: Sequelize.STRING(50),
    city: Sequelize.STRING(100),
    province: Sequelize.STRING(50),
    country: Sequelize.STRING(50)

*/
async function adduser(ctx, next) {
    let data = ctx.request.query
    let userinfo = JSON.parse(data.info)
    let openid = data.openid
    console.log(userinfo)
    await user.upsert({
        name: userinfo.nickName,
        image: userinfo.avatarUrl,
        openid: openid,
        province: userinfo.province,
        country: userinfo.country
    },{
        fields:['name','image','openid','province','country']
    }).then((res) => {
    })
    await user.findOne({
        where:{
            openid:openid
        }
    }).then((res)=>{
        out = res.dataValues
    })
    console.log(out)
    ctx.body = {
        "userid": out.id,
        "openid": out.openid,
        "image": out.image
    }

}

module.exports = adduser