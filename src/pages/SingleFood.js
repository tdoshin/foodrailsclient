import React from 'react';
import {Link} from 'react-router-dom'


const SingleFood= ({foods, match, edit, deleteFood, user, history}) => {
    // console.log("user", user)
    const id = parseInt(match.params.id)
    // console.log(id)
    // console.log("foods", foods)
    const foodItem = foods.find((foodItem) => {
        return parseInt(foodItem.id) === id
    })
    // console.log(foods)
    // console.log("foodItem", foodItem)
    let userOwnsFood = null;
    if (foodItem.user_id === user.id) {
        userOwnsFood = true;
    } else {
        userOwnsFood = false;
    }



    //Styles//////////////////////////////////////
    const div = {
        textAlign: "center",
        border: "3px solid green",
        width: "40%",
        margin: "30px auto"

    }
    return (
    <div>
        {console.log(foodItem)}
        <img src={foodItem.image} alt="food"/>
        <h2>{foodItem.recipe}</h2>

        {userOwnsFood ? 
        <>
        <button onClick={(event) => {
            edit(foodItem)
        }}>EDIT</button>

        <button onClick ={(event) => {
            deleteFood(foodItem)
            history.push("/")
        }}>DELETE FOOD</button>
        </>
        : null }

        <Link to="/">
            <button>Go back</button>
        </Link>
    </div>

    )
    return <h1>Hello world</h1>
  }
  
  export default SingleFood;