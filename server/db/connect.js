const mongoose = require('mongoose')
require('dotenv').config();

const connectionString = 'mongodb+srv://lucasjimenezk1998:2080@cluster0.ndpgvhl.mongodb.net/Express-App?retryWrites=true&w=majority'


mongoose
    .connect(connectionString)
    .then(() => console.log('CONNECTED TO DB'))
    .catch((err) => console.log(err))

