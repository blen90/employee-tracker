const Sequelize = require('./config/connection');

require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_HOST,
    process.env.DB_USER,
    processenv.DB_PASSWORD, 
    {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
    }
);

module.exports = connection;