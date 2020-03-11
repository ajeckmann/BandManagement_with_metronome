const SongController= require('../controllers/song.controller');

module.exports = function(app){

    app.get('/api/song', SongController.index);
    app.post('/api/song', SongController.createSong);
    
    app.get('/api/songs/:id', SongController.ViewSong);
    app.put('/api/songs/:id', SongController.updateSong);
    app.delete('/api/songs/:id', SongController.deleteSong);
    app.put('/api/addcommenttosong/:id', SongController.addCommenttoSong);

}



