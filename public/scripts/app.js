var app = angular.module('giphyApp', ['ngRoute']);

  app.config(function($routeProvider, $locationProvider){
    $routeProvider.when('/', {
      templateUrl: 'views/pages/home.html',
      controller: 'GiphyController as gifCtrl'
    }).when('/favorites', {
      templateUrl: 'views/pages/favorites.html',
      controller: 'GiphyController as gifCtrl'
    });
    $locationProvider.html5Mode(true);
  });

  app.controller('GiphyController', function(GifService){
    console.log('controller loaded');
    var ctrl = this;

    ctrl.comment = '';
    ctrl.imageUrl = ' ';
    ctrl.searchQuery = ' ';
    ctrl.favGifs = [];
    ctrl.numOfFavs = '';
    ctrl.buttonID = '';

    GifService.getRandomGif().then(function(gifUrl){
      ctrl.imageUrl = gifUrl;
    });

    GifService.getFavoriteGifs().then(function(favArray){
      ctrl.favGifs = favArray;
      ctrl.numOfFavs = favArray.length;
      console.log('this is the favArray', favArray);
    });


  ctrl.getRandomGif = function(){ //pull random gif url from the giphy api and display it on DOM
    GifService.getRandomGif().then(function(gifUrl){
      ctrl.imageUrl = gifUrl;
    });
  }
  ctrl.searchForGif = function(){ //query the giphy api for gifs based on input field entry
      GifService.searchForGif(ctrl.searchQuery).then(function(gifArray){
        ctrl.imageUrl = gifArray;
      });
  }
  ctrl.favoriteThisGif = function(){ //query the giphy api for gifs based on input field entry
      GifService.favoriteThisGif(ctrl.imageUrl, ctrl.comment).then(function(){
        console.log('You favorited this Gif!');
      });
      GifService.getFavoriteGifs().then(function(favArray){
        ctrl.favGifs = favArray;
        ctrl.numOfFavs = favArray.length;
        console.log('this is the favArray', favArray);
      });
  }
  // ctrl.deleteFav = function(){
  //   GifService.deleteFav(ctrl.buttonID).then(function(buttonID){
  //     console.log(buttonID);
  //   })
  // }

});
