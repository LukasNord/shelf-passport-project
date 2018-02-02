const express = require('express');
const encryptLib = require('../modules/encryption');
const User = require('../models/User');
const Item = require('../models/Item');
const userStrategy = require('../strategies/user.strategy');
const router = express.Router();



var isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()){
    return next();
  }
  res.send('Must be logged in to add items!');
}

/* POST: Add Item to Item Collection */

router.post('/addItem', isAuthenticated, (req, res) => {
    console.log('req, ', req.user);
    
    const newItem = req.body;
    newItem.placer = req.user._id;

    console.log('newItem: ', newItem);

    let itemToSave = new Item(newItem);

    itemToSave.save()
      .then(() => {
        res.sendStatus(201);
      })
      .catch((err) => {
        next(err);
      });
}); // end shelf post


router.get('/getItems', (req, res) => {

  Item.find({}, (error, data) => {
    if (error) {
      console.log('MongoDB error on getItems: ', error);
      res.sendStatus(500);
    } else {
      console.log('Foud Items: ', data);
      res.send(data);
    }
  }); //end Item Find

}); // end GET items route


















module.exports = router;