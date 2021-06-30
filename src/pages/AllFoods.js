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
    return <Food food={food} key={food.id}/>
})
        }

    </div>
    

}
  
  export default AllFoods;