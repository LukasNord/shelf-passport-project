myApp.controller('UserController', ['UserService','$http','ShelfService', function(UserService,$http, ShelfService) {
  console.log('UserController created');
  var self = this;
  self.userService = UserService;
  self.userObject = UserService.userObject;

  self.shelfItem = {};
  self.items = ShelfService.items;

  self.addItem = function(newItem){
      
    ShelfService.addItem(newItem);
    
    ShelfService.getItems();
  }//end add item



}]);
