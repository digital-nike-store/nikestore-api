jest.mock("../services/processPaymentMock", () => ({
  processPaymentMock: jest.fn(),
}));

const request = require("supertest");
const app = require("../app");
const { Payments, sequelize } = require("../models");
const { payments } = require("../mocks/payments");

beforeAll(async () => {
  await sequelize.sync({ alter: true, logging: false });

  await Payments.destroy({
    where: {},
    truncate: true,
    restartIdentity: true,
  });

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

describe("Payments API", () => {
  describe("POST /payments", () => {
    test("Deve criar um pagamento válido", async () => {
      const newPayment = {
        amount: 75000,
        currency: "BRL",
        method: "PIX",
        installments: 1,
      };

      const res = await request(app).post("/payments").send(newPayment).catch(err => console.error(err));

      expect(res.statusCode).toBe(201);
      expect(res.body.payment).toHaveProperty("id");
      expect(res.body.payment.amount).toBe(newPayment.amount);
      expect(res.body.payment.status).toBe("PENDING");
    });

    test("Não deve criar pagamento com valor negativo", async () => {
      const res = await request(app).post("/payments").send(payments[3]);
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe("Valor inválido");
    });

    test("Não deve criar pagamento com moeda inválida", async () => {
      const res = await request(app).post("/payments").send(payments[4]).catch(err => console.error(err));

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe("Moeda inválida");
    });

    test("Não deve criar pagamento com método inválido", async () => {
      const res = await request(app).post("/payments").send(payments[5]).catch(err => console.error(err));

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe("Método de pagamento inválido");
    });

    test("Não deve criar pagamento com parcelas inválidas", async () => {
      const res = await request(app).post("/payments").send(payments[6]).catch(err => console.error(err));

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toMatch(/Parcelas inválidas/);
    });
  });

  describe("GET /payments/:id", () => {
    test("Deve retornar os detalhes de um pagamento existente", async () => {
      const paymentId = 4;
      const res = await request(app).get(`/payments/${paymentId}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("payment");
      expect(res.body.payment.id).toBe(paymentId);
      expect(res.body.payment.status).toBe("PENDING");
    });

    test("Deve retornar 404 para pagamento inexistente", async () => {
      const res = await request(app).get("/payments/9999");
      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe("Pagamento não encontrado");
    });
  });

  describe("POST /payments/callback", () => {
    test("Deve atualizar o status de um pagamento existente", async () => {
      const paymentId = 2;
      const res = await request(app)
        .post("/payments/callback")
        .send({ id: paymentId, status: "PAID" });

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toContain("atualizado para PAID");

      const updated = await Payments.findByPk(paymentId);
      expect(updated.status).toBe("PAID");
    });

    test("Deve retornar 404 se o pagamento não existir", async () => {
      const res = await request(app)
        .post("/payments/callback")
        .send({ id: 9999, status: "PAID" });

      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe("Pagamento não encontrado");
    });
  });
});