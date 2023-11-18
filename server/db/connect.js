const mongoose = require('mongoose')

const mongoURI = process.env.MONGODB_URI

mongoose
    .connect(mongoURI)
    .then(() => console.log('CONNECTED TO DB'))
    .catch((err) => console.log(err))

