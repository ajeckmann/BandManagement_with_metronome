import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link, navigate } from '@reach/router';
import 'bootstrap/dist/css/bootstrap.css';
import '../Metronome.css';


const GigList = ({ props }) => {
    const [gigs, setGigs] = useState([]);


    useEffect(() => {
        Axios.get('http://localhost:8000/api/gig')
            .then(res => {
                setGigs(res.data)
            })
    }, []);

    const style1 = {
        color: "black",
        fontsize: "300%",
        fontweight: "900"

    }



    return (
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
                <div className="row justify-content-center">
                    <h1>Welcome to our Gig Page</h1>
                </div>
                <div classname="row justify-content-center ">
                    <Link to="gig/new">Add a New Gig</Link>
                </div>
                <div class="row justify-content-center">
                    <div class="col-sm-5">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th className="gig_table_header">Event</th>
                                    <th className="gig_table_header">Date</th>
                                    <th className="gig_table_header">Time</th>
                                </tr>

                            </thead>

                            <tbody>
                                {
                                    gigs.map((p, idx) => {
                                        return (
                                            <tr key={idx}>
                                                <td ><Link className="gig_table_data" classname="gig_names_style" to={`/gigs/${p._id}`}>{p.event}</Link></td>
                                                <td className="gig_table_data">{p.date}</td>
                                                <td className="gig_table_data">{p.time}</td>
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