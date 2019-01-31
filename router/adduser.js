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
   studentid:Sequelize.STRING(10),
    pwd:Sequelize.STRING(20)
*/
async function adduser(ctx, next) {
    let data = ctx.request.query
    await user.upsert({
        name: data.nickName,
        image: data.avatarUrl,
        openid: data.openId,
        province: data.province,
        country: data.country,
        studentid: data.studentid,
        pwd: data.pwd
    }, {
            fields: ['name', 'image', 'openid', 'province', 'country', 'studentid', 'pwd']
        }).then((res) => {
        })
    await user.findOne({
        where: {
            openid: data.openId
        }
    }).then((res) => {
        out = res.dataValues
    })
    ctx.body = {
        "userid": out.id,
        "openid": out.openid,
        "image": out.image
    }

}

module.exports = adduser