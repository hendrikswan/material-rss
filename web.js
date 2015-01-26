
var path    = require('path');
var cors    = require('cors');
var express = require('express');
var json    = require('express-json');

var app = express();

app.use(json());
app.use(cors());
app.use(require('connect-livereload')({port: 4002}));


app.use(express.static(path.join(__dirname, 'public')));

app.get('/json-feed', function(req, res, next){
  console.log('hello there');
});
var port = process.env.PORT || 5000

app.listen(port);


// exports.app = app;

module.exports = app;

