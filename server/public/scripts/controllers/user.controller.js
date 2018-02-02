myApp.controller('UserController', ['UserService', '$http', 'ShelfService', '$mdDialog', function (UserService, $http, ShelfService, $mdDialog) {
  console.log('UserController created');
  var self = this;
  self.userView - true;
  self.userObject = UserService.userObject;

  self.shelfItem = {};
  self.items = ShelfService.items;

  self.addItem = function (newItem) {
    ShelfService.addItem(newItem);
    ShelfService.getItems();
  } //end add item


  self.showAdvanced = function (ev) {
    $mdDialog.show({
        controller: DialogController,
        controllerAs: 'vm',
        templateUrl: '../views/partials/dialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true
      })
      .then(function (answer) {
        self.addItem(answer);
      }, function () {
        self.status = 'You cancelled the dialog.';
      });
  };

  function DialogController($mdDialog) {
    const self = this;
    self.hide = function () {
      $mdDialog.hide();
    };

    self.cancel = function () {
      $mdDialog.cancel();
    };

    self.answer = function (answer) {
      console.log('answer', answer);

      $mdDialog.hide(answer);
    };
  }

}]);