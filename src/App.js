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

  //API URL

    return (
      <div className="App">
        <h1 style={h1}>FoodRails</h1>
        <Switch>
          <Route
            exact
            path="/"
            render={(rp) => <AllFoods {...rp}/>}
          
          />

        </Switch>
      </div>
    );
}

export default App;