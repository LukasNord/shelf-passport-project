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




router.delete('/delete/:placer/:itemId', (req,res) => {
  let deleter = req.user._id;
  let placer = req.params.placer;
  let itemId = req.params.itemId;
  console.log('hit server with delete request');
  
  
  if(deleter == placer){
    console.log('deleter matches placer');
    
     Item.findByIdAndRemove(
        {"_id": itemId},
        (error, data )=> {
          if(error){
            console.log('error on remove ', error);
            res.sendStatus(500);
          }else{
            console.log('deleted your item: ', data);
            res.send(data);
          }
        }
    )
    
  }else {
    console.log('user match failed on delete');
    
    res.sendStatus(500);
    
  }

});//end delete










module.exports = router;