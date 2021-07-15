import React from 'react';
import Food from "../components/Food"


const AllFoods = (props) => {
    const div = {
        display:"flex",
        flexWrap: "wrap"
    }

    return <div style={div}>
        {
            props.foods.map((food) => {
                return <Food foodItem={food} user={props.user} key={food.id}/>
            })
        }

    </div>
    

}
  
  export default AllFoods;

// const AllFoods = (props) => {
//     props.foods
//     props.user

// const AllFoods = ({foods, user}) => {
//     foods
//     user