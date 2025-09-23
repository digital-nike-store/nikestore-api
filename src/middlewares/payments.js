const { ALLOWED_CURRENCIES, ALLOWED_METHODS, MAX_INSTALLMENTS } = require("../constants/payments");

function validateCreatePayment(req, res, next) {
    const { amount, method, installments, currency } = req.body;

    if (!amount || isNaN(amount) || amount <= 0) {
        return res.status(400).send({ error: "Valor inválido" });
    }

    if (!ALLOWED_METHODS.includes(method)) {
        return res.status(400).send({ error: "Método de pagamento inválido" });
    }

    if (!ALLOWED_CURRENCIES.includes(currency)) {
        return res.status(400).send({ error: "Moeda inválida" });
    }

    if (installments < 1 || installments > MAX_INSTALLMENTS || (installments > 1 && method !== "CC")) {
        return res.status(400).send({ error: `Parcelas inválidas (1 a ${MAX_INSTALLMENTS})` });
    }

    next();
}

module.exports = {
    validateCreatePayment,
}