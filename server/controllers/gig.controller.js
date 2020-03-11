const {Gig} = require('../models/song.model');




module.exports.createGig=(request, response)=>{
    console.log(request.body);
    console.log('chicken');
    Gig.create(request.body)
    .then(gig=>response.json(gig))
    .catch(err=>response.status(400).json(err.errors));


}

module.exports.index=(request, response)=>{
    Gig.find({}).sort({event: 1})
        .then(action=>response.json(action))
        .catch(err=>response.json(err))
}

module.exports.ViewGig=(request, response) => {
    Gig.findOne({_id:request.params.id})
      .then(gig=>response.json(gig))
      .catch(err=>response.json(err))
}


module.exports.updateGig=(request,response)=>{
    Gig.findOneAndUpdate({_id:request.params.id}, request.body, {runValidators:true})
    .then(updatedGig=>response.json(updatedGig))
    .catch(err=>response.status(400).json(err.errors));
}
    

module.exports.deleteGig=(request,response)=>{
    Gig.deleteOne({_id: request.params.id})
    .then(deletedGig=>response.json(deletedGig))
    .catch(err=>response.status(400).json(err.errors));

}

module.exports.addSongToGig=(request,response)=>{
    console.log(request.body);
    console.log('ari');
    Gig.findOneAndUpdate({_id: request.params.id}, {$push:{songs:request.body}},{runValidators:true, content:"query"})
    
    .then(updatedGig=>response.json(updatedGig))
    .catch(err=>response.status(400).json(err.errors));

        
    
}

module.exports.removedSongfromGig=(request,response)=>{
    console.log(request.body);
    console.log('ari');
    Gig.findOneAndUpdate({_id: request.params.id}, {$pull:{songs:request.body}},{runValidators:true, content:"query"})
    
    .then(updatedGig=>response.json(updatedGig))
    .catch(err=>response.status(400).json(err.errors));

        
    
}

