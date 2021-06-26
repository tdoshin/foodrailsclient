import { useState, useEffect } from 'react';
import React from 'react';
import AllFoods from "./pages/AllFoods";
import SingleFood from "./pages/SingleFood";
import Form from "./pages/Form";
import {Route,Switch, Link} from "react-router-dom";

const url = "https://foodrails.herokuapp.com/foodmodels/"


function App() {
  //Style Objects///////////////////////////////////////////////

  const h1 = {
    textAlign: "center",
    margin: "10px"
  }

  const button = {
    backgroundColor: "green",
    display: "block",
    margin: "auto"
  }

  //State and Other Variables/////////////////////////////////////
  const [foods, setFoods] = useState([]);

  const nullFood = {
    name: "",
    recipe: "",
    image: ""
  }

  //Functions ////////////////////////////////////////////////

  const getFoods = async() => {
    const response = await fetch(url)
    const data = await response.json()
    setFoods(data)
  }

  const addFoods = async (newFood) => {
    const response = await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newFood)
    })
    getFoods()
  }

  //useEffects 

  useEffect(() => {getFoods()}, [])
 
  //Returned variables
    return (
      <div className="App">
        <h1 style={h1}>FoodRails</h1>
        <Link to="/new"><button style={button}>Create New Food</button>

        </Link>
        <Switch>
          <Route
            exact
            path="/"
            render={(rp) => <AllFoods foods = {foods} {...rp}/>}
          
          />
          <Route
            path="/food/:id"
            render={(rp) => <SingleFood foods={foods} {...rp}/>}
          
          />
          <Route
            path="/new"
            render={(rp) => <Form initialFood={nullFood} 
            handleSubmit={addFoods}
            buttonLabel="create food"
             {...rp}/>}
          
          />

          <Route
            path="/edit"
            render={(rp) => <Form {...rp}/>}
          
          />

        </Switch>
      </div>
    );
}

export default App;