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
var actimg = sequelize.define('imgurl', {
    openid: Sequelize.STRING(100),
    actid: Sequelize.INTEGER(11),
    index:Sequelize.INTEGER(2),
}, {
        timestamps: false,
        tableName: 'imgurl'
    });


    module.exports= actimg