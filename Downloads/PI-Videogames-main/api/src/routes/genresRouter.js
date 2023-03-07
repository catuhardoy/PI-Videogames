const { Router } = require('express');
const genresRouter = Router();

const {getGenresHanlder} = require ("../handlers/genresHandler")

genresRouter.get ("/", getGenresHanlder);

//genresRouter.get("/platforms", getPlatformsHandler)

module.exports = genresRouter