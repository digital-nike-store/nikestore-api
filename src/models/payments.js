const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');
const { ALLOWED_CURRENCIES, ALLOWED_METHODS, ALLOWED_STATUS, MAX_INSTALLMENTS } = require('../constants/payments');
const Orders = require('./orders');

const Payments = sequelize.define('Payments', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    currency: {
        type: DataTypes.ENUM(...ALLOWED_CURRENCIES),
        defaultValue: "BRL",
        allowNull: false,
    },
    method: {
        type: DataTypes.ENUM(...ALLOWED_METHODS),
        defaultValue: "CC",
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM(...ALLOWED_STATUS),
        defaultValue: "PENDING",
        allowNull: false,
    },
    installments: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false,
        validate: {
            min: 1,
            max: MAX_INSTALLMENTS
        },
    },
});

Orders.hasOne(Payments, { foreignKey: "orderId", as: "payment" });
Payments.belongsTo(Orders, { foreignKey: "orderId", as: "order" });

module.exports = Payments;
