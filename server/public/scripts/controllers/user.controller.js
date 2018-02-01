myApp.controller('UserController', ['UserService','$http','ShelfService', function(UserService,$http, ShelfService) {
  console.log('UserController created');
  var self = this;
  self.userService = UserService;
  self.userObject = UserService.userObject;

  self.shelfItem = {};
  self.shelfItems = [{name: 'OBJ1'}, {name: 'OBJ2'}, {name: 'OBJ3'}];

  self.addItem = function(newItem){
      
    ShelfService.addItem(newItem);
  
  }//end add item



}]);
