import React from 'react';
import {Link} from "react-router-dom"
import ReactDOM from 'react-dom';


const Food = ({food}) => {

  //Style Objects

  //Make separate div for recipe

  const div = {
    textAlign: "center",
    border: "3px solid",
    margin: "10px auto",
    width: "80%"
  }

  return <div style={div}>
    <Link to={`/food/${food.id}`}>
      <h1>{food.image}</h1>
      
    </Link>

  </div>

}
  
  export default Food;