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


// const getApiVideogameById = async (id) =>{
    
//   const videogameApiId = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
  
//   const videogameId = [
//     { 
//      id: videogameApiId.data.id,
//      name: videogameApiId.data.name,
//      rating: videogameApiId.data.rating,
//      background_image: videogameApiId.data.background_image,
//      released: videogameApiId.released,
//      description: videogameApiId.description,
//      created: false,
//      genres: videogameApiId.data.genres.map((g)=>{
//          return{
//              name: g.name
//          }
//      }),
//      platforms: videogameApiId.data.platforms.platform.map((p)=>{
//        return{
//          name: p.platform.name
//        }
//      })
//   }
// ]
//   return videogameId
// }


// const getDbVideogameById = async (id)=>{

//   const dbId = await Videogame.findByPk(id, {
//     include: [
//       {
//         model: Genre,
//         attributes: ["name"],
//         through: {
//           attributes: [],
//         },
//       },
//     ],
//   });
//   return dbId
// };

// const getVideogamesById = async(name)=>{
//   const apiVideogamesById = await getApiVideogameById(name);
//   const dbVideogamesById = await getDbVideogameById(name)
//   return [...apiVideogamesById, ...dbVideogamesById]
// }


// const createVideogame = async (
//   name,
//   description,
//   released,
//   rating,
//   background_image, 
//   genres,
//   created,
//   platforms)=> {

//     const newVideogame = await Videogame.create(
//       {
//         name,
//         description,
//         released,
//         rating,
//         background_image,
//         platforms,
//         created
//       });

//     const dbGenre = await Genre.findAll({
//       where: {
//         name: genres
//       }
//     })
//     if(!dbGenre) dbGenre = await Genre.create({name: genres})

//     await newVideogame.addGenre(dbGenre)
   
//   }
 

module.exports = {getAllVideogames, 
  getVideogamesByName
 }
