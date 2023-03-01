import { Link } from "react-router-dom";
import style from "../Landing/landing.module.css"

const Landing = ()=>{
    return (
        <div className={style.body}> 
            <Link to = "/home">
            <div class="button-container">
            <button className={style.startbtn} type="button">START</button>
            </div>
            </Link> 
        </div>
        
    )
}
export default Landing;