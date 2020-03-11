import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link, navigate } from '@reach/router';
import '../Metronome.css';


const MusicianList = ({ props }) => {

    const [musicians, setMusicians] = useState([])

    useEffect(() => {
        Axios.get('http://localhost:8000/api/musician')
            .then(res => {
                setMusicians(res.data)
            })
    }, []);

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

            <div className="container-fluid containerr  ">

                <div className="row justify-content-center">
                    <h1>Welcome to our Musician Page</h1>
                </div>


                <div classname="row justify-content-center " >
                    <Link to="musician/new">Add Band Member</Link><br />


                </div>
                <div className="row justify-content-center bandmembersrow songrow">

                    <div className="col-3">
                        <div className="card">
                            <div className="card-header">
                                <h3 class="card-title">Band Members</h3>
                            </div>
                            <div className="card-body">
                                <table className="table ">
                                    <tbody >
                                        {
                                            musicians.map((m, idx) => {
                                                return (

                                                    <tr key={idx}>
                                                        <Link to={`/musicians/${m._id}`} className="bandmembers">{m.firstName} {m.lastName}</Link>
                                                    </tr>
                                                )
                                            }
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>{/*end card body */}

                        </div>{/*end card */}
                    </div>{/* end col */}
                </div> {/* end row */}


            </div>
        </div>

    );


}
export default MusicianList;

