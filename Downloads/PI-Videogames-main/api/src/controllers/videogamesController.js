const axios = require('axios');
const {Videogame, Genre} = require("../db");
const {API_KEY} = process.env
const {Op} = require("sequelize");
require("dotenv").config();

const filtrado = (v) =>{  // nuevamente uso la fn de filtrado
  return{
    id: v.id,
      name: v.name,
      rating: v.rating,
      released : v.released,
      background_image: v.background_image,
      created: false,
      platforms: v.platforms.map((p)=> p.platform.name),
      genres: v.genres.map((g) => {
        return {
          name: g.name,
        };
      }),
  }
}

const getApiVideogames = async () => {
  
  let apiGames = [];
  for (let i = 1; i < 6; i++) {  // le pido que me traiga 100 juegos. 20 x pag
    let allApiData = await axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`
    );
    apiGames = apiGames.concat(allApiData.data.results);
  }
  const filtro = apiGames.map((v) => filtrado(v));  // al array apiGames lo mapeo y q cada uno de los juegos lo voy a filtrar y desp a cada uno de esos los mapeo para q me llegue determinada info y de cierta manera
  return filtro
  
};

  
const getDbVideogames = async()=>{

  return await Videogame.findAll({
      // attributes: ["id", "name", "rating", "background_image", "created"],
      include:{
        model: Genre,
        attributes: ["name"],
        through:{
          attributes: [],
        }
      }
    });
};
const getAllVideogames = async ()=> { // concateno la informacion que obtuve de la bd y la api
  const allApiVideogames = await getApiVideogames()
  const allDbVideogames = await getDbVideogames()
  return allApiVideogames.concat(allDbVideogames)
}

const getApiVideogamesByName = async (name)=> {

  const apiData = await axios.get(
    `https://api.rawg.io/api/games?search={${name}}&key=${API_KEY}`
  );
  const videogamesByName = apiData.data.results.map((v) =>filtrado(v))
  return videogamesByName
    
};
    

const getDbVideogamesByName = async (name) => {
  let videogamesByName = await Videogame.findAll({
    // attributes: ["id", "name", "rating", "background_image", "created"], op.substring es para q incluya el nombre en la busqueda. puedo incluir parte de eso q se escribe o toodo
    where: {
      name: {
        [Op.substring]: name,
      },
    },
    include: [
      {
        model: Genre,  // pido al modelo de generos, solo el nombre y lo incluyo en atributos
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    ],
  });
  return videogamesByName;
};

const getVideogamesByName = async(name)=>{
  const apiVideogamesByName = await getApiVideogamesByName(name);
  const dbVideogamesByName = await getDbVideogamesByName(name)
  return [...apiVideogamesByName, ...dbVideogamesByName] // estos resultados concatenados se exportan para usar en el handler
}


module.exports = {getAllVideogames, 
  getVideogamesByName
 }


 //const getPlatforms = async()=>{
//    let videgames = getAllVideogames()

//  let platform =  videogames.platforms.map((p)=> p.platform.name)
//    return platform

//  }