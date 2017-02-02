var app = angular.module('giphyApp', []);

  app.controller('GiphyController', function(GifService){
    console.log('controller loaded');
    var ctrl = this;


    ctrl.imageUrl = ' ';
    ctrl.searchQuery = ' ';
    ctrl.searchGifs = [];

// ctrl.getRandomGif = function(){
//
//     $http({
//     method: 'GET',
//     url: API +'/gifs/random',
//     params:{
//         api_key: 'dc6zaTOxFJmzC',
//         q:null
//       }
//   }).then(function(response){
//     console.log(response);
//     ctrl.imageUrl = response.data.data.image_url;
//   }).catch(function(err){
//     console.log('Error requesting data from server', err);
//   });
// }
  ctrl.getRandomGif = function(){
    GifService.getRandomGif().then(function(gifUrl){
      ctrl.imageUrl = gifUrl;
    });
  }
  ctrl.searchForGif = function(){
      GifService.searchForGif(ctrl.searchQuery).then(function(gifArray){
        ctrl.searchGifs = gifArray;
      });
  }


});
