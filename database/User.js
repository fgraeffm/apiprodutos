const sequelize = require('sequelize');

module.exports = function(connection){

    const User = connection.define('users', {
        username: {
            type: sequelize.STRING,
            allowNull: false
        },
        password: {
            type: sequelize.STRING,
            allowNull: false
        },
        email: {
            type: sequelize.STRING,
            allowNull: false
        }
    });

    User.sync();

    return User;
}