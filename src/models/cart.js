const {DataTyoes} = require('sequelize');
const sequelize = require("../config/database");

const Cart = sequelize.define('Cart',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status:{
        type: DataTypes.ENUM('active', 'completed', 'cancelled'),
        defaultValue: 'active'
    },
    created_at:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updated_at:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }

})

const CartItem = sequelize.define('CartItem', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cartId:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    productId:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantity:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    unit_price:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    size:{
        type: DataTypes.STRING,
        allowNull: true
    },
    color: {
        type: DataTypes.STRING,
        allowNull: true
    }

})

module.exports = {
    Cart,
    CartItem
}