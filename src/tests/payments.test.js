jest.mock("../services/processPaymentMock", () => ({
  processPaymentMock: jest.fn(),
}));

jest.setTimeout(20000);

const request = require("supertest");
const app = require("../app");
const { Payments, sequelize } = require("../models");
const { payments } = require("../mocks/payments");
const Orders = require("../models/orders");

beforeAll(async () => {
  await sequelize.sync({ alter: true, logging: false });

  for (const payment of payments.slice(0, 3)) {
    const exists = await Payments.findByPk(payment.id);
    if (!exists) {
      await Payments.create({ ...payment, status: "PENDING" });
    }
  }
});

afterAll(async () => {
  await sequelize.close();
});


describe("Checkout Endpoints", () => {
  describe("POST /api/checkout", () => {
    test("Deve criar Order + Payment válidos", async () => {
      const newCheckout = {
        fullName: "João da Silva",
        email: "joao@email.com",
        phone: "11999999999",
        address: "Rua Teste, 123",
        items: JSON.stringify([{ productId: 1, quantity: 2 }]),
        shippingCost: 1500,
        total: 5000,
        currency: "BRL",
        method: "PIX",
        installments: 1,
      };

      const res = await request(app).post("/api/checkout").send(newCheckout);

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("order");
      expect(res.body).toHaveProperty("payment");

      expect(res.body.order).toHaveProperty("id");
      expect(res.body.payment).toHaveProperty("id");
      expect(res.body.payment.status).toBe("PENDING");
    });

    test("Deve retornar 400 se faltar campo obrigatório", async () => {
      const invalidCheckout = {
        // removi 'email'
        fullName: "Maria Teste",
        phone: "11999999999",
        address: "Rua sem nome",
        items: JSON.stringify([{ productId: 2, quantity: 1 }]),
        shippingCost: 1000,
        total: 3000,
        currency: "BRL",
        method: "PIX",
        installments: 1,
      };

      const res = await request(app).post("/api/checkout").send(invalidCheckout);

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toMatch(/campo obrigatório/);
    });

    test("Deve retornar 500 se falhar durante transaction", async () => {
      jest.spyOn(Orders, "create").mockRejectedValueOnce(new Error("DB error"));

      const checkout = {
        fullName: "Carlos Teste",
        email: "carlos@email.com",
        phone: "11999999999",
        address: "Rua das Flores",
        items: JSON.stringify([{ productId: 3, quantity: 1 }]),
        shippingCost: 500,
        total: 2000,
        currency: "BRL",
        method: "PIX",
        installments: 1,
      };

      const res = await request(app).post("/api/checkout").send(checkout);

      expect(res.statusCode).toBe(500);
      expect(res.body.error).toBe("Erro ao iniciar checkout");
    });
  });
});

describe("Payments Endpoints", () => {
  describe("POST /api/payments", () => {
    test("Deve criar um pagamento válido", async () => {
      const newPayment = {
        amount: 75000,
        currency: "BRL",
        method: "PIX",
        installments: 1,
      };

      const res = await request(app).post("/api/payments").send(newPayment).catch(err => console.error(err));

      expect(res.statusCode).toBe(201);
      expect(res.body.payment).toHaveProperty("id");
      expect(res.body.payment.amount).toBe(newPayment.amount);
      expect(res.body.payment.status).toBe("PENDING");
    });

    test("Não deve criar pagamento com valor negativo", async () => {
      const res = await request(app).post("/api/payments").send(payments[3]);
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe("Valor inválido");
    });

    test("Não deve criar pagamento com moeda inválida", async () => {
      const res = await request(app).post("/api/payments").send(payments[4]).catch(err => console.error(err));

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe("Moeda inválida");
    });

    test("Não deve criar pagamento com método inválido", async () => {
      const res = await request(app).post("/api/payments").send(payments[5]).catch(err => console.error(err));

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe("Método de pagamento inválido");
    });

    test("Não deve criar pagamento com parcelas inválidas", async () => {
      const res = await request(app).post("/api/payments").send(payments[6]).catch(err => console.error(err));

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toMatch(/Parcelas inválidas/);
    });

    test("Deve retornar 500 se houver erro ao criar pagamento", async () => {
      jest.spyOn(Payments, "create").mockRejectedValueOnce(new Error("DB error"));

      const newPayment = {
        amount: 1000,
        currency: "BRL",
        method: "PIX",
        installments: 1,
      };

      const res = await request(app).post("/api/payments").send(newPayment);

      expect(res.statusCode).toBe(500);
      expect(res.body.error).toBe("Erro ao iniciar pagamento");
    });
  });

  describe("GET /api/payments/:id", () => {
    test("Deve retornar os detalhes de um pagamento existente", async () => {
      const paymentId = 4;
      const res = await request(app).get(`/api/payments/${paymentId}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("payment");
      expect(res.body.payment.id).toBe(paymentId);
      expect(res.body.payment.status).toBe("PENDING");
    });

    test("Deve retornar 404 para pagamento inexistente", async () => {
      const res = await request(app).get("/api/payments/9999");
      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe("Pagamento não encontrado");
    });

    test("Deve retornar 500 se houver erro ao buscar detalhes do pagamento", async () => {
      jest.spyOn(Payments, "findByPk").mockRejectedValueOnce(new Error("DB error"));

      const res = await request(app).get("/api/payments/1");

      expect(res.statusCode).toBe(500);
      expect(res.body.error).toBe("Erro ao consultar detalhes do pagamento");
    });
  });

  describe("POST /api/payments/callback", () => {
    test("Deve atualizar o status de um pagamento existente", async () => {
      const paymentId = 1;
      const res = await request(app)
        .post("/api/payments/callback")
        .send({ id: paymentId, status: "PAID" });

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toContain("atualizado para PAID");

      const updated = await Payments.findByPk(paymentId);
      expect(updated.status).toBe("PAID");
    });

    test("Deve retornar 404 se o pagamento não existir", async () => {
      const res = await request(app)
        .post("/api/payments/callback")
        .send({ id: 9999, status: "PAID" });

      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe("Pagamento não encontrado");
    });

    test("Deve retornar 500 se houver erro ao processar o pagamento", async () => {
      jest.spyOn(Payments, "findByPk").mockRejectedValueOnce(new Error("DB error"));

      const res = await request(app)
        .post("/api/payments/callback")
        .send({ id: 1, status: "PAID" });

      expect(res.statusCode).toBe(500);
      expect(res.body.error).toBe("Erro ao processar o pagamento");
    });
  });
});