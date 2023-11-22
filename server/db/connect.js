const mongoose = require('mongoose');

const mongoURI = process.env.MONGODB_URI;

const connectToDB = async () => {
  await mongoose.connect(mongoURI);
  console.log('CONNECTED TO DB!');
};

module.exports = connectToDB;
