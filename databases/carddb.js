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

var card = sequelize.define('iscard', {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true
    },
    actid: Sequelize.INTEGER(11),
    openid: Sequelize.STRING(100),
    userid: Sequelize.INTEGER(11),
    cardtime:Sequelize.STRING(100),
    iscard:Sequelize.INTEGER(2),
    cardtext:Sequelize.STRING(255)
}, {
    timestamps: false,
    tableName: 'iscard'
});



module.exports = card;