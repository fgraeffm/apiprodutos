const sequelize = require('sequelize');

module.exports = function(connection){
    const Category = require('./Category')(connection);

    const Product = connection.define('products', {
        name:{
            type:sequelize.STRING,
            allowNull: false
        },
        manufacturingDate: {
            type: sequelize.DATE,
            allowNull: false
        },
        perishableProduct: {
            type: sequelize.BOOLEAN,
            allowNull: false
        },
        expirationDate: {
            type: sequelize.DATE,
            allowNull: false
        },
        price: { 
            type: sequelize.FLOAT,
            allowNull: false
        }
    });

    Category.hasMany(Product);
    Product.belongsTo(Category);

    Product.sync();

    return Product;
}