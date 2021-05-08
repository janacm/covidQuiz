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

  res.render('index', {
    title: 'COVID-19 Vaccine Quiz'
  });
});

router.get('/1', (req, res) => {
  res.render('1', {title: 'Q1'});
});

router.get('/2', (req, res) => {
  res.render('2', {title: 'Q2'});
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

router.post('/1', (req, res) => {
  console.log(req.body);
  if (req.body.answer === "correct") {
    res.render('1', {
      submitted: true,
      correct: true
    });
  } else {
    res.render('1', {
      submitted: true,
      correct: false
    });
  }
});

module.exports = router;