const express = require('express');
const encryptLib = require('../modules/encryption');
const User = require('../models/User');
const Item = require('../models/Item');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', (req, res) => {
  // check if logged in
  if (req.isAuthenticated()) {
    // send back user object from database
    res.send(req.user);
  } else {
    // failure best handled on the server. do redirect here.
    res.sendStatus(403);
  }
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);

  const newUser = new User({ username, password });
  newUser.save()
    .then(() => { res.sendStatus(201); })
    .catch((err) => { next(err); });
});

router.post('/shelf', (req,res) => {

  console.log('req.body: ', req);
    
    
  const newItem = req.body;
  newItem.placer = req.user._id;

  console.log('newItem: ', newItem);
  
  let itemToSave = new Item( newItem );

  itemToSave.save()
    .then(() => { res.sendStatus(201); })
    .catch((err)=> { next(err); });



});// end shelf post




// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.get('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
