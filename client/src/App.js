import Landing from '../src/pages/Landing/Landing'; 
import Home from './pages/Home/Home';
import CreateRecipe from './pages/Form/Createrecipe'
import RecipeDetail from "./pages/RecipeDetail/RecipeDetail"

import {Route} from "react-router-dom"

function App() {
  return (
    <div className="App">
      
      <Route exact path="/" component={Landing} />
      
      <Route path="/home"  >
        <Home/>
      </Route>
     
     <Route path="/createrecipe" render={()=><CreateRecipe/>}/>

     <Route path="/recipedetail/:id" component={RecipeDetail}/>

     {/*falta la ruta para 404 NOT FOUND */ }

    </div>
  );
}

export default App;
