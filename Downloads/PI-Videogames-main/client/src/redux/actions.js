//en este archivo sucede la conexion entre el servidor y el cliente
// Si trabajo con redux tengo que armar una accion para darle logica a los filtrados.

import axios from 'axios';

export const GET_ALL_VIDEOGAMES = 'GET_ALL_VIDEOGAMES';
export const GET_VIDEOGAME = 'GET_VIDEOGAME';
export const GET_GENRES = 'GET_GENRES';
export const FILTER_BY_GENRE = "FILTER_BY_GENRE";
export const FILTER_CREATED = 'FILTER_CREATED';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const POST_VIDEOGAME = 'POST_VIDEOGAME'; 
export const ORDER_BY_RATING = 'ORDER_BY_RATING';
export const GET_DETAIL = "GET_DETAIL"

export const getAllVideogames = () => {
    return async function(dispatch) { //espera la info de axios y desp despacha la action al reducer
        const apiData = await axios.get('http://localhost:3001/videogames'); // aca me conecto con el servidor (no con la bdd)
                                                                                // const videogames = apiData.data; la saco y pongo en el payload directamente 
       return dispatch ({type: GET_ALL_VIDEOGAMES, payload: apiData.data}); // ahora armo la accion y es despachada con un payload
    };
};

export const getVideogame = (name) => {  // recibo nombre como parametro
    return async function(dispatch) {   // se arma una fn asincrona y pongo try catch para que maneje errores
        try {
            const apiData = await axios.get("http://localhost:3001/videogames?name=" + name);  // no va con backtiks
        
            return dispatch ({type: "GET_VIDEOGAME", payload: apiData.data}); // despacho la peticion. Payload: api.data es la respuesta
            
        } catch (error) {
            alert("Videogame not found");
            
        };
    };
};

export const getGenres = () => {
        return async function (dispatch) {
          const apiData = await axios.get("http://localhost:3001/genres", {});
          return dispatch({ type: "GET_GENRES", payload: apiData.data });
        };
      }

export const filterByGenre =(payload)=>{
    return{
        type: "FILTER_BY_GENRE",
        payload
    }
}      
export const filterCreated = (payload) => { 
    return{
        type: "FILTER_CREATED",
        payload
    }
}

export const orderByName = (payload) => {
    return {
        type: "ORDER_BY_NAME",
        payload
    }
}
export const orderByRating = (payload) => {
    return {
        type: "ORDER_BY_RATING",
        payload
    }
}

export const postVideogame = (payload) => {
    return async function(dispatch) {
            const apiData = await axios.post("http://localhost:3001/videogames", payload);
            return dispatch ({type: "POST_VIDEOGAME", payload: apiData.data});
            
       
        };
};


export const getDetail = (id) => {
   
        return async function(dispatch) {
            
                const apiData = await axios.get(`http://localhost:3001/videogame/${id}` );
                return dispatch ({type: "GET_DETAIL", payload: apiData.data});
                
            }
        };

    
