import React from 'react';
import {Link} from 'react-router-dom'


const SingleFood= ({foods, match, edit, deleteFood, history}) => {
    const id = parseInt(match.params.id)
    console.log(id)
    const food = foods.find((food) => {
        return parseInt(food.id) === id
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
        {console.log(food)}
        <img src={food.image} alt="food"/>
        <h2>{food.recipe}</h2>
        <button onClick={(event) => {
            edit(food)
        }}>EDIT</button>
        <button onClick ={(event) => {
            deleteFood(food)
            history.push("/")
        }}>DELETE FOOD</button>
        <Link to="/">
            <button>Go back</button>
        </Link>
    </div>

    )
  }
  
  export default SingleFood;