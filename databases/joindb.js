const Sequelize = require('sequelize');
const sequelize = require('./config')
var join = sequelize.define('userjoin', {
    user_id: Sequelize.INTEGER(11),
    open_id: Sequelize.STRING(100),
    act_id: Sequelize.INTEGER(11),
    iscard: Sequelize.INTEGER(2),
    time: Sequelize.STRING(50),
    creater: Sequelize.INTEGER(1)//默认值是0不是创建者
})


module.exports = join