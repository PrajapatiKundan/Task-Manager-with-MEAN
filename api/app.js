const express = require('express')
const app = express()
const mongoose = require('mongoose')
const { MONGOURI } = require('./config/keys')
const bodyParser = require('body-parser')
const cors = require('cors')

//------------------------------------------------Make Connection------------------------------------------|
mongoose.connect(MONGOURI, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify: false,
    useCreateIndex: true
})

mongoose.connection.on('connected', () => {
    //'connected' is connection EVENT 
    console.log("Database connected successfully")
})

mongoose.connection.on('error', (err) => {
    console.log("Error in server connection : ", err)
})
//-----------------------------------------------Middleware---------------------------------|
app.use(cors({origin: 'http://localhost:4200'}))
app.use(express.json())
// app.use(bodyParser.json())
//-----------------------------------------------Model Registration-------------------------------------------|
require('./models/list-model')
require('./models/task-model')

//parse incoming request to json



//CORS enable middleware
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
app.use(require('./routes/list'))
//------------------------------------------------------------------------------------------|
app.listen(3000, () => {
    console.log("listening on port 3000...");
});