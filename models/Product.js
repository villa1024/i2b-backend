const { DataTypes } = require("sequelize");

const db = require("../database/database");
const Order = require('./Order');

const Product = db.define('products', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.FLOAT
    },
    description: {
        type: DataTypes.STRING
    }
});

Product.hasMany(Order, {
    foreignKey: 'product_id',
    sourceKey: 'id'
});

Order.belongsTo(Product, {
    foreignKey: 'product_id'
});

module.exports = Product;