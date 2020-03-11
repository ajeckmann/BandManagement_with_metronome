const {Musician} = require('../models/song.model');



module.exports.createMusician=(request, response)=>{
    console.log(request.body);
    const{title, price, description} = request.body;
    Musician.create(request.body)
    .then(musician=>response.json(musician))
    .catch(err=>response.status(400).json(err.errors));


}

module.exports.index=(request, response)=>{
    Musician.find({}).sort({lastName: 1})
        .then(action=>response.json(action))
        .catch(err=>response.json(err))
}

module.exports.ViewMusician=(request, response) => {
    Musician.findOne({_id:request.params.id})
      .then(action=>response.json(action))
      .catch(err=>response.json(err))
}


module.exports.updateMusician=(request,response)=>{
    Musician.findOneAndUpdate({_id:request.params.id}, request.body, {runValidators:true, content:"query"})
    .then(updatedMusician=>response.json(updatedMusician))
    .catch(err=>response.status(400).json(err.errors));
}
    

module.exports.deleteMusician=(request,response)=>{
    Musician.deleteOne({_id: request.params.id})
    .then(deletedMusician=>response.json(deletedMusician))
    .catch(err=>response.status(400).json(err.errors));



}
module.exports.addSongtoMusician=(request,response)=>{
    console.log(request.body);
    console.log('ari');
    Musician.findOneAndUpdate({_id: request.params.id}, {$push:{songs:request.body}},{runValidators:true, content:"query"})
    
    .then(updatedMusician=>response.json(updatedMusician))
    .catch(err=>response.status(400).json(err.errors));

        
    
}

module.exports.removeSongfromMusician=(request,response)=>{
    console.log(request.body);
    console.log('ari');
    Musician.findOneAndUpdate({_id: request.params.id}, {$pull:{songs:request.body}},{runValidators:true, content:"query"})
    
    .then(updatedMusician=>response.json(updatedMusician))
    .catch(err=>response.status(400).json(err.errors));

        
    
}
