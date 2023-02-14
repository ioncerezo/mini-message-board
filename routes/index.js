var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
const mongoDB = "mongodb+srv://admin:admin@cluster0.cybndze.mongodb.net/message-app?retryWrites=true&w=majority";
// Wait for database to connect, logging an error if there is a problem 
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

let user = 'Your user name...'
const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: 'Monday 19:57'
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: 'Monday 19:57'
  }
];

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { messages: messages , user: user });
});



router.post('/new', function(req, res, next) {
  let fullDate = new Date()
  let minutes = (fullDate.getMinutes() < 10) ? `0${fullDate.getMinutes()}` : fullDate.getMinutes()
  let date =  days[fullDate.getDay()] + ' ' + fullDate.getHours() + ':' + minutes
  messages.unshift({text: req.body.text, user: req.body.user, added: date });
  user = req.body.user
  res.redirect('/')
});

module.exports = router;
