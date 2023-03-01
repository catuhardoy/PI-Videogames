const axios = require("axios");
const {Videogame, Genre} = require ("../db");
const {API_KEY} = process.env

const filtrado = (v) =>{
    return{
      id: v.id,
        name: v.name,
        rating: v.rating,
        released : v.released,
        background_image: v.background_image,
        created: false,
        description: v.description,
        platforms: v.platforms.map((p)=> p.platform.name),
        genres: v.genres.map((g) => {
          return {
            name: g.name,
          };
        }),
    }
  }

const getVideogameById = async (id) =>{
    
    const videogameApiId = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
    
    const filtro = filtrado(videogameApiId.data)
    return filtro
}

const getVideogameDbId = async (id)=>{

    const dbId = await Videogame.findByPk(id,{
        include: [
            {
                model:Genre,
                attributes:  ["name"],
                through: {attributes: []}
            }
        ] 
        
    })
    return dbId
}

module.exports = {getVideogameById,getVideogameDbId}