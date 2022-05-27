const express = require('express');

const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
const bookRouter = require("./routes/bookRoutes");


//parsing JSON data
app.use(bodyParser.json());
app.use("/api/v1",bookRouter);
app.listen(PORT , ()=>{
    
    console.log(`Connection Established at  localhost ${PORT}`);

})

