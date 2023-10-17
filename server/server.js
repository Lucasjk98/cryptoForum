require('./db/connect')
const express = require('express')
const app = express()
require('dotenv').config
const questionRoutes = require('./routes/questionRoutes');
const answerRoutes = require('./routes/answerRoutes');

const port = (process.env.PORT || 3000)

const start = async () =>{
    try{
        await app.listen(port, console.log(`server is listening on port ${port}...`))
    } catch (error) {
        console.log(error)
    }
}

app.use(express.json());

app.use('/api', questionRoutes);
 
start()

