require('dotenv').config();

const express = require('express');

const app = express();
const path = require('path');
const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
const flash = require('express-flash');
// const bodyParser = require('body-parser');
const expressSession = require('express-session');
const methodOverride = require('method-override');
const connectToDB = require('./db/connect');
const corsMiddleware = require('./middleware/cors');
const authRoutes = require('./routes/authRoutes');
const questionRoutes = require('./routes/questionRoutes');

const port = process.env.PORT || 4000;

app.use(corsMiddleware);

const buildPath = path.join(__dirname, '../frontend/build');

app.use(express.static(buildPath));

app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(
  expressSession({
    secret: 'hi',
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(methodOverride('_method'));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use('/api', authRoutes);
app.use('/api', questionRoutes);

app.get('/*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

const start = async () => {
  try {
    await connectToDB();
    app.listen(port, console.log(`server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
