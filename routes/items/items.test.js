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
		console.log(resp.body);

		expect(resp.body).toEqual([popsicle]);
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
