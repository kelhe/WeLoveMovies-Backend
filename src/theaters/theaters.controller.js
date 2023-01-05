const theatersService = require("./theaters.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")
const reduceProperties = require("../utils/reduce-properties")


async function list(req,res){
    if(res.locals.movie){
        const data = await theatersService.list(res.locals.movie)
        res.json({data})
    }

    const data = await theatersService.list()
    const reduceMovies = reduceProperties("theater_id", {
        movie_id: ["movies", null, "movie_id"],
        title: ["movies", null, "title"],
        runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
        rating: ["movies", null, "rating"],
        description: ["movies", null, "description"],
        image_url: ["movies", null, "image_url"],
        is_showing: ["movies", null, "is_showing"],
    })
    res.json({ data : reduceMovies(data) })
}


module.exports = {
    list: asyncErrorBoundary(list)}