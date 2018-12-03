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
var join = sequelize.define('userjoin', {
    user_id: Sequelize.INTEGER(11),
    open_id: Sequelize.STRING(100),
    act_id: Sequelize.INTEGER(11),
    iscard:Sequelize.INTEGER(2),
    time: Sequelize.STRING(50)
}, {
        timestamps: false,
        tableName: 'userjoin'
    });


    module.exports= join