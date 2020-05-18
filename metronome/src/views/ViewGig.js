import React, { useState, useEffect, Date } from 'react';
import axios from 'axios';
import { navigate, Link } from '@reach/router';
import ViewMusician from './ViewMusician';
import 'bootstrap/dist/css/bootstrap.css';
import { black } from 'color-name';


const ViewGig = ({ id }) => {
    const [gigToview, setGigtoView] = useState([]);
    const [songlist, setSonglist] = useState([]);
    const [SongtoAdd, setSongToAdd] = useState([]);
    const [isAdded, setIsAdded] = useState(false);
    const [isRemoved, setIsremoved] = useState(false);
    const [newRemark, setNewRemark] = useState({});
    const [isRemarked, setIsRemarked] = useState("false");
    const [errors, setErrors] = useState({

        description: ""
    })
    const date = gigToview.date;





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



    }, [isAdded, isRemoved, isRemarked]);




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

    const handleCommentChange = (e) => {
        e.preventDefault()
        setNewRemark({
            description: e.target.value
        })
    }

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/addcommenttogig/${id}`, newRemark)
            .then(
                setNewRemark({
                    description: ""
                }))
            .then(res => { setIsRemarked(!isRemarked) })
            .then(console.log(newRemark))
            .catch(err => setErrors(err.response.data));

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
                        <li className="nav-item">
                            <Link className="nav-link" to="/viewmetronome"> Metronome</Link>
                        </li>
                    </ul>
                </div>
            </nav>

            <div className="container-fluid">
                <button className="btn btn-success" onClick={() => navigate("/giglist")}>Back</button>
                <div className="row justify-content-center">
                    <h1>{gigToview.event}</h1>
                </div>
                <div className="row justify-content-around">
                    <div className="col-lg-4 text-right">
                        <h3 >Date: {date}</h3>
                    </div>
                    <div className="col-lg-4 text-left">
                        <h3>Time: {gigToview.time}</h3>
                    </div>
                </div>
                <div className="row justify-content-around gig_info_row" style={{ marginTop: 50 }}>
                    <div className="col-sm-6 gig_page_divider">
                        <div className="row justify-content-center">
                            <div className="col-sm-6">
                                <div class="card mb-4 shadow-lg">
                                    <div class="card-body">
                                        <h5 class="card-title">Add a Comment</h5>
                                        <form onSubmit={(e) => handleCommentSubmit(e)}>
                                            <textarea className="gig_comment" name="description" value={newRemark.description} onChange={(e) => handleCommentChange(e)} /><br />
                                            <input className="btn btn-info " type="submit" value="Post Comment" />
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-sm-10">
                                <div class="card mb-4 shadow-lg">
                                    <div className="card-header"><h3>Comments:</h3></div>
                                    <div className="card-body">
                                        <ol>
                                            {
                                                gigToview.gigcomments ?
                                                    gigToview.gigcomments.map((g, idx) => {
                                                        return (
                                                            <div className="row justify-content-center">
                                                                <div className="col-9 text-left">
                                                                    <li key={idx}>
                                                                        {g.description}</li><br />
                                                                </div>
                                                                <div className="col-sm-3">
                                                                    <button className=" btn btn-warning" onClick={(e) => removeSongFromGig(idx)}>Remove</button>
                                                                </div>
                                                            </div>


                                                        )
                                                    }) :
                                                    null
                                            }
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 ">
                        <div className="row justify-content-center">
                            <div className="col-sm-6">
                                <div class="card shadow-lg">
                                    <div class="card-body">
                                        <h5 class="card-title">Add a song</h5>
                                        <form onSubmit={(e) => handleSongSubmit(e)}>
                                            <div className="row justify-content-around">
                                                <div className="col-sm-7">
                                                    <select className="form-control" name="song" onChange={(e) => onChangeHandler(e)} >
                                                        <option disabled selected value> Select</option>
                                                        {
                                                            songlist.map((s, idx) => {
                                                                return (
                                                                    <option value={idx} key={idx}>{s.title}</option>
                                                                );
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                                <div className="col-sm-5">
                                                    <input className="btn btn-info btn-sm" type="submit" value="Add Song" />
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div><br />
                        <div className="row justify-content-center">
                            <div className="col-sm-10">
                                <div className="card">
                                    <div className="card-header"><h3>SongList:</h3></div>
                                    <div className="card-body">
                                        <ol>
                                            {
                                                gigToview.songs ?
                                                    gigToview.songs.map((s, idx) => {
                                                        return (
                                                            <div className="row justify-content-center">
                                                                <div className="col-9 text-left">
                                                                    <li key={idx}>
                                                                        {s.title}</li><br />
                                                                </div>
                                                                <div className="col-sm-3">
                                                                    <button className=" btn btn-warning" onClick={(e) => removeSongFromGig(idx)}>Remove</button>
                                                                </div>
                                                            </div>


                                                        )
                                                    }) :
                                                    null
                                            }
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div><br />

                <div className="row justify-content-center">



                    <button className="btn btn-danger remove_gig_button" onClick={(e) => removeGig(id)}>Remove Gig</button>
                </div>
            </div>

        </div>

    );

}


export default ViewGig;