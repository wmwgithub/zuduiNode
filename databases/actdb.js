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
    isend:Sequelize.INTEGER(2),
    count:Sequelize.INTEGER(11)

}, {
    timestamps: false,
    tableName: 'active'
});


module.exports = activity;