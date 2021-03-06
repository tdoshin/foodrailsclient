import React from 'react';
import {Link} from "react-router-dom"
import {Card} from "react-bootstrap"
import Button from 'react-bootstrap/Button';


const Food = ({foodItem, user}) => {

  let userOwnsFood = null;
  if (foodItem && user && (foodItem.user_id === user.id)) {
      userOwnsFood = true;
  } else {
      userOwnsFood = false;
  }

  return <div>

<Card bg={userOwnsFood ? "success" : ""} style={{ width: '18rem', margin: "10px"}}>
  <Card.Img variant="top" src="holder.js/100px180" src={foodItem.image} style={{padding: "20px", height: "200px", objectFit: "cover"}}/>
  <Card.Body>
    <Card.Title>{foodItem.name}</Card.Title>
    <Button variant="warning" size="sm" ><Link to={`/food/${foodItem.id}`}style={{color: "black", margin:"10px"}}>View Recipe</Link></Button>
  </Card.Body>
</Card>
    

  </div>

}
  
  export default Food;