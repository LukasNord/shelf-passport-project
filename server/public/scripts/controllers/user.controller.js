myApp.controller('UserController', ['UserService','$http','ShelfService', function(UserService,$http, ShelfService) {
  console.log('UserController created');
  var self = this;
  self.userService = UserService;
  self.userObject = UserService.userObject;

  self.shelfItem = {};

  self.addItem = function(newItem){
      
    ShelfService.addItem(newItem);
  
  }//end add item



}]);
