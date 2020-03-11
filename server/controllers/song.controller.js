const {Song, Comment} = require('../models/song.model');




module.exports.createSong=(request, response)=>{
    console.log(request.body);
    // const{title, price, description} = request.body;
    Song.create(request.body)
    .then(song=>response.json(song))
    .catch(err=>response.status(400).json(err.errors));


}

module.exports.index=(request, response)=>{
    Song.find({})
        .then(song=>response.json(song))
        .catch(err=>response.json(err))
}

module.exports.ViewSong=(request, response) => {
    Song.findOne({_id:request.params.id})
      .then(song=>response.json(song))
      .catch(err=>response.json(err))
}


module.exports.updateSong=(request,response)=>{
    console.log(request.body);
    console.log(request.params.id);
    console.log("HEllo")
    Song.findOneAndUpdate({_id:request.params.id}, request.body, {runValidators:true,content:"query"})
    .then(updatedSong=>response.json(updatedSong))
    .catch(err=>response.status(400).json(err.errors));
}
    

module.exports.deleteSong=(request,response)=>{
    Song.deleteOne({_id: request.params.id})
    .then(deletedSong=>response.json(deletedSong))
    .catch(err=>response.status(400).json(err.errors));

}

module.exports.addCommenttoSong=(request,response)=>{
    console.log(request.params.id);
    console.log('ari');
    console.log(request.body);
    Comment.create(request.body)
        .then( data => {
            
            Song.findOneAndUpdate({_id:request.params.id}, {$push:{songcomments:data}},{runValidators:true, content:"query",useFindAndModify: false})
    
                .then(updatedSong=>response.json(updatedSong))
                .catch(err=>{
                    response.status(400).json(err.errors);
                    console.log(err);
                });
        })
        .catch(err => 
            {response.status(400).json(err.errors);
        console.log(request.body)
            });
                

        
    
}