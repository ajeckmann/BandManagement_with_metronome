import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {navigate, Link} from '@reach/router';



const ViewMusician=({id})=>{
    const [musicianToview, setMusicianToView]=useState({});
    const [musicianSongs, setMusicianSongs]=useState([]);
    const [isRemoved, setIsremoved]=useState(false);

useEffect(()=>{
    axios.get(`http://localhost:8000/api/musicians/${id}`)
    .then(res=>{
        setMusicianToView(res.data)
    })
    .then(res=>{
        console.log(musicianToview);
    })
    .catch(err=>navigate('/songs'));
    
 
    
}, [isRemoved])

const removeSongFromMusician=(idx)=>{
    let songtoremove= {...musicianToview.songs[idx]}
    console.log(songtoremove);
    axios.put(`http://localhost:8000/api/musicians/removesong/${musicianToview._id}`, songtoremove)
    .then(res=>{setIsremoved(!isRemoved);
    })
    
    
    .catch(err=>console.log(err.response))

}

    return(
        <div>
        <div>
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
            </div>


        <div>


            <h1>Musician of Interest: {musicianToview.firstName}</h1>
            {
                musicianToview.songs ? 
                musicianToview.songs.map((s,idx) => {
                    return <p key={idx}>{s.title} <button onClick={(e) => removeSongFromMusician(idx)}>Remove</button></p>
                }) : 
                null
            }
        </div>
        </div>
    );
    
    }
    
    
    export default ViewMusician;
    
    