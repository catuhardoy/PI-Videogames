import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import{Link, useHistory} from "react-router-dom";
import { postVideogame, getGenres} from "../../redux/actions";
import style from "../Forms/forms.module.css"
// import axios from "axios"

function validate(form) {  // funcion para validar el formulario
    let error = {};
    if (!form.name) {
      error.name = "Name require";
    }else{
        if (form.name.replace(/ /g, "").match(/[^A-Za-z0-9]/)){
            error.name = "The name must be alpha-numeric"
        }
        if(form.name.length > 30){
            error.name = "Maximun 25 characters"
        }
    }
    if (!form.description) {
      error.description = "Description require";
    }else{
        if(form.description.length <50){
            error.description = "Description must have at least 50 characters"
        }
    }
   
    return error;
  }

const Forms = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const genres = useSelector((state) => state.genres);  // traigo el estado del reducer


    const [errors, setErrors] = useState({  // este es el estado de errores
        name: "",
        description: ""
    })     
    const [form, setForm ]= useState({   // seteamos estado del form. y pongo que contenido hay que agregar mediante el post
        name: "",
        description: "",
        released: "",
        rating: 0,
        genres: [], // es un array asi puedo meterle todos los que quiero
        background_image: "",
        platforms: []    

            })
           
    useEffect(()=>{
        dispatch(getGenres())   // despacho esta accion para traerme los generos
    },[dispatch])             

    
    const changeHandler = (e)=> { // este habndler trae el evento para que me vaya trayendo lo que escribe el cliente en el form. 
      setErrors(                  // primero le paso los errores para que primer vea si hay error y frene antes.
        validate({
            ...form,
            [e.target.name] : e.target.value
        })
        
    )
    setForm ({  // si no hay errores que me setee el form
        ...form,
        [e.target.name]: e.target.value }) 
}
    
    const selectHandler = (e) => {  // con este handler selecciono los distintos generos de videojuegos que tengo.
        const property = e.target.value

        setForm({
            ...form,
            genres:[...form.genres, property] 
        })
     
    }

    const selectPlatformsHandler = (e) => {  // handler para seleccionar las distintas plataformas que tengo
        const property = e.target.value
        setForm({
            ...form,
            platforms:[...form.platforms, property] 
        })
        

    }
    const submitHandler = (e) =>{ // aca quiero mandar una request al backend. Maneja el boton de SUBMIT
        e.preventDefault()
        setErrors(
            validate({
                ...form,
                [e.target.name] : e.target.value
            })
        ) 
        if (Object.keys(errors).length === 0) {  // si el form no maneja errores, 
            console.log(form)
            dispatch(postVideogame(form));        // despacho la accion del formulario y genero una alerta de Videogame created!
            
            alert("Created videogame!");
            setForm({                         // vuelvo a setear los valores del formulario en string vacio, cero, etc.
              name: "",
              description: "",
              released: "",
              rating: 0,
              genres: [],
              platforms: [],
              background_image: ""
              
            });
          } else {
            alert("ERROR! videogame Not created!");
            return;
          }
      
        // dispatch(postVideogame(form))
       
        // setForm({
        //     name: "",
        //     description: "",
        //     released: "",
        //     rating: "",
        //     genres: [], // es un array asi puedo meterle todos los que quiero
        //     background_image: "",
        //     platforms: []    

        // })
        history.push("/home")  // redirijo al home cuando crea su videogame

        // axios.post("http://localhost:3001/videogames", form) // asi mando el body al backend
        // .then(res=>alert(res)) //queda cambiar cosas
        // .catch(err=>alert(err))
    }
    console.log(form)
    return (
       <form onSubmit= {(e) => submitHandler(e)} className = {style.bodyforms}>
          
           <div>
               <br />
               <br />

              <Link to="home"><button className={style.startforms}>BACK HOME</button></Link> 
              <h1>CREATE YOUR OWN VIDEOGAME</h1>
              
                <label>Name:</label>
                <input 
                 type="text" 
                 required
                 value={form.name} 
                 onChange={(e) => changeHandler(e)} 
                 name="name"/> 
                 {errors.name && <p>{errors.name}</p>}
            </div>
            <br />

            <div>
                <label>Description:</label>
                <input 
                 type="text" 
                 required
                 value={form.description} 
                 onChange={(e) => changeHandler(e)} 
                 name="description"/>
                 {errors.description && <p>{errors.description}</p>}
           </div>
                <br />
           <div>
                <label>Released:</label>
                <input 
                 type="date"
                 required 
                 value={form.released} 
                 onChange={(e) => changeHandler(e)} 
                 name="released" />
           </div>
            <br />
           <div>
                <label>Rating:</label>
                <input 
                 type="number" 
                 min = "1" 
                 max="5"  
                 required
                 value={form.rating} 
                 onChange= {(e) => changeHandler(e)} 
                 name="rating"/>
           </div>
           <br />
           
           <div>
               <label>Genres:</label>
               <select onChange = {(e) => selectHandler(e)}>
                   {genres.map((g)=>(
                       <option value={g.name}>{g.name}</option>
                    ) )}                                          
               </select>
               <br />
               
           </div>
           <div>
            <label htmlFor="">Platforms:</label>
                <select name="platforms" id="" onChange={(e)=>selectPlatformsHandler(e)}>
                <option value="Ps3">Ps3</option>
                <option value="Ps4">Ps4</option>
                <option value="Ps Vita">Ps Vita</option>
                <option value="Xbox">XBox</option>
                <option value="Xbox 360">Xbox 360</option>
                <option value="Nintendo">Nintendo</option>
                <option value="MacOs">MacOS</option>
                <option value="PC">PC</option>
                <option value="Linux">Linux</option>
                </select>
                <br />
                
            </div>  

           <div>
               <label>Image</label>
               <input type="text" 
               value={form.background_image} 
               onChange= {(e) => changeHandler(e)}
               name="background_image" />
            </div>
            <br />
            <br />

           <button type="submit" className={style.startforms}>CREATE VIDEOGAME</button>
       </form>
    )
}
export default Forms;


// quiero guardar esta info en un estado que va a ser un objeto.
// que tenga todas estas mismas propiedades.
//quiero que el formulario sea el reflejo de mi estado y viceversa.
// formulario y estado tienen que tener la misma cosa escrita en cu de sus propiedades.