const axios = require ("axios");
const {Genre} = require ("../db")
const {API_KEY} = process.env
// const {Op} = require("sequelize")

const getAllGenres = async ()=>{

        const response = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
        const allApiGenres = response.data.results;
        const filteredApiGenres = allApiGenres.map((g)=>{
            return {
                name: g.name
            }
        })

        filteredApiGenres.forEach((g) => {
               Genre.findOrCreate({
                where: {
                    name: g.name,
                },
            });
        }); 

    const getDbGenres =  await Genre.findAll()
    return getDbGenres
    }

  
module.exports = {getAllGenres}

