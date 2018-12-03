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

var sport = sequelize.define('sport', {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true
    },
    time: Sequelize.STRING(20),
    openid:Sequelize.STRING(100),
    textarea:Sequelize.TEXT(),
    step:Sequelize.STRING(10)
}, {
    timestamps: false,
    tableName: 'sport'
});


module.exports = sport;