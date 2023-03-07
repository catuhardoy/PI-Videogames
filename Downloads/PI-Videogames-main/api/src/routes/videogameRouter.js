const {Router} = require ("express");
const videogameRouter = Router();
const {getVideogameHandler, deleteVideogameHandler} = require ("../handlers/videogameHandler");
// const videogamesRouter = require("./videogamesRouter");


videogameRouter.get("/:id", getVideogameHandler);

videogameRouter.delete("/:id", deleteVideogameHandler)

module.exports = videogameRouter