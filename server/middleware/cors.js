const cors = require('cors');

const allowedOrigins = ['http://localhost:4000', 'http://localhost:3000', 'https://evening-wave-27395-295955682332.herokuapp.com'];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

module.exports = cors(corsOptions);
