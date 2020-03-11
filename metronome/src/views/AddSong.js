import React, {useState} from 'react';
import axios from 'axios';
import { navigate} from '@reach/router';

import SongForm from '../components/SongForm';

const AddSong = (props)=>{
    const [newSong, setNewSong]= useState({
        title:"",
        artist:"",
        songvocalist: "",
        comments:""
    })
    const [errors, setErrors]=useState({
        title:"",
        artist:"",
    })

    const handleChange=(e)=>{
        e.preventDefault();
        setNewSong({
            ...newSong,
            [e.target.name]:e.target.value
        })
        }

        const handleSubmit=(e)=>{
            e.preventDefault();
            axios.post('http://localhost:8000/api/song', newSong )
            .then(res=>{
                setNewSong({
                    title:"",
                    artist:"",
                    songvocalist: "",
                    comments:"",
                    
                })
            })
            .then(res=>navigate("/songlist"))
            .catch(err=>{
                setErrors(err.response.data);
            })
        }

    return(
        <div>
            
            <h2>Hi There. Add A Song to the Song List</h2>

            <SongForm
            buttontext= "Add Song"
            form={newSong}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            errors = {errors!= null? errors:""} 

            /><br/>

<button className="btn btn-success" onClick={(e)=>navigate('/songlist')}>Cancel</button>
        </div>


    );
}
export default AddSong;