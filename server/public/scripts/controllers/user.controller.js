myApp.controller('UserController', ['UserService','$http', function(UserService,$http) {
  console.log('UserController created');
  var self = this;
  self.userService = UserService;
  self.userObject = UserService.userObject;

  self.shelfItem = {};

  self.addItem = function(newItem){
      console.log('new Item: ', newItem);

      $http.post('/api/user/shelf', newItem).then(
        function(response) {
          console.log('item added: ', response);
          
        //   if(response.status == 200) {
        //     console.log('success: ', response.data);
        //     // location works with SPA (ng-route)
        //     $location.path('/user');
        //   } else {
        //     console.log('failure error: ', response);
        //     self.message = "Incorrect credentials. Please try again.";
        //   }
        // },
        // function(response) {
        //   console.log('failure error: ', response);
        //   self.me
    
    });
}//end add item


}]);
