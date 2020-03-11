import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {navigate, Link} from '@reach/router';

const ViewSong=({id})=>{

const [songToview, setSongToView]=useState({});
const [newComment, setNewComment]= useState({});
const [isCommented, setIsCommented]= useState("false");
const [errors, setErrors]=useState({
    
    description:""
})

useEffect(()=>{
    axios.get(`http://localhost:8000/api/songs/${id}`)
    .then(res=>{
        setSongToView(res.data)
    })
    
    .catch(err=>navigate('/songs'));
    console.log(songToview)
}, [isCommented]);

const style5={
    width:'30%',
    height:'200px'
}
 const handleChange=(e)=>{
    e.preventDefault()
    setNewComment({
        description: e.target.value
    })
    

 }

 const handleSubmit=(e)=>{
    e.preventDefault();
    axios.put(`http://localhost:8000/api/addcommenttosong/${id}`, newComment)
        .then(
            setNewComment({
                description: ""
            
            
        }))
        .then(res=>{setIsCommented(!isCommented)})
        .catch(err => setErrors(err.response.data));

 }

return(

<div >

<nav className="navbar navbar-expand-lg navbar-light bg-light">



        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/musicianlist">Band Members</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/songlist">Songs</Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to="/giglist"> Upcoming Gigs</Link>
                </li>


            </ul>

        </div>


</nav>
    <div className=" containerr Container-fluid">
            <div className="center-block">
                <h2>{songToview.title}</h2>
                <h3>Status: {songToview.status}</h3>
                <h3>Singer(s): {songToview.songvocalist}</h3>
                <div className="container">
        
                    <form onSubmit = {(e)=>handleSubmit(e)}>
                        <label>Enter Comment: </label><br/>
                        <textarea name="description" value={newComment.description} onChange= {(e)=>handleChange(e)}/><br/>
                        <input className= "btn btn-success" type="submit" value="Add"/>
                    </form>

                </div>        
                <h3>Comments:</h3>
                {
                    songToview.songcomments  ? 
                    songToview.songcomments.map((c,idx)=>{
                        return <p key={idx}>{c.description}</p>
                    }):
                    null
                }

            </div>
  

   
    </div>
</div>

);
}


export default ViewSong;

