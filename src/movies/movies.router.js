const router = require("express").Router();
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const theatersRouter = require("../theaters/theaters.router");
const reviewsRouter = require("../reviews/reviews.router")

router.route("/").get(controller.list).all(methodNotAllowed);
router.route("/:movieId").get(controller.read).all(methodNotAllowed);

//route for theaters
router.use("/:movieId/theaters", controller.movieExists, theatersRouter);
//route for reviews
router.use("/:movieId/reviews", controller.movieExists, reviewsRouter)
module.exports = router;
