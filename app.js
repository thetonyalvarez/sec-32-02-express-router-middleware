const express = require("express");
const ExpressError = require("./expressError");
const app = express();
const itemRoutes = require("./routes/items/items");
const morgan = require("morgan");

app.use(express.json());

// this applies to all requests at all paths
app.use(morgan("dev"));

// apply prefix to every item in itemRoutes
app.use("/items", itemRoutes);

// 404 handler.
app.use(function (req, res, next) {
	const notFoundError = new ExpressError("404 Not Found.", 404);
	return next(notFoundError);
});

// generic error handler
app.use(function (err, req, res, next) {
	// default 500
	let status = err.status || 500;
	let message = err.message;

	return res.status(status).json({ error: { message, status } });
});

module.exports = app;
