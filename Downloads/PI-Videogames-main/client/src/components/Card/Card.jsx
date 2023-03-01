import style from "./Card.module.css"
import React from "react"
import {Link} from "react-router-dom"  // puede ser un async o await. // el tema del ID puede ser que no

const Card = ({name, id, background_image, genres, rating})=>{  // traigo las props
   
    // Renderizo la card con las props que necesito mostrar en el home

    return (

    <div className={style.container}>
           
         <div>
            <img src={background_image} alt="notfound" width= "200px" height="250px"/>
            <Link to = {`/detail/${id}`}>
            <h3>Name: {name}</h3>
            </Link>
        </div> 
        
      
       <h5>{
             genres.map((genre) => (
                 <p>{genre.name}</p>
             )) 
            }   
        </h5>
        {/* <h4>Rating:{rating} </h4> */}
        

    </div>
    )
}

// aca renderizamos la carta VIDEOGAME con las props que necesito pasadas x parametro.
export default Card