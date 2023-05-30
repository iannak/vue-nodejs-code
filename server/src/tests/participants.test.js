const request = require("supertest");
const app = require("../../app");
const mongoose = require("mongoose");
const Participant = require("../models/participant");

describe("Participants API", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://localhost:27017/testdb", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }, 10000);

  afterEach(async () => {
    await Participant.deleteMany();
  }, 10000);

  afterAll(async () => {
    await mongoose.connection.close();
  }, 10000);

  it("should create a new participant", async () => {
    const response = await request(app).post("/participants").send({
      firstName: "John",
      lastName: "Doe",
      percentage: 50,
    });

    expect(response.statusCode).toBe(201);
    expect(response.body.firstName).toBe("John");
    expect(response.body.lastName).toBe("Doe");
    expect(response.body.percentage).toBe(50);
  }, 10000);

  it("should get all participants", async () => {
    await Participant.create({
      firstName: "John",
      lastName: "Doe",
      percentage: 50,
    });
    await Participant.create({
      firstName: "Jane",
      lastName: "Smith",
      percentage: 30,
    });

    const response = await request(app).get("/participants");

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(2);
    expect(response.body[0].firstName).toBe("John");
    expect(response.body[0].lastName).toBe("Doe");
    expect(response.body[0].percentage).toBe(50);
    expect(response.body[1].firstName).toBe("Jane");
    expect(response.body[1].lastName).toBe("Smith");
    expect(response.body[1].percentage).toBe(30);
  }, 10000);

  it("should get a participant by ID", async () => {
    const participant = await Participant.create({
      firstName: "John",
      lastName: "Doe",
      percentage: 50,
    });

    const response = await request(app).get(`/participants/${participant._id}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.firstName).toBe("John");
    expect(response.body.lastName).toBe("Doe");
    expect(response.body.percentage).toBe(50);
  }, 10000);

  it("should handle not found error when getting a participant by ID", async () => {
    const invalidId = "invalid-id";

    const response = await request(app).get(`/participants/${invalidId}`);

    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe("Participante não encontrado");
  }, 10000);

  it("should update a participant", async () => {
    const participant = await Participant.create({
      firstName: "John",
      lastName: "Doe",
      percentage: 50,
    });

    const updatedParticipant = {
      firstName: "Jane",
      lastName: "Smith",
      percentage: 70,
    };

    const response = await request(app)
      .put(`/participants/${participant._id}`)
      .send(updatedParticipant);

    expect(response.statusCode).toBe(200);
    expect(response.body.firstName).toBe("Jane");
    expect(response.body.lastName).toBe("Smith");
    expect(response.body.percentage).toBe(70);
  }, 10000);

  it("should handle not found error when updating a participant", async () => {
    const invalidId = "invalid-id";

    const response = await request(app)
      .put(`/participants/${invalidId}`)
      .send({
        firstName: "Jane",
        lastName: "Smith",
        percentage: 70,
      });

    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe("Participante não encontrado");
  }, 10000);

  it("should delete a participant", async () => {
    const participant = await Participant.create({
      firstName: "John",
      lastName: "Doe",
      percentage: 50,
    });

    const response = await request(app).delete(`/participants/${participant._id}`);

    expect(response.statusCode).toBe(204);

    const deletedParticipant = await Participant.findById(participant._id);
    expect(deletedParticipant).toBeNull();
  }, 10000);

  it("should handle not found error when deleting a participant", async () => {
    const invalidId = "invalid-id";

    const response = await request(app).delete(`/participants/${invalidId}`);

    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe("Participante não encontrado");
  }, 10000);
});
