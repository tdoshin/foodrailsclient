import React from 'react';
import Food from "../components/Food"

const AllFoods = (props) => {
    return props.foods.map((food) => {
        return <Food food={food} key={food.id}/>
    })

}
  
  export default AllFoods;