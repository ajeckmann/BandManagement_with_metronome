import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import {Link, navigate} from '@reach/router';


const GigList=({props})=>{
    const [gigs, setGigs] = useState([]);


    useEffect(() => {
        Axios.get('http://localhost:8000/api/gig')
            .then(res => {
                setGigs(res.data)
            })
    }, []);

    const style1={
color: "black",
fontsize: "3rem",
fontweight: "900"
    }



return(
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
    
    <div className="containerr container-fluid">
    <h1>Welcome to our Gig Page</h1>
        <div class="row justify-content-center" id="songrow">
        
         <div>
      
    

    
    <Link to="gig/new">Add a New Gig</Link>
    <table className="table">
        <thead>
            <tr>
            <th>Event</th>
            <th>Date</th>
            <th>Time</th>
            </tr>

        </thead>

        <tbody>
        {
            gigs.map((p, idx)=>{
                return(
                    <tr key={idx}>
                        <td ><Link style={style1} to={`/gigs/${p._id}`}>{p.event}</Link></td>
                        <td style={style1}>{p.date}</td>
                        <td style = {style1}>{p.time}</td>

                        
                    
                    </tr>

                    
                );
            }
            )
        }
        </tbody>
    </table>







    </div>

    </div>
 </div>
</div>
    
        
       
);


}



export default GigList;