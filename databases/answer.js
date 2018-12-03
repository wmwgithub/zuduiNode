const Sequelize = require('sequelize')
const config = require('./sq')
const gfactive = require('./gfactive')
var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 500,
        min: 0,
        idle: 30000
    }
});

var answer = sequelize.define('answer', {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true
    },
    time: Sequelize.STRING(20),
    openid:Sequelize.STRING(100),
    answer:Sequelize.TEXT()
}, {
    timestamps: false,
    tableName: 'answer'
});

answer.belongsTo(gfactive,{foreignKey:'openid',targetKey:'open_id'})
module.exports = answer;