import React,{useEffect,useState} from 'react';
import Recipe from "./Recipe";
import './App.css';
import { findRenderedComponentWithType } from 'react-dom/test-utils';

const App = () => {
    const App_ID="APP_ID";
  
   const App_Key="c25d2f76b38588d242ddadeefa9a5cbb";
  const [recipes,setrecipes]=useState([]);
  const [search,setsearch]=useState('');
  const [query,setquery]=useState("chicken");

  useEffect(()=>{
    getRecipes();
  },[query]);//if this is empty array will run useeffect only one time

  const getRecipes=async ()=>{
    const response=await fetch(`https://api.edamam.com/search?q=${query}&app_id=${App_ID}&app_key=${App_Key}`);
    const data=await response.json();
    setrecipes([]);
    setrecipes(data.hits);
    console.log(data.hits);
  }

  const updateSearch=e=>{
    setsearch(e.target.value);
  }

  const getSearch=e=>{
    e.preventDefault();
    setquery(search);
    setsearch('');
  }
   return(
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" 
        type="text" 
        value={search} 
        onChange={updateSearch}/>
        <button className="search-button" type="submit">Search</button>
      </form>
      <div className="recipes">
      {recipes.map(recipe=>(
        <Recipe key={recipe.recipe.label}
                title={recipe.recipe.label}
                calories={recipe.recipe.calories}
                image={recipe.recipe.image}
                ingredients={recipe.recipe.ingredients}
        />
      ))}
      </div>
    </div>
   );
}
export default App;
