process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../app");
let items = require("../fakeDb");

let potato = { name: "potato" };

beforeEach(() => {
  items.push(potato);
});

afterEach(() => {
  items.length = 0;
});

describe("GET /items", () => {
  test("Gets a list of items", async () => {
    const resp = await request(app).get("/items");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({ items: [potato] });
  });
});

describe("GET /items/:name", () => {
  test("Gets item by name", async () => {
    const resp = await request(app).get(`/items/${potato.name}`);
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({ item: potato });
  });
  test("Responds with 404 for invalid item", async () => {
    const resp = await request(app).get(`/items/lalala`);
    expect(resp.statusCode).toBe(404);
  });
});

describe("POST /items", () => {
  test("Creats a new item", async () => {
    const resp = await request(app).post("/items").send({ name: "onion" });
    expect(resp.statusCode).toBe(201);
    expect(resp.body).toEqual({ item: { name: "onion" } });
  });
  test("Responds with 400 if name is missing", async () => {
    const resp = await request(app).post("/items").send({});
    expect(resp.statusCode).toBe(400);
  });
});

describe("PATCH /items/:name", () => {
  test("Update a single item", async () => {
    const resp = await request(app)
      .patch(`/items/${potato.name}`)
      .send({ name: "fries" });
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({ item: { name: "fries" } });
  });
  test("Responds with 404 if id invalid", async () => {
    const resp = await request(app).patch(`/items/0`);
    expect(resp.statusCode).toBe(404);
  });
});

describe("DELETE /items/:name", () => {
  test("Delete a single item", async () => {
    const resp = await request(app).delete(`/items/${potato.name}`);
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({ message: "Deleted" });
  });

  test("Responds with 404 for deleting invalid item", async () => {
    const resp = await request(app).delete(`/items/apple`);
    expect(resp.statusCode).toBe(404);
  });
});
