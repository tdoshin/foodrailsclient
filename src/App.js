import { useState, useEffect } from 'react';
import React from 'react';
import AllFoods from "./pages/AllFoods";
import SingleFood from "./pages/SingleFood";
import Form from "./pages/Form";
import {Route,Switch, Link} from "react-router-dom";
import "./App.css"


// const baseUrl = "https://foodrails.herokuapp.com/"
const baseUrl = "http://localhost:3000/"

const url = baseUrl + "foodmodels/"


function App(props) {
  //Style Objects///////////////////////////////////////////////


  const button = {
    backgroundColor: "green",
    display: "block",
    margin: "auto"
  }


  //State and Other Variables/////////////////////////////////////
  const [foods, setFoods] = useState([]);
  const [allFoods, setAllFoods] = useState([]);

  const nullFood = {
    name: "",
    recipe: "",
    image: ""
  }

  const [targetFood, setTargetFood] = useState(nullFood)

  //Functions ////////////////////////////////////////////////

  const getFoods = async() => {
    const response = await fetch(url, {
      method: "get",
      headers: { "Authorization": "Bearer " + authToken },
    })

    let data = await response.json()
    if (data.message == "Please log in") {
      console.log("Please log in")
      data = []
    }
    setFoods(data)
  }

  const getAllFoods = async() => {
    const response = await fetch(baseUrl + "foodmodelsall", {
      method: "get",
      headers: { "Authorization": "Bearer " + authToken },
    })

    let data = await response.json()
    if (data.message == "Please log in") {
      console.log("Please log in")
      data = []
    }
    setAllFoods(data)
  }

  const addFoods = async (newFood) => {
    const response = await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + authToken
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
        "Content-Type": "application/json",
        "Authorization": "Bearer " + authToken,
      },
      body: JSON.stringify(food)
    })

    getFoods()
  }

  const deleteFood = async(food) => {
    const response = await fetch (url + food.id + "/", {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + authToken,
      },
    })
    getFoods()
  }

  ///////////////////
  // Authentication
  ///////////////////

  // Username
  const [username, setUsername] = useState("");
  const handleUsername = (event) => {
    setUsername(event.target.value);
  }

  // Password
  const [password, setPassword] = useState("");
  const handlePassword = (event) => {
    setPassword(event.target.value);
  }

  // Current user and token
  const [user, setUser] = useState(null)
  const [authToken, setAuthToken] = useState("")

  // Login
  const auth = async (event, args) => {
    event.preventDefault();
    
    // Either be "signup" or "login" 
    const authType = event.nativeEvent.submitter.name

    const response = await fetch(baseUrl + authType, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username, password: password})
    })
    
    const responseJson = await response.json()
    if (responseJson.error) {
      setUser(null)
      setAuthToken("")
    } else {
      setUser(responseJson.user)
      setAuthToken(responseJson.token)
    }

    // Clear the username and password input fields
    setUsername("")
    setPassword("")
  }

  const logout = () => {
    setUser(null)
    setAuthToken("")
  }

  //useEffects 

  useEffect(() => {getFoods(); getAllFoods()}, [authToken])

  const authForm = (
    <>
      <form onSubmit={auth}>
        <label>
          Username: <input type="text" value={username} onChange={handleUsername} />
          <br></br>
          <br/>
          Password: <input type="text" value={password} onChange={handlePassword} />
          <br></br>
        </label>
        <br></br>
        <br/>
        <input type="submit" name="signup" value="Signup" />
        <input type="submit" name="login" value="Login" />
      </form>
    </>
  )
  const logoutButton = (
    <>
      <h3>Current User: {user && user.username ? user.username : "Logged Out"}</h3>
      <button onClick={logout}>Logout</button>
    </>
  )
 
  //Returned variables
    return (
      <div className="App">
        <h1 className="h1" >Welcome to FoodRails</h1>

        {user ? logoutButton : authForm}

        <div class="row">
    
          {(rp) => <AllFoods foods = {foods.img} {...rp}/>}
            
        </div>
        <br/>

        {user ? <Link to="/new"><button style={button} style={{borderRadius: "10px"}}>Click Here To Get Started</button>
        <br/>
        
        {(rp) => <AllFoods foods = {foods} {...rp}/>}

        </Link> :null}
        <Switch>
          <Route
            exact
            path="/"
            render={(rp) => <AllFoods foods = {foods} {...rp}/>}
          
          />
          <Route
            path="/food/:id"
            render={(rp) => <SingleFood foods={allFoods}
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
          <Route
            exact
            path="/all"
            render={(rp) => <AllFoods foods={allFoods} />}
          
          />

        </Switch>
      </div>
    );
}

export default App;