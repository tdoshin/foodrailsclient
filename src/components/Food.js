import React from 'react';
import {Link} from "react-router-dom"
import {Card} from "react-bootstrap"
import Button from 'react-bootstrap/Button';


const Food = ({food}) => {


  return <div>

<Card style={{ width: '18rem', margin: "10px"}}>
  <Card.Img variant="top" src="holder.js/100px180" src={food.image} style={{padding: "10px", height: "200px", objectFit: "cover"}}/>
  <Card.Body>
    <Card.Title>{food.name}</Card.Title>
    <Button variant="success" size="lg"><Link to={`/food/${food.id}`}style={{color: "white"}}>View Recipe</Link></Button>
  </Card.Body>
</Card>
    

  </div>

}
  
  export default Food;