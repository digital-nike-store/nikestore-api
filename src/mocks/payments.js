const payments = [

    // Válidos -------------------------------------------------
    {
        amount: 100,
        currency: "BRL",
        method: "PIX",
        installments: 1,
    },
    {
        amount: 250,
        currency: "USD",
        method: "CC",
        installments: 3,
    },
    {
        amount: 500,
        currency: "EUR",
        method: "BOLETO",
        installments: 1,
    },

    // Inválidos -------------------------------------------------
    {
        amount: -10, // valor negativo
        currency: "BRL",
        method: "PIX",
        installments: 1,
    },
    {
        amount: 100,
        currency: "JPY", // moeda não permitida
        method: "PIX",
        installments: 1,
    },
    {
        amount: 100,
        currency: "BRL",
        method: "PAYPAL", // método não permitido
        installments: 1,
    },
    {
        amount: 100,
        currency: "BRL",
        method: "CC",
        installments: 20, // parcelas acima do limite
    },
];

module.exports = { payments };
