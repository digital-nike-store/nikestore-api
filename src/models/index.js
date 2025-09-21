const sequelize = require('../config/database');
const Payments = require('./payments');
const Products = require('./products');

sequelize.sync({ force: false, alter: true })
    .then(() => {
        console.log('Banco de dados sincronizado com sucesso!');
    })
    .catch((error) => {
        console.error('Erro ao sincronizar o banco de dados:', error);
    });

module.exports = {
    Payments,
    Products,
    sequelize
};