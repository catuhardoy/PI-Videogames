import { Route, Switch, useLocation } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import {Home, Landing, Detail, Forms} from "./views"


function App() {

  const location = useLocation()

  return (
    <div className="App">
      {location.pathname !== "/" && <NavBar/>}
      <Switch>    
      <Route exact path="/"> 
        <Landing/>
      </Route>
      <Route path="/home"> 
        <Home/>
      </Route>
      <Route path ="/detail/:id"> 
        <Detail/>
      </Route>
      <Route path="/create" > 
        <Forms/>
      </Route>
  
      </Switch>
     
    </div>
  );
} 
// el switch se encarga de manejar las rutas, me lleva a la ultima pagina posible y no me tira error.

export default App;
