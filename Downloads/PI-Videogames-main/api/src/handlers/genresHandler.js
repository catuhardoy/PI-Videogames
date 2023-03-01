const { getAllGenres, } = require ("../controllers/genresController")


const getGenresHanlder = async (req, res)=>{
try {
    let result = await(getAllGenres())
    res.status(200).json(result)
    
} catch (error) {
    res.status(400).json({error: error.mesaage})
}
};

module.exports = {getGenresHanlder}