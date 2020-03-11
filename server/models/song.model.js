uniqueValidator = require("mongoose-unique-validator");
const mongoose = require('mongoose');



const CommentSchema = new mongoose.Schema({

    description:{
        type: String,
        required:["Must Include Comment"]
    },

},{timestamps: true});

const SongSchema = new mongoose.Schema({

    title:{
        type: String,
        required:["Must Include Title"]
    },

    artist:{
        type: String,
        required:["Must Include Artist"]
    },

    songvocalist:{
        
    },

    

    
    status: {
        type: String,
        default: "new"
    },

    songcomments:[CommentSchema],
    
   
    
}, {timestamps: true});

////////////////////////

const MusicianSchema = new mongoose.Schema({

    firstName:{
        type: String,
        required:[true, "Please Include First name"]
    },
    lastName: {
        type: String,
        required:[true, "Please Include Last Name"]
    },
    instrument1:{
        type: String,

    },
    instrument2:{
        type: String,


    },
    
    instrument3:{
        type: String,

    },
    songs:[SongSchema]
 
}, {timestamps: true});
//////////////////

const GigSchema = new mongoose.Schema({

    event:{
        type: String,
        required:[true, "Please Include Gig Title"]
    },
    date: {
        type: Date,
        required:[true, "Please Include Date"]
    },

    time:{
        type: String,
        required:[true, "Need Time"]
        
        
    },

    // comments:[CommentSchema],
    
    songs:[SongSchema],


 
}, {timestamps: true});

/////////////



    

    // comments:[CommentSchema],
    
    


 





module.exports.Song = mongoose.model("Song", SongSchema);
module.exports.Musician = mongoose.model("Musician", MusicianSchema);
module.exports.Gig = mongoose.model("Gig", GigSchema);
module.exports.Comment = mongoose.model("Comment", CommentSchema);
