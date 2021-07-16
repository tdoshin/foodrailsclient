import { useState, useEffect } from 'react';
import React from 'react';
import AllFoods from "./pages/AllFoods";
import SingleFood from "./pages/SingleFood";
import Form from "./pages/Form";
import {Route,Switch, Link} from "react-router-dom";
import "./App.css";
import 'materialize-css/dist/css/materialize.min.css';


// const baseUrl = "https://foodrails.herokuapp.com/"
// const baseUrl = "http://localhost:3000/"
const baseUrl = "https://foodrailsapplication2-env.eba-u3pmpabm.us-east-2.elasticbeanstalk.com/"

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
    // console.log("data", data)
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
    getAllFoods()
  }

  const getTargetFood = (food) => {
    setTargetFood(food)
    props.history.push("/edit")
  }
  
  const updateFood = async(food) => {
    const response = await fetch(url + food.id +"/", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + authToken,
      },
      body: JSON.stringify(food)
    })

    getFoods()
    getAllFoods()
  }

  const deleteFood = async(food) => {
    const response = await fetch (url + food.id + "/", {
      method: "delete",
      headers: {
        // "Content-Type": "application/json",
        "Authorization": "Bearer " + authToken,
      },
    })
    // console.log("url", url)
    // console.log("food id", food.id)
    getFoods()
    getAllFoods()
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
      alert("Please sign up")
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

  useEffect(() => {
    getFoods(); 
    getAllFoods()
  }, [authToken])

  const authForm = (
    <>
      <form onSubmit={auth}>
        <label style={{fontSize:"20px", color: "black"}}>
          Username: <input type="text" value={username} onChange={handleUsername} />
          <br></br>
          <br/>
          Password: <input type="password" value={password} onChange={handlePassword} />
          <br></br>
        </label>
        <br></br>
        <br/>
        <input type="submit" name="signup" value="Signup" />
        <br/>
        <br/>
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
        <br/>
      
        <p>Store your favorite recipes, share with others</p>
        
        {user ? logoutButton : authForm}

        <div class="row">
    
          {/* {(rp) => <AllFoods foods = {foods.img} {...rp}/>} */}
            
        </div>
        <br/>

        {user ? <Link to="/create"><button style={button} style={{borderRadius: "10px"}}>Create Food Card</button>
        <br/>
        
        
        {/* {(rp) => <AllFoods foods = {foods} {...rp}/>} */}

        </Link> :null}

        <Switch>
          <Route
            exact
            path="/"
            render={(rp) => <AllFoods foods = {allFoods} user = {user} {...rp}/>}
          
          />
          <Route
            path="/food/:id"
            render={(rp) => <SingleFood 
              foods={allFoods}
              edit={getTargetFood} 
              deleteFood = {deleteFood}
              user = {user}
            {...rp}/>}
          
          />
          <Route
            path="/create"
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
              deleteFood = {deleteFood}
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