const sequelize = require('sequelize');

module.exports = function(connection){

    const Category = connection.define('categories', {
        name: {
            type: sequelize.STRING,
            allowNull: false
        }
    });

    Category.sync();

    return Category;
}