const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Products = sequelize.define('Products', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    originalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    sizes: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
    },
    colors: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
    },
    isNew: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    isSale: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});

module.exports = Products;