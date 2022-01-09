import { app } from "..";
import supertest from "supertest";
const testApp = app;

describe("GET /orders", () => {
  it("should return 200 with valid input", async () => {
    await supertest(testApp)
      .get("/orders?page=1&limit=3")
      .set("Accept", "application/json")
      .expect(200);
  });
  it("should return 400 with invalid input", async () => {
    await supertest(testApp)
      .get("/orders?page=0&limit=0")
      .set("Accept", "application/json")
      .expect(400);
  });
  it("should return 400 with no input", async () => {
    await supertest(testApp)
      .get("/orders")
      .set("Accept", "application/json")
      .expect(400);
  });
});

describe("POST /orders", () => {
  it("should return 201 with valid input", async () => {
    await supertest(testApp)
      .post("/orders")
      .set("Accept", "application/json")
      .send({
        origin: ["55.93", "-3.118"],
        destination: ["50.087", "14.421"],
      })
      .expect(201);
  });
  it("should return 400 with invalid input", async () => {
    await supertest(testApp)
      .post("/orders")
      .set("Accept", "application/json")
      .send({
        origin: [0.5, "asd"],
        destination: ["", "asd", 0.5],
      })
      .expect(400);
  });
});

describe("PATCH /orders", () => {
  let id = "";
  let takenId = "";
  beforeAll(async () => {
    await supertest(testApp)
      .post("/orders")
      .set("Accept", "application/json")
      .send({
        origin: ["55.93", "-3.118"],
        destination: ["50.087", "14.421"],
      })
      .then((res: supertest.Response) => {
        id = res?.body?.id;
      });
    await supertest(testApp)
      .post("/orders")
      .set("Accept", "application/json")
      .send({
        origin: ["55.93", "-3.118"],
        destination: ["50.087", "14.421"],
      })
      .then(async (res: supertest.Response) => {
        takenId = res?.body?.id;
        await supertest(testApp)
          .patch(`/orders/${takenId}`)
          .set("Accept", "application/json")
          .send({
            status: "TAKEN",
          });
      });
  });
  it("should return 200 with valid input", async () => {
    await supertest(testApp)
      .patch(`/orders/${id}`)
      .set("Accept", "application/json")
      .send({
        status: "TAKEN",
      })
      .expect(200);
  });
  it("should return 400 with taken order", async () => {
    await supertest(testApp)
      .patch(`/orders/${takenId}`)
      .set("Accept", "application/json")
      .send({
        status: "TAKEN",
      })
      .expect(400);
  });
  it("should return 400 with invalid input", async () => {
    await supertest(testApp)
      .patch("/orders/notexistid")
      .set("Accept", "application/json")
      .send({
        status: "TAKEN",
      })
      .expect(400);
  });
});
