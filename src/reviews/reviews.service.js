const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties")
const addCritic = mapProperties({
    // critic_id: "critic.critic_id",
    preferred_name : "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
    // created_at: "critic.created_at",
    // updated_at: "critic.updated_at"
})

//there is no endpoint for GET /reviews/:reviewId so this read service function will be used to confirm that the review exist in reviewExist middleware and used to join/create the critics nested obj for displaying the updated review
function read(reviewId){
    return knex("reviews as r")
                .join("critics as c", "r.critic_id", "c.critic_id")
                .select("r.*", "c.*")
                .where({"review_id" : reviewId})
                .first()
                .then(addCritic);
}

function destroy(reviewId){
    return knex("reviews").where({"review_id" : reviewId }).del();
}

function update(updatedReview){
    return knex("reviews")
        .select("*")
        .where({"review_id" : updatedReview.review_id})
        .update(updatedReview,"*")
}

module.exports = {
    read,
    delete : destroy,
    update
}