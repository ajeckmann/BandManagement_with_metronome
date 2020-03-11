const express=require('express');
const cors = require('cors');
const app= express();
require('./server/config/mongoose.config');
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}))

require('./server/routes/musician.routes')(app);
require('./server/routes/song.routes')(app);
require('./server/routes/gig.routes')(app);
require('./server/routes/comment.routes')(app);

 //be careful...may need to change what;s in place of "product"

app.listen(8000,()=> {
    console.log("Listening at Port 8000")
});