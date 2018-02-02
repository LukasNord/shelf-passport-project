const express = require('express');
const encryptLib = require('../modules/encryption');
const User = require('../models/User');
const Item = require('../models/Item');
const userStrategy = require('../strategies/user.strategy');
const router = express.Router();





/* POST: Add Item to Item Collection */

router.post('/addItem', (req,res) => {
  // if  {

    console.log('req.user: ', req.user);
      
    const newItem = req.body;
    newItem.placer = req.user._id;
  
    console.log('newItem: ', newItem);
    
    let itemToSave = new Item( newItem );
  
    itemToSave.save()
      .then(() => { res.sendStatus(201); })
      .catch((err)=> { next(err); });
  // } else {
  //   res.sendStatus(500);
  // }
  });// end shelf post
  

router.get('/getItems', (req, res)=> {
  
  Item.find( { }, (error, data)=> {
    if(error){
      console.log('MongoDB error on getItems: ', error);
      res.sendStatus(500);
    }else {
      console.log('Foud Items: ', data);
      res.send(data);
    }
  });//end Item Find

});// end GET items route


















module.exports = router;