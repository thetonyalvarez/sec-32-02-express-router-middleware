process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("../../app");
let items = require("../../fakeDB");

let popsicle = {
	name: "popsicle",
	price: 1.45,
};

beforeEach(function () {
	items.push(popsicle);
});

afterEach(function () {
	// make sure this *mutates*, not redefines, `items`
	items.length = 0;
});

describe("GET /items", function () {
	test("Gets a list of items", async function () {
		const resp = await request(app).get(`/items`);

		expect(resp.body).toEqual([popsicle]);
	});
});

describe("GET /items/:name", function () {
	test("Gets the desired item from params", async function () {
		const resp = await request(app).get(`/items/popsicle`);

		expect(resp.body).toEqual(popsicle);
	});
	test("Throws error if item not found", async function () {
		const resp = await request(app).get(`/items/nothing`);

		expect(resp.statusCode).toEqual(404);
		expect(resp.body).rejects;
	});
});

describe("POST /items", function () {
	test("Post a new item to our list of items", async function () {
		const resp = await request(app).post(`/items`).send({
			name: "cheerios",
			price: 3.4,
		});
		expect(resp.statusCode).toBe(201);

		expect(resp.body.items).toContainEqual(
			expect.objectContaining({
				name: "cheerios",
			})
		);
	});
});

describe("PATCH /items/:name", function () {
	test("Modify a single item's name only", async function () {
		const resp = await request(app).patch(`/items/popsicle`).send({
			name: "new popsicle",
			price: 3.4,
		});
		expect(resp.statusCode).toBe(200);

		expect(resp.body).toContain("new popsicle");
	});
	test("Respond with 404 if not found", async function () {
		const resp = await request(app).patch(`/items/nothing`);
		expect(resp.statusCode).toBe(404);
	});
});
