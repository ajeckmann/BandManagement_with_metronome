const {Comment} = require('../models/song.model');



module.exports.createComment=(request, response)=>{
    console.log(request.body);
    const{title, price, description} = request.body;
    Comment.create(request.body)
    .then(Comment=>response.json(Comment))
    .catch(err=>response.status(400).json(err.errors));


}

module.exports.index=(request, response)=>{
    Comment.find({}).sort({lastName: 1})
        .then(action=>response.json(action))
        .catch(err=>response.json(err))
}

module.exports.ViewComment=(request, response) => {
    Comment.findOne({_id:request.params.id})
      .then(action=>response.json(action))
      .catch(err=>response.json(err))
}


module.exports.updateComment=(request,response)=>{
    Comment.findOneAndUpdate({_id:request.params.id}, request.body, {runValidators:true, content:"query"})
    .then(updatedComment=>response.json(updatedComment))
    .catch(err=>response.status(400).json(err.errors));
}
    

module.exports.deleteComment=(request,response)=>{
    Comment.deleteOne({_id: request.params.id})
    .then(deletedComment=>response.json(deletedComment))
    .catch(err=>response.status(400).json(err.errors));



}
module.exports.addSongtoComment=(request,response)=>{
    console.log(request.body);
    console.log('ari');
    Comment.findOneAndUpdate({_id: request.params.id}, {$push:{songs:request.body}},{runValidators:true, content:"query"})
    
    .then(updatedComment=>response.json(updatedComment))
    .catch(err=>response.status(400).json(err.errors));

        
    
}

module.exports.removeCommentfromMusician=(request,response)=>{
    console.log(request.body);
    console.log('ari');
    Comment.findOneAndUpdate({_id: request.params.id}, {$pull:{Comments:request.body}},{runValidators:true, content:"query"})
    
    .then(updatedMusician=>response.json(updatedMusician))
    .catch(err=>response.status(400).json(err.errors));

        
    
}
