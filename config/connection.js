require('dotenv').config();

const mysql2 = require('mysql2');

const connection = mysqul2.createConnection( {
    databaseName: process.env.DB_NAME,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD, 
    
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
    }
);

connection.connect((err) => {
    if (err) throw err;
    console.log(`connect as id ${connection.threadId}`)
});

module.exports = connection;