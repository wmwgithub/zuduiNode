const Sequelize = require('sequelize');
const sequelize = require('./config')
const userdb = require('./userdb')
let card = sequelize.define('iscard', {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true
    },
    actid: Sequelize.INTEGER(11),
    openid: Sequelize.STRING(100),
    imglength: Sequelize.INTEGER(1),
    cardtime: Sequelize.STRING(100),
    cardtext: Sequelize.STRING(255)
})
module.exports = card
card.belongsTo(userdb,{foreignKey:'openid',targetKey:'openid'})