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

var question = sequelize.define('question', {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true
    },
    time: Sequelize.STRING(20),
    question:Sequelize.TEXT(),
    answer:Sequelize.TEXT()
}, {
    timestamps: false,
    tableName: 'question'
});


module.exports = question;