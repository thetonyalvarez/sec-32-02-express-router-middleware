const express = require("express");
const { ExpressError } = require("../../expressError.js");
const axios = require("axios");
const router = new express.Router();
const items = require("../../fakeDB");

router.get("/", function (req, res) {
	return res.json(items);
});

router.post("/", async function (req, res) {
	const newItem = { name: req.body.name, price: req.body.price };

	items.push(newItem);
	res.status(201).json({ items });
});

router.get("/:name", function (req, res) {
	try {
		const item = items.find((item) => item.name === req.params.name);
		if (!item) {
			res.send(404);
			throw new ExpressError("Item not found.", 404);
		}
		res.json(item);
	} catch (err) {
		return next(err);
	}
});

module.exports = router;
