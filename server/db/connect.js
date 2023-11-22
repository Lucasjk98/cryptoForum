const mongoose = require('mongoose');

const mongoURI = process.env.MONGODB_URI;

const connectToDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('CONNECTED TO DB');
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectToDB;
