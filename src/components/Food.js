import React from 'react';
import {Link} from "react-router-dom"
import {Card} from "react-bootstrap"
import Button from 'react-bootstrap/Button';


const Food = ({foodItem}) => {


  return <div>

<Card style={{ width: '18rem', margin: "10px"}}>
  <Card.Img variant="top" alt="holder.js/100px180" src={foodItem.image} style={{padding: "10px", height: "200px", objectFit: "cover"}}/>
  <Card.Body>
    <Card.Title>{foodItem.name}</Card.Title>
    <Button variant="success" size="lg"><Link to={`/food/${foodItem.id}`}style={{color: "white"}}>View Recipe</Link></Button>
  </Card.Body>
</Card>
    

  </div>

}
  
  export default Food;