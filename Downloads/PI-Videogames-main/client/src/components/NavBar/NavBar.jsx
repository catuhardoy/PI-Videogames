import { Link } from "react-router-dom";
import style from "./NavBar.module.css";
import SearchBar from "../SearchBar/SearchBar";
// import {useDispatch} from "react-redux";


const NavBar = ({onSearch})=>{  // PORQUE ESTA ESTE ONSEARCH ACA?

// const dispatch = useDispatch();

// function handleFilter(e){
//     dispatch(filterByGenre(e.target.value))


    return(
        <div>
            <Link className={style.mainContainer} to="/home">HOME</Link>
            
            <SearchBar classname={style.mainContainer} onSearch = {onSearch}/>

        </div>
  
    )
}


export default NavBar


// hacer boton en landing para home
// hacer la searchbar