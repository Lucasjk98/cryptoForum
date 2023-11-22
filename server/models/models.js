const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
});

// eslint-disable-next-line func-names
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const questionSchema = new Schema({
  title: String,
  content: String,
  category: String,
  user: Object,

  answers: [{
    type: Schema.Types.ObjectId,
    ref: 'Answer',
  }],
});

const answerSchema = new Schema({
  content: String,
  category: String,
  user: Object,
  questionId: Schema.Types.ObjectId,
});

const User = mongoose.model('User', userSchema);
const Question = mongoose.model('Question', questionSchema);
const Answer = mongoose.model('Answer', answerSchema);

module.exports = {
  User,
  Question,
  Answer,
};
