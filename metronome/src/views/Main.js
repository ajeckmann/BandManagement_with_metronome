import React, {useState, useEffect } from 'react';
import axios from 'axios';
import {Link, navigate} from '@reach/router';
import 'bootstrap/dist/css/bootstrap.css';






const Main=(props)=>{
return(

    <div className="container">
        <h1> Welcome to the Cold Hands Site</h1>
       
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    
    

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
                <Link className="nav-link" to="">Home</Link> 
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

);

}


export default Main;