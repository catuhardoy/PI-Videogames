import style from "../Paginado/paginado.module.css"
import React from "react"; 

export default function Paginado ({videogamesPerPage, totalVideogames, setCurrentPage}) {

    
    const pageNumbers = [];

    if (videogamesPerPage <= 0) {
        return null;
    }

    for (let i = 0; i < Math.ceil(totalVideogames / videogamesPerPage); i++) {
        pageNumbers.push(i+1);   // recorro el arreglo de videogames, y lo divido por el numero de videogames por pagina
                                       // ese nro que obtengo, lo pusheo al pagenumbers me va a dar un arreglo de nros. 
    }


    const onChange = (e)=>{
        setCurrentPage(Number(e.target.value)) // llamo al estado
     }

    return (
        <div className={style.pages}>
            {pageNumbers && pageNumbers.map(number => (
                // < key={number}>
                    <button className={style.pagination} href="/" onClick={onChange} value = {number}>{number}</button>
                // </h3>
            ))}
        </div>
    )
};


