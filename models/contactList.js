var mongoose = require('mongoose');

var schema = mongoose.Schema({
  name:String,
  email:String,
  phone:Number
});

var Contact = mongoose.model('contacts', schema);

// Contact.create({
//   name:'gurkiran',
//   email:'gukiece@gmail.com',
//   phone:6124010224
// })

module.exports = Contact;
