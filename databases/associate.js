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

var associate = sequelize.define('associate', {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true
    },
    time: Sequelize.STRING(20),
    openid:Sequelize.STRING(100),
    study:Sequelize.TEXT(),
    imgUrl:Sequelize.STRING(30),
    length:Sequelize.INTEGER(1)
}, {
    timestamps: false,
    tableName: 'associate'
});

associate.belongsTo(gfactive,{foreignKey:'openid',targetKey:'open_id'})

module.exports = associate;