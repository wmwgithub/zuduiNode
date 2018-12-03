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

var team = sequelize.define('teaminfo', {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true
    },
    openid:Sequelize.STRING(100),
    actid: Sequelize.INTEGER(11),
    name:Sequelize.STRING(50),
    tel:Sequelize.STRING(11),
    qq:Sequelize.STRING(20)
}, {
    timestamps: false,
    tableName: 'teaminfo'
});


module.exports = team;