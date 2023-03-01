//tiene que renderizar el componente Card
// import { useParams } from "react-router-dom"
import Card from "../Card/Card"
import style from "./CardsContainer.module.css"
import { useSelector} from "react-redux"
import { Paginado } from "../../views"
import { toFormData } from "axios"


// import { getAllVideogames } from "../../redux/actions"

const CardsContainer = ({videogamesPerPage, currentPage, totalVideogames})=>{ 


  
    const videogames = useSelector(state=>state.videogames)// trae el estado de videojuegos
   
    const start = (currentPage-1) * videogamesPerPage  // armo paginado
    const end = (start + videogamesPerPage)

    return (
        <div className={style.container}>

            
           {videogames.slice(start, end).map((videogame) => (
                <Card
                key = {videogame.key}
               id = {videogame.id}
               name = {videogame.name} // estos nombres refieren a como estan llamados en la API. slo estoy recibiendo 
               description = {videogame.description}
               released = {videogame.released}
               rating = {videogame.rating}
               background_image = {videogame.background_image}
               genres = {videogame.genres}
               />
           ))}
          
        </div>
    )
   
}
export default CardsContainer