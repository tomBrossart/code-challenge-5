var express = require('express');
var router = express.Router();
var Message = require('../models/messageSchema.js');


// return all listings
router.get('/', function(req, res) {
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

router.post('/', function(req, res) {
  console.log('post request received', req.body);
  var newMessage = new Message(req.body);
  newMessage.save(function(err, data) {
    if(err) {
      console.log('HEY error:', err);
      res.sendStatus(500);
    } else {
      res.sendStatus(201);
      console.log("succesful message added");
    }
  });
});


module.exports = router;
