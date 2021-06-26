import React from 'react';
import {Link} from 'react-router-dom'


const SingleFood= ({foods, match}) => {
    const id = parseInt(match.params.id)
    const food = foods.find((food) => {
        return food.id === id
    })


    //Styles//////////////////////////////////////
    const div = {
        textAlign: "center",
        border: "3px solid green",
        width: "40%",
        margin: "30px auto"

    }
    return (
    <div style={div}>
        <h1>{food.image}</h1>
        <h2>{food.recipe}</h2>
        <Link to="/">
            <button>Go back</button>
        </Link>
    </div>

    )
  }
  
  export default SingleFood;