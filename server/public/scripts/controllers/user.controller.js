myApp.controller('UserController', ['UserService','$http','ShelfService', '$mdDialog', function(UserService,$http, ShelfService, $mdDialog) {
  console.log('UserController created');
  var self = this;
  self.userService = UserService;
  self.userObject = UserService.userObject;

  self.shelfItem = {};
  self.items = ShelfService.items;

  self.addItem = function(newItem){
      
    ShelfService.addItem(newItem);
  
  }//end add item


  self.showAdvanced = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: '../views/partials/dialog.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
  };

  function DialogController($scope, $mdDialog) {
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
  }

}]);
