import React from 'react';
import {Link} from 'react-router-dom'


const SingleFood= ({foods, match, edit, deleteFood, history}) => {
    const id = parseInt(match.params.id)
    console.log(id)
    const foodItem = foods.find((foodItem) => {
        return parseInt(foodItem.id) === id
    })
    console.log(foods)


    //Styles//////////////////////////////////////
    // const div = {
    //     textAlign: "center",
    //     border: "3px solid green",
    //     width: "40%",
    //     margin: "30px auto"

    // }
    return (
    <div>
        {console.log(foodItem)}
        <img src={foodItem.image} alt="food"/>
        <h2>{foodItem.recipe}</h2>
        <button onClick={(event) => {
            edit(foodItem)
        }}>EDIT</button>
        <button onClick ={(event) => {
            deleteFood(foodItem)
            history.push("/")
        }}>DELETE FOOD</button>
        <Link to="/">
            <button>Go back</button>
        </Link>
    </div>

    )
  }
  
  export default SingleFood;