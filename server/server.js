console.log("loading server files");

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();
var Message = require('./models/messageSchema.js');


// Middleware
app.use(express.static('public'));
app.use(bodyParser.json()); // needed for angular requests


// return all listings
app.get('/', function(req, res) {
  // find (select) all documents in our collection
  Message.find({}, function(err, data) {
    if(err) {
      console.log('find error:', err);
      res.sendStatus(500);
    } else {
      res.send(data);
      // res.send(result.rows)
    }
  });
});


/** -------- MONGOOSE CONNECTION --------**/
var databaseUrl = 'mongodb://localhost:27017/messages';
mongoose.connect(databaseUrl);

mongoose.connection.on('connected', function() {
  console.log('mongoose connected to : ', databaseUrl);
});

mongoose.connection.on('error', function(err) {
  console.log('mongoose connection error: ', err);
});

/** ---------- START SERVER ---------- **/
app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function() {
    console.log('Listening on port: ', app.get('port'));
});
