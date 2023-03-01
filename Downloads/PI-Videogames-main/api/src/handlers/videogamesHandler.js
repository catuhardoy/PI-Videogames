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

// const getVideogameHandler = async (req, res)=> {
//     const {id} = req.params;
//     try {
//         if(isNaN(id)){
//             let dbVideogame = await getVideogamesById(id);
//             res.status(200).json(dbVideogame)
//         }else{
//             let apiVideogame = await get(id);
//             res.status(200).json(apiVideogame)
//         }
//         } catch (error) {
//         res.status(404).json({error : error.message})
//     }
// };
    

     
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


     let newVideogame = await Videogame.create({
        name, 
        description, 
        released, 
        rating, 
        background_image : background_image ||"https://plantillasdememes.com/img/plantillas/imagen-no-disponible01601774755.jpg",
        created,
        platforms})
      
    let dbGenre = await Genre.findAll({
            where: {
              name: genres
            }
          })
          if(!dbGenre) dbGenre = await Genre.create({name: genres})
      
    await newVideogame.addGenre(dbGenre)
    res.status(201).send(newVideogame)
         
}


module.exports = {createVideogamesHandler,getVideogamesHandler} 