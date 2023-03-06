const {getVideogameById, getVideogameDbId} = require ("../controllers/videogameController")

const getVideogameHandler = async (req, res)=> {
    const {id} = req.params;
    try {
        if(isNaN(id)){
            let dbVideogame = await getVideogameDbId(id);
            res.status(200).json(dbVideogame)
        }else{
            let apiVideogame = await getVideogameById(id);
            res.status(200).json(apiVideogame)
        }
        } catch (error) {
        res.status(404).json({error : error.message})
    }
};

const deleteVideogameHandler = async(req, res)=>{
    const {id} = req.params

    try {
        await deleteVideogame(id)
        res.status(200).send("Videogame removed")
    } catch (error) {
        res.status(404).json(error)
    }
}
    
module.exports = {getVideogameHandler, deleteVideogameHandler}



