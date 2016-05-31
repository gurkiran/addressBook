var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Contact = require('./models/contactList');

console.log("ankit");
var app = express();

// mongoose.connect('mongodb://localhost/contact');

mongoose.connect('mongodb://gurkiran:mlab12@ds059471.mlab.com:59471/addressbook');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {

});

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//// FIRST
app.get('/contactList', function(req, res){
  Contact.find({}, function(err, contact){
    if(err) {
      console.log(err);
    } else {
      res.json(contact);
    }
  });
});

app.post('/contactList', function(req, res){
    console.log(req.body);
    var newContact = req.body;
    Contact.create(newContact, function(err, contact){
      if(err) {
        console.log(err);
      } else {
        res.json(contact);
      }
    });
});

app.delete('/contactList/:id', function(req, res){
  // console.log(req.params.id);
  Contact.findByIdAndRemove(req.params.id , function(err, contact){
    if(err) {
      console.log(err);
    } else {
      res.json(contact);
    }
  });
});

app.get('/contactList/:id', function(req, res){
  console.log(req.params.id);
  Contact.findById(req.params.id, function(err, foundContact){
    if(err) {
      console.log(err);
    } else {
      res.json(foundContact);
    }
  });
});

app.put('/contactList/:id', function(req, res){
  console.log(req.params.id);
  console.log(req.body.name);
  Contact.findByIdAndUpdate(req.params.id, req.body, function (err, contact){
    res.json(contact);
  });
});

var port = process.env.PORT || 3000;
app.listen(port);
console.log('server started ...');
