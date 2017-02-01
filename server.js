var express = require('express');
// var index = require('./routes/index');
// var giphy = require('./routes/giphy')
var path = require('path');
var bodyParser = require('body-parser');
var app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// app.use('/giphy', giphy);

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, '/public/views/index.html'));
});

var port = process.env.PORT || 3000;
var server = app.listen(port, function() {
  console.log('Server listening on port', server.address().port);
});
