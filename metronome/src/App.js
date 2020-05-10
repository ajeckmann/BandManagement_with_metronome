import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Router } from '@reach/router';
import Main from './views/Main';
import MusicianList from './views/MusicianList';
import SongList from './views/SongList';
import GigList from './views/GigList';
import AddMusician from './views/AddMusician';
import AddSong from './views/AddSong';
import AddGig from './views/AddGig';
import ViewSong from './views/ViewSong';
import ViewGig from './views/ViewGig';
import ViewMusician from './views/ViewMusician';
import Metronome from './views/Metronome';
function App() {
  return (
    <div className="App">

      <Router>

        <Main path="/" />
        <MusicianList path="musicianlist" />
        <AddMusician path="musicianlist/musician/new" />
        <SongList path="songlist" />
        <GigList path="giglist" />
        <ViewGig path="gigs/:id" />
        <AddSong path="songlist/song/new" />
        <ViewSong path="/songs/:id" />
        <ViewMusician path="/musicians/:id" />
        <AddGig path="/giglist/gig/new" />
        <Metronome path="/viewmetronome" />




      </Router>


    </div>
  );
}

export default App;
