import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { navigate, Link } from '@reach/router';
import ViewMusician from './ViewMusician';
import Axios from 'axios';


const ViewGig = ({ id }) => {
    const [gigToview, setGigtoView] = useState([]);
    const [songlist, setSonglist] = useState([]);
    const [SongtoAdd, setSongToAdd] = useState([]);
    const [isAdded, setIsAdded] = useState(false);
    const [isRemoved, setIsremoved] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/gigs/${id}`)
            .then(res => {
                setGigtoView(res.data)
            })
            .then(
                console.log(gigToview)
            )

            .catch(err => navigate('/gigs'));
        console.log('ari');



    }, [isAdded, isRemoved]);




    useEffect(() => {
        axios.get(`http://localhost:8000/api/song`)
            .then(res => {
                setSonglist(res.data)
            })
            .then(
                console.log(songlist[0])
            )
            .catch(err => navigate('/giglist'));



    }, []);

    const onChangeHandler = (e, idx) => {
        e.preventDefault();
        let songId = e.target.value;
        let songtoadd = { ...songlist[songId] }
        setSongToAdd(songtoadd);
        console.log(songtoadd);






    }

    const handleSongSubmit = (e) => {
        e.preventDefault();
        let songindex = e.target.value;


        axios.put(`http://localhost:8000/api/gigs/addsong/${gigToview._id}`, SongtoAdd)

            .then(res => {
                setIsAdded(!isAdded);
            })

            .catch(err => console.log(err.response));

    }

    const removeGig = (id) => {
        axios.delete(`http://localhost:8000/api/gigs/${id}`)
            .then(res => {
                setIsremoved(!isRemoved);
            })
            .then(res => {
                navigate('/giglist');
            })

    }


    const removeSongFromGig = (idx) => {
        let songtoremove = { ...gigToview.songs[idx] }
        console.log(songtoremove);
        axios.put(`http://localhost:8000/api/gigs/removesong/gig/${gigToview._id}`, songtoremove)
            .then(
                res => {
                    setIsremoved(!isRemoved);
                })


            .then(setIsremoved(true))

            .catch(err => console.log(err.response))

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

            <div className="container-fluid">
                <button className="btn btn-success" onClick={() => navigate("/giglist")}>Back</button>
                <div className="row-justify-content">
                    <div className="col"></div>


                    <h1>Gig: {gigToview.event}</h1>
                    <h3>Gig Date: {gigToview.date}</h3>
                    <h3>Gig Time: {gigToview.time}</h3>


                </div>



                <div className="row justify-content-between">



                    <div className="col-md-4">
                        
                            <div class="card mb-5">
                                <div class="card-body">
                                    <h5 class="card-title">Add a song</h5>
                                    <form onSubmit={(e) => handleSongSubmit(e)}>
                                        <div className="form group">
                                            <select name="song" onChange={(e) => onChangeHandler(e)} >
                                                <option disabled selected value> Select</option>
                                                {
                                                    songlist.map((s, idx) => {
                                                        return (
                                                            <option value={idx} key={idx}>{s.title}</option>
                                                        );
                                                    })
                                                }
                                            </select>
                                            <input type="submit" value="Add Song" />
                                        </div>
                                        <button class="btn btn-primary">Add</button>
                                    </form>
                                </div>
                            </div>
                        






                    </div>

                    <div className="col-md-4 ">

                        <h3>SongList:</h3>
                        <table className="table table-striped">
                        {
                            gigToview.songs ?
                                gigToview.songs.map((s, idx) => {
                                    return <tr>
                                        <td key={idx}>{s.title}</td>
                                        <td><button onClick={(e) => removeSongFromGig(idx)}>Remove</button></td>
                                    
                                    
                                    </tr>


                                }) :
                                null
                        }
                        </table>
                        
                    </div>

                    




                </div>








                <div>

                    <h4>Comments:</h4>
                    <button className="btn btn-danger" onClick={(e) => removeGig(id)}>Remove Gig</button>



                    <div className="col-xs-4">
                        <form onSubmit>
                            <label>Enter Comment: </label><br />
                            <textarea /><br />
                            <input className="btn btn-success" type="submit" value="Add" />
                        </form>

                    </div>
                </div>


            </div>

        </div>














    );

}


export default ViewGig;