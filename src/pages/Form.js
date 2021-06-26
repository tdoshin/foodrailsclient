import React, {useState} from 'react';



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

    return <form onSubmit={handleSubmission}>
        <input
            type="text"
            onChange={handleChange}
            value={formData.name}
            name="name"
        />

        <input
            type="text"
            onChange={handleChange}
            value={formData.recipe}
            name="recipe"
        />

        <input
            type="text"
            onChange={handleChange}
            value={formData.image}
            name="image"
        />

        <input type="submit" value={buttonLabel}/>
    </form>
  }
  
  export default Form;