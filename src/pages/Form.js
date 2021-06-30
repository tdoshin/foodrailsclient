import React, {useState} from 'react';
import {Link} from 'react-router-dom'


const Form = ({initialFood,history,handleSubmit,buttonLabel}) => {
    //The Form State
    const [formData, setFormData] = useState(initialFood)

    //Functions
    const handleChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    const handleSubmission = (event) => {
        event.preventDefault()
        handleSubmit(formData)
        history.push("/")
    }

    return <form onSubmit={handleSubmission} style={{padding: "30px"}}>
        <input
            type="text"
            placeholder="Enter Food Name"
            onChange={handleChange}
            value={formData.name}
            name="name"
            style={{padding: "10px", borderRadius: "10px"}}
        />

        <br/>
        <br/>

        <input
            type="text"
            placeholder="Enter Food recipe"
            onChange={handleChange}
            value={formData.recipe}
            name="recipe"
            style={{padding: "10px", borderRadius: "10px"}}
        />

        <br/>
        <br/>

        <input
            type="text"
            placeholder="Insert Image URL"
            onChange={handleChange}
            value={formData.image}
            name="image"
            style={{padding: "10px", borderRadius: "10px"}}
        />

        <br/>
        <br/>

        <input type="submit" value={buttonLabel} style={{padding: "10px", borderRadius: "10px"}}/>
        <br/>
        <br/>
        <br/>
        <Link to="/">
            <button>Go back</button>
        </Link>
    </form>
  }
  
  export default Form;