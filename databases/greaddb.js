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

var gread = sequelize.define('iscard', {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true
    },
    actid: Sequelize.INTEGER(11),
    userid: Sequelize.INTEGER(11),
    num:Sequelize.INTEGER(11)
}, {
    timestamps: false,
    tableName: 'gread'
});



module.exports = gread;