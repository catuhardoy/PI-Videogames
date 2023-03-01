import React from "react";
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import Paginado from "../Paginado/paginado";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideogames,filterCreated, orderByName, orderByRating, getGenres, filterByGenre } from "../../redux/actions"; // importo la accion
import { Link } from "react-router-dom";
import style from "../Home/home.module.css"


const Home = ()=>{
    const dispatch = useDispatch(); // para utilizar esta constante e ir despachando las acciones
    
    const genres = useSelector((state) => state.genres); // me conecta con el estado
    const allVideogames = useSelector((state) => state.videogames); // me tiene que llegar la data del estado inicial. me conecta con el estado
            // esta constante es lo mismo que el maps state to props. El useSelector te trae lo que hay en el estado                                    
    const [order, setOrder] = useState('')      
                                                                        // me conecta con el estado
    const [currentPage, setCurrentPage] = useState(1); 
    const totalVideogames = allVideogames?.length;
                                                       //es un estado local. le pido que me guarde el estado de la pagina actual. empieza en uno porque arranca desde la pag 1
    const [videogamesPerPage, setVideogamesPerPage] = useState(15);

    // el hook es un corta camino

    


    // const paginado = (pageNumber)=> {   
    //     setCurrentPage(pageNumber) 
    // }                                

    useEffect(()=>{
        dispatch(getAllVideogames())
        dispatch (getGenres());
    },[dispatch]);


    function handleClick(e){
        e.preventDefault();
        dispatch(getAllVideogames());
    }

    function handleFilterCreated(e){
        e.preventDefault()
        dispatch(filterCreated(e.target.value));  // despacho la accion , le paso es target value: que es el payload. 
    }

    function handleSort(e){
        e.preventDefault()
        dispatch(orderByName(e.target.value))
        setCurrentPage(1)  // setear la pagina en uno. 
        setOrder(`Ordenado ${e.target.value}`) // lo seteo ordenado de determinada manera
    }

    function handleSortRating(e){
        e.preventDefault()
        dispatch(orderByRating(e.target.value))
        setCurrentPage(1)  // setear la pagina en uno. 
        setOrder(`Ordenado ${e.target.value}`) 
    }

    function handleSortGenre(e){
        dispatch (filterByGenre(e.target.value))
        setCurrentPage(1)
    }  
    
    if (allVideogames) {

    return(
        
    <div className={style.bodyhome}>
        <div className={style.bodyhome}>
            <Link to = "/create" className={style.starthome}>CREATE NEW VIDEOGAME</Link>
                <h1 key="home">
                   </h1>
                <br />

                {/* <div>
                <Paginado 
                        totalVideogames = {totalVideogames}
                        currentPage = {currentPage}
                        setCurrentPage={setCurrentPage}
                        videogamesPerPage = {videogamesPerPage}

                        />
                    </div>     */}

           
            <button onClick = {e => {handleClick(e)}} className = {style.starthome} >
                Reload Videogames
            </button>
            </div> 
            <br/>
            <div>
                <Paginado 
                        totalVideogames = {totalVideogames}
                        setCurrentPage={setCurrentPage}
                        videogamesPerPage = {videogamesPerPage}

                        />
                    </div>    
            <div>
                <select className={style.starthome} onChange={(e) => handleSort(e)} >
                    <option value="">Select</option> 
                    <option value="asc">A to Z </option>                                        
                    <option value="desc">Z to A</option>
                </select>
              
                <select onChange={(e) => handleSortGenre(e)} className={style.starthome}>
                <option value="all">Genres</option> 
                    {genres.map((g)=> (
                    <option value={g.name}>{g.name}</option>))}
                   
                        
                </select>

                <select className={style.starthome} onChange={(e) => handleFilterCreated(e)} >
                    <option value="">Select</option> 
                    <option value="all">All Videogames</option>
                    <option value="created">Created Videogames</option>
                    <option value="existent">Existent Videogames</option>
                </select>
                <select onChange={e => handleSortRating(e)}className={style.starthome} > 
                    <option value="">Rating</option> 
                    <option value="low">Ascendant</option>                                        
                    <option value="high">Descendant</option>
                </select>
            </div>

                 <CardsContainer 

                videogamesPerPage ={videogamesPerPage}
                currentPage = {currentPage} 
                allVideogames = {allVideogames}
                /> 

                
         </div>   
      
        )
    }else{
        return(<div>loading...</div>)
    }
    
}

export default Home;