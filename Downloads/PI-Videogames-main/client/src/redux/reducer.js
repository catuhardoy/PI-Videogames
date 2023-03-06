import {GET_ALL_VIDEOGAMES, 
        GET_VIDEOGAME,
        GET_GENRES, 
        FILTER_BY_GENRE,
        FILTER_CREATED, 
        ORDER_BY_NAME, 
        POST_VIDEOGAME, 
        ORDER_BY_RATING,
        GET_DETAIL, 
        DETAIL_REMOVE } from "./actions"

const initialState = {
    videogames: [],
    allVideogames: [],
    genres: [],
    detail: {}
    
    //  inicio el estado en un array vacio
}

const RootReducer = (state = initialState, action)=>{  // funcion que sabe que hacerle al estado global, tiene que saber qué estado modifica y recibe una action
    switch(action.type){
        case GET_ALL_VIDEOGAMES:
            return {...state, 
                videogames: action.payload,
                allVideogames: action.payload} // copia del estado y traigo videogames 
        
        case GET_VIDEOGAME:

            return {...state, 
                videogames: action.payload}
        
       case GET_GENRES:
           return{
               ...state,
               genres: action.payload
           }
           case FILTER_BY_GENRE:
            const allGenreVideogames = state.allVideogames;   // con esto funcionan todos los de la api
            const videogamesFiltered = [];
            allGenreVideogames.forEach((videogames) =>
                videogames.genres.filter((genre) => {
                 
                if (genre.name === action.payload) {
                  videogamesFiltered.push(videogames);
                }
                
              })
            );

            return {
              ...state,
              videogames:
                action.payload === "all" ? allGenreVideogames : videogamesFiltered,
            };

        case FILTER_CREATED:
            const createdFilter = action.payload === "created"
            ? state.allVideogames.filter((vg)=> vg.created) 
            : state.allVideogames.filter((vg)=>!vg.created)
            
            return{
                ...state,
                videogames: action.payload === "all" ? state.allVideogames : createdFilter,
            }

        case ORDER_BY_NAME:
        let sortedArray = 
        action.payload === "asc"
          ? state.videogames.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.videogames.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        videogames: sortedArray,
      };
    case ORDER_BY_RATING:
        let sortByRating = 
        action.payload === "low"
          ? state.videogames.sort(function (a, b) {
              if (a.rating > b.rating) {
                return 1;
              }
              if (b.rating > a.rating) {
                return -1;
              }
              return 0;
            })
          : state.videogames.sort(function (a, b) {
              if (a.rating > b.rating) {
                return -1;
              }
              if (b.rating > a.rating) {
                return 1;
              }
              return 0;
            });

    return {
        ...state,
        videogames: sortByRating,
      };
      
    case POST_VIDEOGAME:
          return{
              ...state
          }
  
      case  GET_DETAIL:
            return{
              ...state,
                detail : action.payload
            }    
      case DETAIL_REMOVE:
              return{
                  ...state, 
                  detail: action.payload
            }
            case "DELETE_VIDEOGAME":{
              return{
                  ...state
              }
          }            
    
default :
    return {...state}
    }
           
}

export default RootReducer