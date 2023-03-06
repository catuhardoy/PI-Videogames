const {Videogame,Genre} = require ("../db");
const {getAllVideogames, 
    getVideogamesByName} = require ("../controllers/videogamesController")

const getVideogamesHandler = async (req, res) => {

    const {name} = req.query
    try {
        if (name){
            let allResults =  await getVideogamesByName(name);
            let results= allResults.filter((vg)=> vg.name.toLowerCase().includes(name.toLowerCase()))
            if (results.length === 0) throw new Error ("No matching videogames");

            if (results.length >= 16){
            let shortResult =  results.slice(0,15)
            return res.status(200).send(shortResult)
            } 
            if(results.length){
            res.status(200).send(results)
        }    
        }else{
            const videogames = await getAllVideogames();
            res.status(200).send(videogames)   
        }
    } catch (error) {
    res.status(404).send({error: error.message})  
    
    }
}

         
//    

const createVideogamesHandler = async (req, res)=> {
    let {name,
        description,
        released,
        rating,
        background_image, 
        genres,
        platforms,
        created,
     } = req.body


     let newVideogame = await Videogame.create({  // Esta funcion es asincrona porque tengo que esperar que me llegue la data del body y que busque los generos que yo le estoy aplicando en el body// 
        name, 
        description, 
        released, 
        rating, 
        background_image : background_image ||"https://plantillasdememes.com/img/plantillas/imagen-no-disponible01601774755.jpg",
        created,
        platforms})
      
    let dbGenre = await Genre.findAll({   // asocia el juego que estoy creando con el genero que le pasan por body.
            where: {
              name: genres
            }
          })
          if(!dbGenre) dbGenre = await Genre.create({name: genres})
      
    await newVideogame.addGenre(dbGenre)
    res.status(201).send(newVideogame)
         
}// el paginado el estado, el estado tengo q setearlo en uno
//quiero ver el q tiene rating lo q tiene entre 4 y 5



module.exports = {createVideogamesHandler,getVideogamesHandler} 