import React, { useState } from 'react';
import axios from 'axios';
import { Link, navigate } from '@reach/router';
import 'bootstrap/dist/css/bootstrap.css';

import GigForm from '../components/GigForm';



const AddGig = (props) => {

    const [newGig, setNewGig] = useState({
        event: "",
        date: ""

    })

    const [errors, setErrors] = useState([])


    const handleChange = (e) => {
        e.preventDefault();
        setNewGig({
            ...newGig,
            [e.target.name]: e.target.value
        })

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/gig', newGig)
            .then(res => {
                setNewGig({
                    date: "",
                    event: "",
                    time: ""
                })
            })
            .catch(err => {
                setErrors(err.response.data);
            })
            .then(res => navigate("/giglist"))

    }

    return (
        <div>
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
            <div className="container">
                <h1>Add Gig</h1>



                <h1>Enter Details</h1>
                <GigForm
                    form={newGig}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    errors={errors != null ? errors : ""}
                    buttontext="Add Gig"

                /><br />
                <button className="btn btn-danger" onClick={(e) => navigate('/')}>Cancel</button>
            </div>
        </div>
    )

}
export default AddGig;
