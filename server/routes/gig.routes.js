const GigController= require('../controllers/gig.controller');

module.exports = function(app){
    app.get('/api/gig', GigController.index);
    app.post('/api/gig', GigController.createGig);
    
    app.get('/api/gigs/:id', GigController.ViewGig);
    app.put('/api/gigs/:id', GigController.updateGig);
    app.delete('/api/gigs/:id', GigController.deleteGig);
    app.put('/api/gigs/addsong/:id', GigController.addSongToGig);
    app.put('/api/gigs/removesong/gig/:id', GigController.removedSongfromGig);

}