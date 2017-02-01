var app = angular.module('giphyApp', []);

  app.controller('GiphyController', function($http){
    console.log('controller loaded');
    var ctrl = this;

    var API = 'http://api.giphy.com/v1';
    ctrl.imageUrl = ' ';
    ctrl.searchQuery = ' ';
    ctrl.searchGifs = [];

ctrl.getRandomGif = function(){

    $http({
    method: 'GET',
    url: API +'/gifs/random',
    params:{
        api_key: 'dc6zaTOxFJmzC',
        q:null
      }
  }).then(function(response){
    console.log(response);
    ctrl.imageUrl = response.data.data.image_url;
  }).catch(function(err){
    console.log('Error requesting data from server', err);
  });
}

ctrl.searchForGif = function(){
    $http({
    method: 'GET',
    url: API +'/gifs/search',
    params:{
        api_key: 'dc6zaTOxFJmzC',
        q:ctrl.searchQuery
      }
  }).then(function(response){
    console.log(response.data.data);
    ctrl.searchGifs = response.data.data;
  }).catch(function(err){
    console.log('Error requesting data from server', err);
  });
}


});
