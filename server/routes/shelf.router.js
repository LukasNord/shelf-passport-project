const express = require('express');
const encryptLib = require('../modules/encryption');
const User = require('../models/User');
const Item = require('../models/Item');
const userStrategy = require('../strategies/user.strategy');
const router = express.Router();





/* POST: Add Item to Item Collection */

router.post('/addItem', (req,res) => {

    console.log('req.body: ', req);
      
    const newItem = req.body;
    newItem.placer = req.user._id;
  
    console.log('newItem: ', newItem);
    
    let itemToSave = new Item( newItem );
  
    itemToSave.save()
      .then(() => { res.sendStatus(201); })
      .catch((err)=> { next(err); });
  
  });// end shelf post
  




















module.exports = router;