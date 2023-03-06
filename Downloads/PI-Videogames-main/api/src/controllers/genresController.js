const axios = require ("axios");
const {Genre} = require ("../db")
const {API_KEY} = process.env
// const {Op} = require("sequelize")

const getAllGenres = async ()=>{  // es de aca donde mi selector del front trae todos lo generos

        const response = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
        const allApiGenres = response.data.results;
        const filteredApiGenres = allApiGenres.map((g)=>{  // con este map solo me traigo los nombres
            return {
                name: g.name
            }
        })

        filteredApiGenres.forEach((g) => { // recorro los resultados, me fijo si estan en la base de datos, si no esta, lo creo.
               Genre.findOrCreate({
                where: {
                    name: g.name,
                },
            });
        }); 

    const getDbGenres =  await Genre.findAll()  // traigo todos los generos
    return getDbGenres
    }

  
module.exports = {getAllGenres}

