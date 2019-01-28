const Sequelize = require('sequelize');
const config = require('./sq');
var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 500,
        min: 0,
        idle: 30000
    }
});
var reason = sequelize.define('reason', {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true
    },
    time: Sequelize.STRING(30),
    reason: Sequelize.STRING(255),
    openid: Sequelize.STRING(255),
    oldcount: Sequelize.INTEGER(11),
    delcount: Sequelize.INTEGER(11),
    nowcount: Sequelize.INTEGER(11)
}, {
        timestamps: false,
        tableName: 'reason'
    })
module.exports = reason