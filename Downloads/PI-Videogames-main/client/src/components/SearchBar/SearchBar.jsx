
import {useState} from "react"
import style from "./SearchBar.module.css"
import { useDispatch } from "react-redux"
import { getVideogame } from "../../redux/actions";


export default function SearchBar() {
const dispatch = useDispatch()   
const [name, setName] = useState("") //espero un string name

 
   const handleChange = (e) => {
      setName(e.target.value)  // el value del input va a tomar el value del state. Setea el name recibido para buscarlo
    }
   const handleSubmit = (e) => {  // busca una vez que aprieto el boton
      e.preventDefault();
      dispatch(getVideogame(name))  // despacaha la action que hace la busqued

      setName ("")  // setea nuevamente el string vacio
   }  
  
   return (
      <div className={style.back}>
         <input
        className= {style.search}
         type='text' 
         value = {name} 
         placeholder = 'Search'
         onChange = {(e) => handleChange(e)} />

      <button className={style.searchbtn} type = "submit" onClick ={(e)=> handleSubmit(e)}>SEARCH</button>
      <br />
      </div>
   );
}
