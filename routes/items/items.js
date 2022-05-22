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

router.patch("/:name", function (req, res) {
	try {
		const item = items.find((item) => item.name === req.params.name);
		if (!item) {
			res.send(404);
			throw new ExpressError("Item not found.", 404);
		}
		item.name = req.body.name;
		item.price = req.body.price;
		res.status(200).json(
			`updated: { name: ${item.name}, price: ${item.price}}`
		);
	} catch (err) {
		return next(err);
	}
});

router.delete("/:name", function (req, res) {
	try {
		console.log(items);
		const item = items.find((item) => item.name === req.params.name);
		if (!item) {
			res.send(404);
			throw new ExpressError("Item not found.", 404);
		}
		delete items[item];
		res.status(200).json({ message: "Deleted" });
	} catch (err) {
		return next(err);
	}
});

module.exports = router;
