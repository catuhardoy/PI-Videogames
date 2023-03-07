import { Link } from "react-router-dom";
import style from "../Landing/landing.module.css"

const Landing = ()=>{
    return (
        <div className={style.body}> 
            <h2 className={style.animatedheading}>VIDEOWORLD</h2>
            <h3 className={style.find}>Find,create,imagine</h3>
            <Link to = "/home">
            
            <div class="button-container">
            <button className={style.startbtn} type="button">START</button>
            </div>
            </Link> 
        </div>
        
    )
}
export default Landing;