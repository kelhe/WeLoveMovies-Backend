const reviewsService = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const reduceProperties = require("../utils/reduce-properties")
//reducer to format critics key and its values inside the reviews data obj
const reduceCritics = reduceProperties("review_id",{
critic_id: ["critic", "critic_id"],
preferred_name: ["critic", "preferred_name"],
surname: ["critic", "surname"],
organization_name: ["critic", "organization_name"]
})


async function list(req, res) {
  const movie = res.locals.movie
  const data = await reviewsService.list();
  //res.json where the data returned has a conditional statement where if res.locals.movies exist from the movieExist middleware then we will filter and only return the reviews with matching movieId as params in the path
  res.json({data : reduceCritics(data).filter(movie ? m => movie.movie_id == m.movie_id : () => true) }); 
}

async function reviewExists(req, res, next) {
  const review = await reviewsService.read(req.params.reviewId);
  if (review) {
    res.locals.review = review;
    return next();
  }
  next({ status: 404, message: `Review cannot be found.` });
}

async function destroy(req, res) {
  await reviewsService.delete(res.locals.review.review_id);
  res.sendStatus(204);
}

async function update(req, res) {
  const updatedReview = {
    ...req.body.data,
    review_id: res.locals.review.review_id,
  };
  await reviewsService.update(updatedReview);
  const update = await reviewsService.read(res.locals.review.review_id);
  res.json({ data: update });
}

module.exports = {
  list: asyncErrorBoundary(list),
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
  update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
};
