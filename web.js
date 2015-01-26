
var path    = require('path');
var cors    = require('cors');
var express = require('express');
var json    = require('express-json');
var bodyParser    = require('body-parser');



var app = express();

// var jsonParser = bodyParser.json()
app.use(bodyParser());
app.use(cors());
app.use(require('connect-livereload')({port: 4002}));


app.use(express.static(path.join(__dirname, 'public')));

app.post('/feeds', function(req, apiRes, next){
    console.log('hello there, consuming: ' + req.body.url);


    if(!req.body.url){
        return next("you didn't provide a valid url");
    }

    var FeedParser = require('feedparser')
      , request = require('request');

    var feedReq = request(req.body.url)
      , feedparser = new FeedParser();


    feedReq.on('error', function (error) {
        console.log('error trying to consume url: ', error);
        return next("Issue consuming url : " + error);
    });
    feedReq.on('response', function (res) {
        var stream = this;

        if (res.statusCode != 200)
            return this.emit('error', new Error('Bad status code'));

        stream.pipe(feedparser);
    });


    feedparser.on('error', function(error) {
        console.log('error trying to consume url as RSS: ', error);
        return next("Issue consuming url as RSS feed: " + error);
    });

    var feed = {
        items: []
    };

    feedparser.on('readable', function() {
        var stream = this,
            meta = this.meta,
            item;

        feed.meta = meta;

        while (item = stream.read()) {
            feed.items.push(item);
        }
    });

    feedparser.on('end', function(){
        return apiRes.json(feed);
    });

});

var port = process.env.PORT || 5000

app.listen(port);


// exports.app = app;

module.exports = app;

