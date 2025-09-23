function validateCheckoutData(req, res, next) {
    const body = req.body;

    const orderFields = ['fullName', 'email', 'phone', 'address', 'items', 'shippingCost', 'total'];
    const paymentFields = ['total', 'currency', 'method', 'installments'];

    const allRequiredFields = [...new Set([...orderFields, ...paymentFields])];

    for (const field of allRequiredFields) {
        if (body[field] === undefined) {
            return res.status(400).send({ error: `O campo obrigatório '${field}' não foi fornecido.` });
        }
    }

    req.orderData = {
        fullName: body.fullName,
        email: body.email,
        phone: body.phone,
        address: body.address,
        items: body.items,
        shippingCost: body.shippingCost,
        total: body.total
    };

    req.paymentData = {
        amount: body.total,
        currency: body.currency,
        method: body.method,
        installments: body.installments
    }

    next();
}

module.exports = {
    validateCheckoutData
}