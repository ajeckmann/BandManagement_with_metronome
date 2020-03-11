const MusicianController= require('../controllers/musician.controller');

module.exports = function(app){
    app.get('/api/musician', MusicianController.index);
    app.post('/api/musician', MusicianController.createMusician);
    
    app.get('/api/musicians/:id', MusicianController.ViewMusician);
    app.put('/api/musicians/:id', MusicianController.updateMusician);
    app.delete('/api/musicians/:id', MusicianController.deleteMusician);
    app.put('/api/musicians/addsong/:id', MusicianController.addSongtoMusician);
    app.put('/api/musicians/removesong/:id', MusicianController.removeSongfromMusician);
    

}