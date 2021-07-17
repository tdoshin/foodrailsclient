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
    if (foodItem && user && (foodItem.user_id === user.id)) {
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
        <br></br>
        <img src={foodItem.image} style={{width: "400px"}} alt="food"/>
        <h2 style={{color:"white", fontSize:"20px", fontWeight:"bolder"}}>{foodItem.recipe}</h2>

        {userOwnsFood ? 
        <>
        <button onClick={(event) => {
            edit(foodItem)
        }}>Edit Food</button>

        <button onClick ={(event) => {
            deleteFood(foodItem)
            history.push("/")
        }}>Delete Food</button>
        </>
        : null }

        <Link to="/">
            <button>Go Back</button>
        </Link>
    </div>

    )
    return <h1>Hello world</h1>
  }
  
  export default SingleFood;