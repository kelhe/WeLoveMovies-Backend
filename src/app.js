if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
// require error handlers
const errorHandler = require("./errors/errorHandler");
const pathNotFound = require("./errors/notFound");
//require routers files
const moviesRouter = require("./movies/movies.router");
const reviewsRouter = require("./reviews/reviews.router");
const theatersRouter = require("./theaters/theaters.router");
//cors and express setup
app.use(cors());
app.use(express.json());
//routes for routers
app.use("/movies", moviesRouter);
app.use("/reviews", reviewsRouter);
app.use("/theaters", theatersRouter);
//error handler and path not found
app.use(pathNotFound);
app.use(errorHandler);

module.exports = app;
