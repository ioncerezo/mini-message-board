// Require Mongoose
const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  text: String,
  user: String,
  added: String,
  creationData: Date,
});

// Compile model from schema
module.exports =  mongoose.model("Message", MessageSchema);
