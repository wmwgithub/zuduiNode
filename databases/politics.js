const Sequelize = require('sequelize');
const config = require('./sq');
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

var politics = sequelize.define('politics', {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true
    },
    time: Sequelize.STRING(20),
    openid:Sequelize.STRING(100),
    study:Sequelize.TEXT(),
    imgUrl:Sequelize.STRING(30)
}, {
    timestamps: false,
    tableName: 'politics'
});

politics.belongsTo(gfactive,{foreignKey:'openid',targetKey:'open_id'})

module.exports = politics;