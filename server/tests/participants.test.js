// tests/participants.test.js
const request = require("supertest");
const app = require("../src/app");
const mongoose = require("mongoose");
const Participant = require("../src/models/participant");

describe("Participants API", () => {
    beforeAll(async () => {
        await mongoose.connect("mongodb://localhost:27017/testdb", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    afterEach(async () => {
        await Participant.deleteMany();
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it("should create a new participant", async () => {
        const response = await request(app).post("/participants").send({
            name: "John Doe",
            percentage: 50,
        });

        expect(response.statusCode).toBe(201);
        expect(response.body.name).toBe("John Doe");
        expect(response.body.percentage).toBe(50);
    });

    it("should get all participants", async () => {
        await Participant.create({ name: "John Doe", percentage: 50 });
        await Participant.create({ name: "Jane Smith", percentage: 30 });

        const response = await request(app).get("/participants");

        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(2);
    });

    // Adicione outros testes para os demais endpoints e casos de erro
});
