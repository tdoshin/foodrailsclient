import { useState, useEffect } from 'react';
import {React, reactLogo} from 'react';
import AllFoods from "./pages/AllFoods";
import SingleFood from "./pages/SingleFood";
import Form from "./pages/Form";
import {Route,Switch, Link} from "react-router-dom";
import "./App.css";
import {Navbar, Container, NavDropdown,Nav, Alert} from 'react-bootstrap'
import { Col, Space, Row, Footer } from 'mdbreact';


// Hosting backend using AWS Elastic Beanstalk 
const baseUrl = "http://foodrailsapplication2-env.eba-u3pmpabm.us-east-2.elasticbeanstalk.com/"

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
        <label style={{fontSize:"20px", color: "white", fontStyle:"italic", fontWeight:"bolder"}} >
          Username: <input type="text" style={{fontWeight:"30px", color:"white"}} value={username} onChange={handleUsername} />
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
      <h3 style={{color:"white"}}>Current User: {user && user.username ? user.username : "Logged Out"}</h3>
      <button onClick={logout}>Logout</button>
    </>
  )
 const nav = (        
   <>
 
 <Navbar bg="light" expand="lg">

 <Container style={{marginTop:"20px", marginLeft: "0px"}}>
   <Navbar.Brand href="#home"></Navbar.Brand>
   <Navbar.Toggle aria-controls="basic-navbar-nav" />
   <Navbar.Collapse id="basic-navbar-nav">
     <Nav className="me-auto">
       <Nav.Link href="/">Home</Nav.Link>
       <NavDropdown title="Contact" id="basic-nav-dropdown">
         <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
         <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
         <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
         <NavDropdown.Divider />
         <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
       </NavDropdown>
     </Nav>
   </Navbar.Collapse>
 </Container>
</Navbar>


</>
)

const alert = (

<Alert variant="light">
 <Alert.Heading style={{fontWeight: "bolder", color:"black"}}>Welcome to FoodRails</Alert.Heading>
 <p style={{fontStyle:"italic"}}>Create, store, and share your favorite recipes, and see others' recipes! </p>
 <p>Please Signup or Login Below To Get Started</p>
 <hr />
</Alert>

)


  //Returned variables
    return (
      <div className="App">
        {nav}
        <br/>
        <br/>
        
        {user? null : alert}

      
        
{user ? logoutButton : authForm}
<br/>
{/* <Footer  className="font-large mt-4" style={{backgroundColor: "black", fontStyle:"italic"}}>Created By Timi Oshin</Footer> */}
        <br/>

        {user ? <Link to="/create"><button style={button} style={{borderRadius: "10px"}}>Create Food Card</button>
        <br/>

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