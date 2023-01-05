const knex = require("../db/connection");

function list(movie){
    if(movie){
        return knex("theaters as t")
        .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
        .join("movies as m", "mt.movie_id", "m.movie_id")
        .select("t.*","m.*")
        .where({"m.movie_id" : movie.movie_id, "is_showing" : true})
    } else {
        return knex("theaters as t")
        .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
        .join("movies as m", "mt.movie_id", "m.movie_id")
        .select("t.*","m.*")
    }
}




module.exports= {list}
