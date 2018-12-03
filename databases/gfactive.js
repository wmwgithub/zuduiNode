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

var gfactive = sequelize.define('gfactive', {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true
    },
    time: Sequelize.STRING(20),
    name: Sequelize.STRING(20),
    avatarUrl:Sequelize.STRING(255),
    open_id: Sequelize.STRING(50),
    count:Sequelize.INTEGER(11)
}, {
    timestamps: false,
    tableName: 'gfactive'
});


module.exports = gfactive;