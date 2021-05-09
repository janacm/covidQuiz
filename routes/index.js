const express = require('express');
const router = express.Router();


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {
    title: 'COVID-19 Vaccine Quiz'
  });
});

/*** View getters ***/
router.get('/1', (req, res) => {
  res.render('1', {title: 'Q1'});
});

router.get('/2', (req, res) => {
  res.render('2', {title: 'Q2'});
});

router.get('/3', (req, res) => {
  res.render('3', {title: 'Q3'});
});

router.get('/4', (req, res) => {
  res.render('4', {title: 'Q4'});
});

router.get('/5', (req, res) => {
  res.render('5', {title: 'Q3'});
});

router.get('/6', (req, res) => {
  res.render('6-poll', {title: 'Q6'});
});

router.get('/7', (req, res) => {
  res.render('7-result', {title: 'Your Result!'});
});

/*** Form submission handlers ***/
router.post('/submitAnswer', (req, res) => {
  console.log(req.body);
  if (req.body.answer === "correct") {
    if (req.session.totalCorrect) {
      req.session.totalCorrect++;
    } else {
      req.session.totalCorrect = 1;
    }
    res.render(req.body.pagenum, {
      submitted: true,
      correct: true
    });
  } else {
    res.render(req.body.pagenum, {
      submitted: true,
      correct: false
    });
  }
});

router.post('/7', (req, res) => {
    res.render('7-result', {
      totalCorrect: req.session.totalCorrect
    });
});

/*** SessionStorage Handler ***/
router.get('/sess', (req, res) => {
  if (req.session.page_views) {
    req.session.page_views++;
    res.send("You visited this page " + req.session.page_views + " times.");
  } else {
    req.session.page_views = 1;
    res.send("Welcome to this page!");
  }
});

module.exports = router;