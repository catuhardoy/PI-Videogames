import { getDetail, detailRemove, deleteVideogame } from "../../redux/actions";
import { Link, useParams } from "react-router-dom";    
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import style from "../Detail/detail.module.css"


const Detail = () =>{

    const dispatch = useDispatch();

    const {id} = useParams();
    const detail = useSelector(state => state.detail);


    useEffect(() => {  // si el componente detail se renderiza se activa el useEffect
        dispatch(getDetail(id));
        return(()=>{
            dispatch(detailRemove({}))
        })                              //despacha la accion que me trae el detail del  id que me estan trayendo por parametro
    }, [dispatch, id]) 

    const deleteVideo = ()=>{
        if(window.confirm("Would you like to delete this videogame?")=== true){
            dispatch(deleteVideogame(id))
            alert("Videogame removed")
           
        }
        else{
            alert("Canceled")
        }
    }


    return (
        <div className={style.detailcont}>
            {
            detail? (
        
                <div className={style.main}>
                    <br />
                    <br />

                      <Link to = {'/home'}>
            <button className={style.detailbtn}>Go Home</button>
        </Link>
                    <br />
                    <p className={style.name}>ID: {detail.id}</p>
                    <img className={style.img} src={detail.background_image} alt={detail.name} width= "200px" height = "200px" />
                    <p className={style.name}> ⭑ Rating ⭑ {detail.rating}</p>
                    
                    <h1 className={style.name}> {detail.name}</h1>
                    <p className={style.name}>Released: {detail.released}</p> 
                    {detail.description && (
                            <h4 className={style.description}>{detail.description.replace(/[<p></p>]/g, '')}</h4>
                        )}
                    
                        <h3 className={style.name}>GENRES : </h3>
                            {detail.genres?.map((genre)=>(   
                            <p className={style.name}>{genre.name} </p>
                    ))} 
                    
                    <h3 className={style.name}>PLATFORMS :  </h3>
                    
                        {detail.platforms?.map((platform)=>(
                            <p className={style.name}>{platform}</p>
                        ))}
                
                   <h3>{detail.created && <button className={style.detailbtn} onClick={deleteVideo}>X</button>}</h3> 
                
                </div> 
            ) : ( 
            <div>
                <h2>Loading...</h2>
            </div> 
            )}
        <div>
        {/* <Link to = {'/home'}>
            <button className={style.detailbtn}>Go Home</button>
        </Link> */}

        </div>
        </div>
    )
 }
                    
export default Detail;