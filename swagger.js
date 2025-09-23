const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });

const doc = {
    info: {
        version: "1.0.0",
        title: "API Nike Store",
        description: "API acadêmica para simulação de ecommerce com fluxo de pagamentos."
    },
    servers: [
        {
            url: "http://localhost:3030"
        }
    ],
    components: {
        schemas: {
            PaymentInput: {
                $amount: 2500,
                $currency: "BRL",
                $method: "PIX",
                $installments: 1
            },
            Payment: {
                id: 1,
                amount: 1500,
                currency: "BRL",
                method: "CC",
                status: "PENDING",
                installments: 3,
                createdAt: "2025-09-16T12:00:00Z",
                updatedAt: "2025-09-16T12:05:00Z"
            },
            PaymentResponse: {
                message: "Pagamento iniciado",
                payment: {
                    $ref: "#/components/schemas/Payment"
                }
            },
            PaymentCallbackInput: {
                $id: 1,
                $status: "PAID"
            },
            PaymentCallbackResponse: {
                message: "Pagamento 1 atualizado para PAID"
            }
        },
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer'
            }
        }
    }
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/app'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./index');
});
