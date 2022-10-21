const { DataTypes } = require("sequelize");

const db = require("../database/database");

const Order = db.define('orders', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    date: {
        type: DataTypes.DATEONLY
    }
});

module.exports = Order;