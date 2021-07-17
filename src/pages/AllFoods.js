import React from 'react';
import Food from "../components/Food"
// import {Navbar, Container, NavDropdown,Nav, Alert} from 'react-bootstrap'


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

