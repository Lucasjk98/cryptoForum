const express = require('express');
const router = express.Router();

const Question = require('../models/models').Question;
const Answer = require('../models/models').Answer;
const mongoose = require('mongoose');


router.get('/questions/:category', async (req, res) => {
  try {
    const category = req.params.category;
    const questions = await Question.find({ category });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/questions/:category', async (req, res) => {
  try {
    const { title, content, category, user } = req.body;
    const newQuestion = new Question({ title, content, category, user });
    const savedQuestion = await newQuestion.save();
    res.json(savedQuestion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/questions/:category/:questionId', async (req, res) => {
  try {
    const question = await Question.findById(req.params.questionId).populate('answers');
    res.json(question);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/questions/:category/:questionId', async (req, res) => {
  try {
    const { content, questionId, category, user } = req.body;

    const newAnswer = new Answer({ content, category, questionId, user });
    const savedAnswer = await newAnswer.save();

    const updatedQuestion = await Question.findByIdAndUpdate(
      questionId,
      { $push: { answers: savedAnswer._id } },
      { new: true }
    ).populate('answers');

    res.json(updatedQuestion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/questions/:questionId/answers', async (req, res) => {
  try {
    const questionId = req.params.questionId;
    const answers = await Answer.find({ questionId: mongoose.Types.ObjectId(questionId) });
    console.log('Answers:', answers);
    res.json(answers);
  } catch (error) {
    console.error('Error fetching answers:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;