if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
require('./db/connect')
const express = require('express')
const app = express()
const questionRoutes = require('./routes/questionRoutes');
const answerRoutes = require('./routes/answerRoutes');
const path = require('path');
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto');
const secretKey = crypto.randomBytes(32).toString('hex');
const flash = require('express-flash')
const expressSession = require('express-session')
const initializePassport = require('../passport-config');
const methodOverride = require('method-override')
const authRoutes = require('./routes/authRoutes')


initializePassport(passport)

const port = (process.env.PORT || 3000)

const start = async () =>{
    try{
        await app.listen(port, console.log(`server is listening on port ${port}...`))
    } catch (error) {
        console.log(error)
    }
}

app.set('view engine', 'ejs');
app.set('views' , path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(expressSession({
  secret: process.env.SESSION_SECRET,
  resave: false, 
  saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'))
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/api', questionRoutes);


 
start()

