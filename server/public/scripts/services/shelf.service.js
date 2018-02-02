myApp.service('ShelfService', ['$http', '$location','$mdToast', function ($http, $location, $mdToast) {
    console.log('ShelfService Loaded');
    
    var self = this;
  
    self.userObject = {};
    self.items = { list: [] };
  

    /* Add New Item */
    self.addItem = function(newItem){
        
        $http.post('/api/shelf/addItem', newItem).then(
            function(response) {
              console.log('item added: ', response);
              self.getItems();
    
            }).catch((err)=>{
                console.log('err. ', err)});
                // end POST       
    }// end add new Item



    self.getItems = function(){
        $http.get('/api/shelf/getItems')
            .then(function (response) {
                console.log('items response: ', response.data );
                self.items.list = response.data;
            })


    }// end Get Items

    //Call getItems to fetch item list when Service is Instantiated
    self.getItems();




    /* Toast for Delete Failure */

    self.showSimpleToast = function() {
        
    
        $mdToast.show(
          $mdToast.simple()
            .textContent('You can only Delete Items that you added to the Shelf!')
            .position('right')
            .hideDelay(3000)
        );
      };




    /* Delete Item from Shelf */

    self.deleteItem = function(item){


        let placer = item.placer;
        let itemId = item._id;
        $http.delete(`/api/shelf/delete/${placer}/${itemId}`)


            .then(    function(response){
                self.getItems();
            })
            .catch ( function(response) {
                self.showSimpleToast();
                console.log('error on delete: ', response);
            })

    }//end delete














  }]);
  