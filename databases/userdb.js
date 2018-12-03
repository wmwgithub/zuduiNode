const Sequelize = require('sequelize');
const config = require('./sq');

var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    dialectOptions: { 
        charset: 'utf8mb4',
        collate: "utf8mb4_unicode_ci"
       },
    pool: {
        max: 500,
        min: 0,
        idle: 30000
    }
});
var user = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement:true
    },
    name: Sequelize.STRING(20),
    image: Sequelize.STRING(300),
    openid: Sequelize.STRING(50),
    city: Sequelize.STRING(100),
    province: Sequelize.STRING(50),
    country: Sequelize.STRING(50)
}, {
        timestamps: false,
        tableName: 'user'
    });


    module.exports= user