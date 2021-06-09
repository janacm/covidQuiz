<<<<<<< HEAD
// From masterly branch
=======
// From rebaser branch
>>>>>>> 2e06942e01661f08572ec0513a536394d36724a9
const express = require('express');
const path = require('path');
const app = express();
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
  res.render('5', {title: 'Q5'});
});

router.get('/6', (req, res) => {
  res.render('6', {title: 'Q6'});
});

router.get('/poll', (req, res) => {
  res.render('poll', {title: 'poll'});
});

router.get('/poll-results', (req, res) => {
  res.render('poll-results', {title: 'Poll Results'});
});


router.get('/result', (req, res) => {
  res.render('result', {title: 'Your Result!'});
});

router.get('/about', (req, res) => {
  res.render('about', {title: 'About!'});
});

var dir = path.join(__dirname, 'public');
dir = path.join(__dirname, 'images');
router.use(express.static(dir));


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