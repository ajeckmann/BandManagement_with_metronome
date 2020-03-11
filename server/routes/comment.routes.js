const CommentController= require('../controllers/comment.controller');

module.exports = function(app){
    app.get('/api/comment', CommentController.index);
    app.post('/api/comment', CommentController.createComment);
    
    app.get('/api/comments/:id', CommentController.ViewComment);
    app.put('/api/comments/:id', CommentController.updateComment);
    app.delete('/api/comments/:id', CommentController.deleteComment);
   

}