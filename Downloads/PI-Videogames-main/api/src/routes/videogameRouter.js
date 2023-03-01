const {Router} = require ("express");
const videogameRouter = Router();
const {getVideogameHandler} = require ("../handlers/videogameHandler")


videogameRouter.get("/:id", getVideogameHandler);

module.exports = videogameRouter