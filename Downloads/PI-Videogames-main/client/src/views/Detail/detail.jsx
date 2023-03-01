import { getDetail } from "../../redux/actions";
import { Link, useParams } from "react-router-dom";    
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import style from "../Detail/detail.module.css"

const Detail = () =>{

    const dispatch = useDispatch();
    const {id} = useParams();

    useEffect(() => {
        dispatch(getDetail(id));
    }, [dispatch, id]) 

    const detail = useSelector(state => state.detail);

    return (
        <div className={style.detailcont}>
            {
            detail? (
        
                <div className={style.detailcont}>
                    <img src={detail.background_image} alt={detail.name} width= "150px" height = "200px" />
                    <h1>Name: {detail.name}</h1>
                    <h4>Id: {detail.id}</h4>
                    <p>Released: {detail.released}</p>
                    {detail.description && (
                            <h4>Description: {detail.description.replace(/[<p></p>]/g, '')}</h4>
                        )}
                   
                    <p>Rating: {detail.rating}</p>
                    <p className={style.detailgenres}>Genres: </p>
                        <h3>
                            {detail.genres?.map((genre)=>(   
                            <p>{genre.name}</p>
                    ))} </h3>
                    
                    <p className={style.detailplat}>Platforms: </p>
                    <h4>
                        {detail.platforms?.map((platform)=>(
                            <ul>{platform}</ul>
                        ))}
                    </h4>
                </div> 
            ) : ( 
            <div>
                <h2>Loading...</h2>
            </div> 
            )}
        <div>
        <Link to = {'/home'}>
            <button>Go Home</button>
        </Link>

        </div>
        </div>
    )
 }
                    
export default Detail;