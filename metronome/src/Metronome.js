import React, {Component} from 'react';
import '../Metronome.css';
import 'bootstrap/dist/css/bootstrap.css';


const Metronome=(props)=> {
    const bpm=106;
    const isPlaying = false;



    return( 
    <div className="metronome">
        <div className="bpm-slider">
            <div>{bpm} BPM</div>
            <input type="range"/>
        </div>
        <button className=" button"> {isPlaying? 'Stop': 'Start'} </button>
    </div>
    )
}
export default Metronome;
