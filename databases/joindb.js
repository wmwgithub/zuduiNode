const Sequelize = require('sequelize')
const sequelize = require('./config')
const activedb= require('./actdb')
const card = require('./carddb')
var join = sequelize.define('userjoin', {
    user_id: Sequelize.INTEGER(11),
    open_id: Sequelize.STRING(100),
    act_id: Sequelize.INTEGER(11),
    iscard: Sequelize.INTEGER(2),
    time: Sequelize.STRING(50),
    creater: Sequelize.INTEGER(1),//默认值是0不是创建者
    name:Sequelize.STRING(20),
    phone:Sequelize.STRING(11),
    qq:Sequelize.STRING(20)
})
join.belongsTo(activedb,{foreignKey:'act_id',targetKey:'id'})
module.exports = join