const sequelize = require('./config')
const Sequelize = require('sequelize')
const userdb = require('./userdb')
var activity = sequelize.define('active', {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true
    },
    type: Sequelize.INTEGER(2),
    head: Sequelize.STRING(30),
    text: Sequelize.TEXT,
    time: Sequelize.STRING(20),
    name: Sequelize.STRING(20),
    tel: Sequelize.STRING(11),
    qq: Sequelize.STRING(20),
    open_id: Sequelize.STRING(50),
    userid: Sequelize.INTEGER(11),
    isend: Sequelize.INTEGER(2),
    count: Sequelize.INTEGER(11),
    actimage:Sequelize.INTEGER(2),
    review:Sequelize.INTEGER(2),
    reason:Sequelize.TEXT
})
activity.belongsTo(userdb, { foreignKey: 'open_id', targetKey: 'openid' })
module.exports = activity