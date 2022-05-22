const express = require("express");
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

module.exports = router;
