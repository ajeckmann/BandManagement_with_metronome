import React, {useState} from 'react';
import axios from 'axios';
import { navigate} from '@reach/router';

import MusicianForm from '../components/MusicianForm';

const AddMusician = (props)=>{
    const [newMusician, setNewMusician]= useState({
        firstName:"",
        lastName:"",
        instrument1: "",
        instrument2:"",
        instrument3:""

    })
    const [errors, setErrors]=useState({
        firstName:"",
        lastName:""
    })
        
const handleChange=(e)=>{
e.preventDefault();
setNewMusician({
    ...newMusician,
    [e.target.name]:e.target.value
})
}

const handleSubmit=(e)=>{
    e.preventDefault();
    axios.post('http://localhost:8000/api/musician', newMusician )
    .then(res=>{
        setNewMusician({
            firstName:"",
            lastName:"",
            instrument1: "",
            instrument2:"",
            instrument3:""
        })
    })
    .catch(err=>{
        setErrors(err.response.data);
    })
}




return(
    <div>
        <h2>Hi There. Add A Musician</h2>
        <MusicianForm
        buttontext="Add Musician"
        form={newMusician}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        errors = {errors!= null? errors:""} 
        

        /><br/>
        <button className="btn btn-success" onClick={(e)=>navigate('/musicianlist')}>Cancel</button>



    </div>

);


}

export default AddMusician;