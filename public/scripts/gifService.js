app.service('GifService', function($http){


  var API = 'http://api.giphy.com/v1';

  this.getRandomGif = function(){
  return $http({
  method: 'GET',
  url: API +'/gifs/random',
  params:{
      api_key: 'dc6zaTOxFJmzC',
      q:null
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
        q:query
      }
  }).then(function(response){
    console.log(response.data.data);
    return response.data.data;
  }).catch(function(err){
    console.log('Error requesting data from server', err);
  });
}

});
