import { useState, useEffect } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Nav from './components/Nav';
import React from 'react';
import ReactDOM from 'react-dom';
import AllFoods from "./pages/AllFoods";
import SingleFood from "./pages/SingleFood";
import Form from "./pages/Form";
import {Route,Switch} from "react-router-dom";

const url = "https://foodrails.herokuapp.com/foodmodels/"


function App() {
  //Style Objects

  const h1 = {
    textAlign: "center",
    margin: "10px"
  }

  //State and Other Variables
  const [foods, setFoods] = useState([]);

  //Functions 

  const getFoods = async() => {
    const response = await fetch(url)
    const data = await response.json()
    setFoods(data)
  }

  //useEffects 

  useEffect(() => {getFoods()}, [])
 
  //Returned variables
    return (
      <div className="App">
        <h1 style={h1}>FoodRails</h1>
        <Switch>
          <Route
            exact
            path="/"
            render={(rp) => <AllFoods {...rp}/>}
          
          />
          <Route
            path="/food/:id"
            render={(rp) => <SingleFood {...rp}/>}
          
          />
          <Route
            path="/new"
            render={(rp) => <Form {...rp}/>}
          
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