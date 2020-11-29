const sequelize = require('sequelize');
const mysql = require('mysql2');

var databaseName = 'testehox',
username = 'root',
password = '1234',
host = 'localhost';

var mysqlConn = mysql.createConnection({
   host : host,
   user : username,
   password : password 
});

mysqlConn.connect(function(err){
    if(err){
        console.log('MySQL error: ' + err);
        return;
    } 
    
    mysqlConn.query('CREATE DATABASE ' + databaseName, function(error){

        const connection = new sequelize(databaseName, username, password, {
            host: host,
            dialect: 'mysql',
            timezone: '-03:00',
            logging: false
        })

        module.exports.mysql = mysqlConn;
        module.exports.connection = connection;
        module.exports.user = require('./User')(connection);
        module.exports.category = require('./Category')(connection);
        module.exports.product = require('./Product')(connection);  
    });
});

mysqlConn.end();


