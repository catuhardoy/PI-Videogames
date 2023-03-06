const axios = require("axios");
const {Videogame, Genre} = require ("../db");
const {API_KEY} = process.env

const filtrado = (v) =>{  // esta funcion me retorna solamente la informacion que preciso. Como los generos son un array de objetos tengo que pedirle que solo me retorne los names
    return{
      id: v.id,
        name: v.name,
        rating: v.rating,
        released : v.released,
        background_image: v.background_image,
        created: false,
        description: v.description,
        platforms: v.platforms.map((p)=> p.platform.name),   // en platforms tengo que entrar a platforms--> platform --> name. por eo lo mapeo asi
        genres: v.genres.map((g) => {
          return {
            name: g.name,
          };
        }),
    }
  }

const getVideogameById = async (id) =>{
    
    const videogameApiId = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
    
    const filtro = filtrado(videogameApiId.data)  // uso la funcion de filtrado para que me traiga solo la nfo que quiero
    return filtro
}

const getVideogameDbId = async (id)=>{

    const dbId = await Videogame.findByPk(id,{  // que me encuentre por primary key 
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

const deleteVideogame = async (id)=>{
  if(!id) throw new Error ("missing ID");
  await Videogame.destroy({
      where: {id: id}
  })
}

module.exports = {getVideogameById,getVideogameDbId, deleteVideogame}