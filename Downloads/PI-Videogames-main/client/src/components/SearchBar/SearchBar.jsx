
import {useState} from "react"
import style from "./SearchBar.module.css"
import { useDispatch } from "react-redux"
import { getVideogame } from "../../redux/actions";


export default function SearchBar() {
const dispatch = useDispatch()   
const [name, setName] = useState("")

 
   const handleChange = (e) => {
      setName(e.target.value)  // el value del input va a tomar el value del state
    }
   const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(getVideogame(name))

      setName ("")
   }  
  
   return (
      <div className={style.back}>
         <input
         type='text' 
         value = {name} 
         placeholder = 'Search'
         onChange = {(e) => handleChange(e)} />

      <button className={style.searchbtn} type = "submit" onClick ={(e)=> handleSubmit(e)}>SEARCH VIDEOGAME</button>
      </div>
   );
}
