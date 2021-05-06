const express = require('express');
const mongoose = require("mongoose");
const router = express.Router();

/*** Persistence ***/
// Person Schema
const personSchema = mongoose.Schema({
  name: String
});
const Person = mongoose.model("Person", personSchema);

// Answer Schema
const answerSchema = mongoose.Schema({
  isCorrect: Boolean
})
const Answer = mongoose.model("Answer", answerSchema);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'COVID-19 Vaccine Quiz' });
});

router.get('/first', (req, res) => {
  res.render('first', {title: 'Q1'});
});

// Person Routes
router.get('/person', (req, res) => {
  res.render('person', {title: 'Q1'});
});

router.post('/person', (req, res) => {
  const personInfo = req.body;
  if (!personInfo.name) {
    res.render('show_message', {
      message: "You didn't enter your name. You had one job.",
      type: "error"
    });
  } else {
    const newPerson = new Person({
      name: personInfo.name,
    });

    newPerson.save(function (err, Person) {
      if (err) {
        res.render('show_message',
            {
              message: "Database error",
              type: "error"
            });
      } else {
        res.render('show_message', {
          message: "New person added",
          type: "success",
          person: personInfo
        });
      }
    });
  }
});

// Retrieve all docs
router.get('/docs', (req, res) => {
  Person.find((err, response) => res.json(response));
})

router.post('/', (req, res) => {
  console.log(req.body);
  if (req.body.say === "Hi") {
    res.send("Correct!");
  } else {
    res.send("Wrong. Try again");
  }
});

module.exports = router;