import { useState, useEffect } from 'react';
import React from 'react';
import AllFoods from "./pages/AllFoods";
import SingleFood from "./pages/SingleFood";
import Form from "./pages/Form";
import {Route,Switch, Link} from "react-router-dom";
import "./App.css"


const url = "https://foodrails.herokuapp.com/foodmodels/"


function App(props) {
  //Style Objects///////////////////////////////////////////////


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

  const [targetFood, setTargetFood] = useState(nullFood)

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

  const getTargetFood = (food) => {
    setTargetFood(food)
    props.history.push("/edit")
  }
  
  const updateFood = async(food) => {
    const response = await fetch(url + food.id + "/", {
      method: "put",
      headers: {
        "Content-Type": "application/json"},
      body: JSON.stringify(food)
    })

    getFoods()
  }

  const deleteFood = async(food) => {
    const response = await fetch (url + food.id + "/", {
      method: "delete"
    })
    getFoods()
  }

  //useEffects 

  useEffect(() => {getFoods()}, [])
 
  //Returned variables
    return (
      <div className="App">
        <h1 className="h1">Welcome to FoodRails</h1>
        <div class="row">
    
          {(rp) => <AllFoods foods = {foods.img} {...rp}/>}
            
        </div>
        <Link to="/new"><button style={button}>Click Here To Get Started</button>
        {(rp) => <AllFoods foods = {foods} {...rp}/>}

        </Link>
        <Switch>
          <Route
            exact
            path="/"
            render={(rp) => <AllFoods foods = {foods} {...rp}/>}
          
          />
          <Route
            path="/food/:id"
            render={(rp) => <SingleFood foods={foods}
            edit={getTargetFood} 
            deleteFood = {deleteFood}
            {...rp}/>}
          
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
            render={(rp) => <Form
              initialFood={targetFood}
              handleSubmit={updateFood}
              buttonLabel="update food"
              {...rp}/>}
          
          />

        </Switch>
      </div>
    );
}

export default App;