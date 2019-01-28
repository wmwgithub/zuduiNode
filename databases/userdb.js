const Sequelize = require('sequelize');
const sequelize = require('./config');

var user = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING(20),
    image: Sequelize.STRING(300),
    openid: Sequelize.STRING(50),
    city: Sequelize.STRING(100),
    province: Sequelize.STRING(50),
    country: Sequelize.STRING(50)
})
module.exports = user