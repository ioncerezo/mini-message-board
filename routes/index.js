var express = require('express');
var router = express.Router();
require('dotenv').config();
const mongoose = require("mongoose");
const Message = require("../models/message.js");
mongoose.set('strictQuery', false);
const mongoDB = `mongodb+srv://${process.env.USER_ID}:${process.env.USER_KEY}@cluster0.cybndze.mongodb.net/message-app?retryWrites=true&w=majority`
let messages = []

// Wait for database to connect, logging an error if there is a problem 
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
  const query = Message.find()
  query.sort('-creationData')
  query.exec((err, sortedMessages) => {
    if (err) return console.log(err);
    messages = sortedMessages
  });
}

let user = 'Your user name...'

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
  new Message ({text: req.body.text, user: req.body.user, added: date, creationData: fullDate }).save()
  user = req.body.user
  res.redirect('/')
});

module.exports = router;
