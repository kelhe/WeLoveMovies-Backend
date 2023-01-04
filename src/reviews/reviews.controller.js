const reviewsService = require("./reviews.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function reviewExists(req,res,next){
    const review = await reviewsService.read(req.params.reviewId);
    if(review){
        res.locals.review = review;
        return next();
    }
    next({status: 404, message : `Review cannot be found.`})
}

async function destroy(req,res){
    await reviewsService.delete(res.locals.review.review_id)
    res.sendStatus(204)
}

async function update(req,res){
    const updatedReview = {
        ...req.body.data,
        review_id : res.locals.review.review_id
    }
    await reviewsService.update(updatedReview)
    const update = await reviewsService.read(res.locals.review.review_id)
    res.json({data : update})
}

module.exports = {
    delete : [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
    update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)]
}