import React, { useState, useEffect, Component } from 'react';
import '../Metronome.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Link, navigate } from '@reach/router';
import click2 from '../click2.wav';
import click1 from '../click1.wav';
import fa from '../fa.wav';
import Dooo from '../Dooo.m4a';



const Metronome = (props) => {
    const [bpm, setbpm] = useState([90]);
    const [isPlaying, setIsPlaying] = useState(false);


    var clickone = new Audio(click1);
    var clicktwo = new Audio(click2);
    var clickthree = new Audio(Dooo);
    var clickfour = new Audio(fa);
    var count = 0;
    var timerID;



    const soundBeat = () => {
        if (count % 2 == 0) {
            clicktwo.play();
            count++;
        }
        else {
            clickone.play();
            count++;
        }

    }
    const handleStart = (e) => {
        e.preventDefault();

        if (isPlaying == false) {
            timerID = setInterval(soundBeat, (60 / bpm) * 1000);
            setIsPlaying(true);
        }
        if (isPlaying == true) {
            setIsPlaying(false);
            clearInterval(timerID);
            count = 0;

        }
    }





    const handleBPMChange = (e) => {
        e.preventDefault();
        setbpm(e.target.value);
        console.log(bpm);




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
            <div className="bpm-slider">
                <div>{bpm} BPM</div>
                <input type="range" min="0" max="240" value={bpm} onChange={handleBPMChange} />
            </div>
            <button onClick={handleStart} className="metronomebutton btn btn-success btn-lg"> {isPlaying == true ? 'Stop' : 'Start'} </button>

        </div>
    )

}
export default Metronome;
