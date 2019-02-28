const Sequelize = require('sequelize')
const config = {
    database: 'wechat', // 使用哪个数据库
    username: 'root', // 用户名
    password: '12345600', // 口令
    host: 'localhost', // 主机名
    port: 3306 // 端口号，MySQL默认3306
}

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    dialectOptions: {
        charset: 'utf8mb4',
        collate: "utf8mb4_unicode_ci"
    },
    define: {
        freezeTableName: true,
        timestamps: false
    },
    pool: {
        max: 500,
        min: 0,
        idle: 30000
    }
})
module.exports = sequelize
