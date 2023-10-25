if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
require('./db/connect')
const express = require('express')
const app = express()
require('dotenv').config
const questionRoutes = require('./routes/questionRoutes');
const answerRoutes = require('./routes/answerRoutes');
const path = require('path');
const bcrypt = require('bcrypt')
const User = require('./models/models').User;
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const expressSession = require('express-session');
const crypto = require('crypto');
const secretKey = crypto.randomBytes(32).toString('hex');
const flash = require('express-flash')
const session = require('express-session')
const initializePassport = require('../passport-config');
const methodOverride = require('method-override')


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
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false, 
  saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'))


app.set('views' , path.join(__dirname, 'views'));

app.use(expressSession({
  secret: secretKey,
  resave: true,
  saveUninitialized: true
}));




function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login'); 
}




app.get('/', checkAuthenticated, (req, res) => {
    res.render('index.ejs', {name: req.user.name})
})

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs')
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash:true
}))


app.get('/register', (req, res) => {
    res.render('register.ejs')
})

app.post('/register', checkNotAuthenticated, async (req, res) =>{
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const newUser = new User ({
            name: req.body.name,
            email:req.body.email,
            password:hashedPassword,
        })
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
        res.redirect('/login')
    } catch {
      res.redirect('/register')
    }
  })

app.delete('/logout', (req, res) => {
  req.logOut()
  res.redirect('/login')
})

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login.ejs');
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next()
}

app.use(express.json());

app.use('/api', questionRoutes);
 
start()

