const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Orders = sequelize.define("Orders", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { isEmail: true },
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    address: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    items: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    shippingCost: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
    },
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
})

module.exports = Orders;