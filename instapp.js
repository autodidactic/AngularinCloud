var app = angular.module('switchableGrid', ['ngResource']);



app.factory('instagram', function($resource) {

  return {
    fetchPopular: function(callback) {
      var api = $resource('https://api.instagram.com/v1/media/popular?client_id=:client_id&callback=JSON_CALLBACK', {
        client_id: '642176ece1e7445e99244cec26f4de1f'
      }, { 
        // This creates an action which we've chosen to name "fetch". It issues
        // an JSONP request to the URL of the resource. JSONP requires that the
        // callback=JSON_CALLBACK part is added to the URL.

        fetch: {
          method: 'JSONP'
        }
      }); 
      
      api.fetch(function(response){
        callback(response.data);
      });
    }
  }
});
app.controller('switchableGridController', function($scope,instagram) {
  $scope.layout = 'grid';
  

  $scope.pics = [];

  instagram.fetchPopular(function(data) {
    $scope.pics = data;
  });
});
