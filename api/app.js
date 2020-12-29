const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const { MONGOURI } = require('./config/keys')

const app = express()

//------------------------------------------------Make Connection with MONGO ----------------------------------------------

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

//-----------------------------------------------Middleware----------------------------------------------------------------

app.use( cors( { origin: 'http://localhost:4200' } ) )
app.use( express.json() )//parse incoming request to json

//-----------------------------------------------Model Registration--------------------------------------------------------

/*
require('./models/user-model')
require('./models/list-model')
require('./models/task-model')
*/

//-----------------------------------------------Routers--------------------------------------------------------------------

app.use(require('./routes/list'))
app.use(require('./routes/auth'))

//----------------------------------------------Listening port--------------------------------------------------------------

app.listen(3000, () => {
    console.log("listening on port 3000...");
});