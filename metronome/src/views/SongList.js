import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link, navigate } from '@reach/router';
import '../Metronome.css';
import 'bootstrap/dist/css/bootstrap.css';
import { red } from 'color-name';



const SongList = ({ props }) => {

    const [songs, setSongs] = useState([]);
    const [musicians, setMusicians] = useState([]);
    const [errors, setErrors] = useState([]);
    const [singerToupdate, setSingerToUpdate] = useState({})
    //problem was the semicolons; singertoupdate was not defined at all. therefore the singertoupdate id wasn't defined.

    useEffect(() => {
        Axios.get('http://localhost:8000/api/song')
            .then(res => {
                setSongs(res.data)
            })
    }, [songs]);

    useEffect(() => {
        Axios.get('http://localhost:8000/api/musician')
            .then(res => {
                setMusicians(res.data)
            })
    }, []);

    const [songToedit, setSongToEdit] = useState([]);
    const style1 = {
        backgroundColor: 'red'
    }
    const style2 = {
        backgroundColor: 'turquoise'
    }
    const style3 = {
        backgroundColor: 'orange'
    }





    const handleClickNeedsWork = (e, idx) => {
        e.preventDefault();
        console.log(idx);

        let song = { ...songs[idx] };
        song.status = "needswork";
        Axios.put(`http://localhost:8000/api/songs/${song._id}`, song)
            // .then( res => {
            //     Axios.get('http://localhost:8000/api/song')
            //         .then(res=>{
            //             setSongs(res.data)
            //     })
            // } )
            .catch(err => console.log(err.response));
        console.log(song);
    }

    const handleClickReady = (e, idx) => {
        console.log('chicken');
        e.preventDefault();
        let song = { ...songs[idx] };
        song.status = "ready";
        Axios.put(`http://localhost:8000/api/songs/${song._id}`, song)
            // .then(res=>{
            //     // Axios.get('http://localhost:8000/api/song')
            //     // .then(res=>{
            //     //     setSongs(res.data)
            //     // })
            // })
            .catch(err => console.log(err.response));
        console.log(song);

    }

    const handleClickNew = (e, idx) => {

        e.preventDefault();
        let song = { ...songs[idx] };
        song.status = "new";
        Axios.put(`http://localhost:8000/api/songs/${song._id}`, song)
            // .then(res=>{
            //     // Axios.get('http://localhost:8000/api/song')
            //     // .then(res=>{
            //     //     setSongs(res.data)
            //     // })
            // })
            .catch(err => console.log(err.response));
        console.log(song);

    }










    const onChangeHandler = (e, idx) => {
        e.preventDefault();
        let singerId = e.target.value;
        let singer = { ...musicians[singerId] }
        //wait wait wait wait.....can't only an index value go in the brackets??? how is an id going in there??
        console.log(singer);
        setSingerToUpdate(singer);
        console.log({ singerToupdate });


    }

    const handleSongSubmit = (e, idx) => {
        e.preventDefault();
        console.log(idx);


        let song = { ...songs[idx] };
        console.log(song);
        console.log('horse');
        console.log(singerToupdate._id);
        Axios.put(`http://localhost:8000/api/musicians/addsong/${singerToupdate._id}`, song)
            .then(navigate(`/musicians/${singerToupdate._id}`))

            .catch(err => console.log(err.response));



        // Axios.get(`http://localhost:8000/api/songs/${id}`)
        // .then(console.log(songToedit))
        // .then(res=>setSongToEdit(res.data))



        // .then(setSongToEdit({

        //     ...songToedit,
        //     [songToedit.status]: "needswork"
        // }))
        // .then(console.log(songToedit.status))

        // .then(Axios.put(`http://localhost:8000/api/songs/${id}`,songToedit))

        // .then(res=>navigate(`/songlist/`))
        // .catch(err=>{
        //     setErrors(err.response.data)});

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

            <h1>Welcome to our Song Page.</h1>
            <h3>Click on a song for more info</h3>

            <Link to="song/new">Add a Song</Link>

            <table className="table">
                <thead>
                    <tr>
                        <th><h3>Song</h3></th>
                        <th><h3>Artist</h3></th>
                        <th><h3>External Links</h3></th>
                        <th><h3>Status</h3></th>
                    </tr>


                </thead>
                <tbody>
                    {
                        songs.map((s, idx) => {

                            return (
                                <tr key={idx}>

                                    <Link to={`/songs/${s._id}`}>{s.title}</Link>
                                    <td>{s.artist}</td>


                                    <td>
                                        <form onSubmit={(e) => handleSongSubmit(e, idx)}>
                                            <select name="musician" onChange={(e) => onChangeHandler(e)}>
                                                {
                                                    musicians.map((m, idx) => {
                                                        return (

                                                            <option value={idx} key={idx} >{m.firstName}</option>
                                                        );
                                                    })
                                                }
                                            </select>
                                            <input type="submit" value="Add Singer" />
                                        </form>

                                    </td>


                                    {s.status === 'new' ?
                                        <td>

                                            <button onClick={(e) => handleClickNeedsWork(e, idx)} >Needs Work</button>
                                            <button onClick={(e) => handleClickReady(e, idx)}>Ready</button>
                                            <button onClick={(e) => handleClickNew(e, idx)} style={style3}>New</button>
                                        </td> :
                                        (s.status == "needswork" ?

                                            <td>

                                                <button onClick={(e) => handleClickNeedsWork(e, idx)} style={style1}>Needs Work</button>
                                                <button onClick={(e) => handleClickReady(e, idx)} >Ready</button>

                                                <button onClick={(e) => handleClickNew(e, idx)} >New</button></td> :

                                            (s.status === "finished" ?

                                                <td>

                                                    <button >Needs Work</button>
                                                    <button onClick={(e) => handleClickReady(e, idx)}>Ready</button>

                                                    <button style={style1}>New</button>
                                                </td> :

                                                (s.status === "ready" ?
                                                    <td>

                                                        <button onClick={(e) => handleClickNeedsWork(e, idx)}>Needs Work</button>
                                                        <button onClick={(e) => handleClickReady(e, idx)} style={style2}>Ready</button>

                                                        <button onClick={(e) => handleClickNew(e, idx)} >New</button>
                                                    </td> : "")))



                                    }




                                </tr>
                            )
                        }
                        )
                    }


                </tbody>


            </table>







        </div>

    );

}
export default SongList;

