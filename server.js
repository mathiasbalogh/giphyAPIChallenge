var express = require('express');
// var index = require('./routes/index');
// var giphy = require('./routes/giphy')
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var pg = require("pg");

var config = { database: "gifSite" };

// initialize connection Pool
var pool = new pg.Pool(config);

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// app.use('/giphy', giphy);

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'public','views','index.html'));
});

app.get('/favorites', function(req, res){
  res.sendFile(path.join(__dirname, 'public','views','index.html'));
});

app.post('/favorite', function(req,res){
  pool.connect(function(err, client, done) {
    if (err) {
      console.log("Error connecting to DB", err);
      res.sendStatus(500);
      done();
    } else {

      client.query(
        "INSERT INTO favorite_gifs (favurl, comment) VALUES ($1, $2) RETURNING *;",
        [ req.body.favUrl, req.body.comment],
        function(err, result) {
          done();
          if (err) {
            console.log("Error querying DB", err);
            res.sendStatus(500);
          } else {
            console.log("Got info into DB", result.rows);
            res.send(result.rows);
          }
        }
      );
    }
  });
});

app.get('/favorite', function(req,res){
  pool.connect(function(err, client, done) {
    if (err) {
      console.log("Error connecting to DB", err);
      res.sendStatus(500);
      done();
    } else {

      client.query("SELECT * FROM favorite_gifs;", function(err, result) {
        done();
        if (err) {
          console.log("Error querying DB", err);
          res.sendStatus(500);
        } else {
          console.log("Got info from DB", result.rows);
          res.send(result.rows);
        }
      });
    }
  });
});

var port = process.env.PORT || 3000;
var server = app.listen(port, function() {
  console.log('Server listening on port', server.address().port);
});
