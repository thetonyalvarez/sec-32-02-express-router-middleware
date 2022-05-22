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
		expect(resp.statusCode).toBe(200);

		expect(resp.body).toEqual([popsicle]);
	});
});
