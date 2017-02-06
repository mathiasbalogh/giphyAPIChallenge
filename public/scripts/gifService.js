app.service('GifService', function($http){


  var API = 'http://api.giphy.com/v1';

  this.getRandomGif = function(){
  return $http({
  method: 'GET',
  url: API +'/gifs/random',
  params:{
      api_key: 'dc6zaTOxFJmzC',
      q:null,
    }
}).then(function(response){
  console.log(response);
  return response.data.data.image_url;
}).catch(function(err){
  console.log('Error requesting data from server', err);
});
}
this.searchForGif = function(query){
    return $http({
    method: 'GET',
    url: API +'/gifs/search',
    params:{
        api_key: 'dc6zaTOxFJmzC',
        q:query,
        limit:'1'
      }
  }).then(function(response){
    console.log(response.data.data);
    return response.data.data[0].images.original.url;
  }).catch(function(err){
    console.log('Error requesting data from server', err);
  });
}

this.favoriteThisGif = function(imageUrl, commentF){
  return $http({
  method: 'POST',
  url: '/favorite',
  data: {
    favUrl: imageUrl,
    comment: commentF
  }
}).then(function(response){
  console.log('Success');
}).catch(function(err){
  console.log('Error adding data from server', err);
});
}

this.getFavoriteGifs = function(){
  return $http({
  method: 'GET',
  url: '/favorite'
}).then(function(response){
  console.log('Success', response.data);
  return response.data;
}).catch(function(err){
  console.log('Error adding data from server', err);
});
}

this.deleteFav = function(buttonID){
  console.log(buttonID);
  return $http({
  method: 'DELETE',
  url: '/favorite/'+ buttonID
}).then(function(response){
  console.log('Success', response);
  return response;
}).catch(function(err){
  console.log('Error deleting data from server', err);
});
}
this.updateComment = function(gifID, commentF){
  return $http({
  method: 'PUT',
  url: '/favorite',
  data: {
    id: gifID,
    comment: commentF
  }
}).then(function(response){
  console.log('Success');
  return response;
}).catch(function(err){
  console.log('Error adding data from server', err);
});
}

});//end app.service
