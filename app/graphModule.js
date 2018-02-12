// call the packages we need
var express     = require('express');        // call express
var app         = express();                 // define our app using express
var bodyParser  = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    next(); // make sure we go to the next routes and don't stop here
});

router.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', "*");
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

router.get('/miserables.json', function(req, res) {
    var options = {root: './app/graph'};
    res.sendFile('/miserables.json', options);
});

router.get('/graph.json', function(req, res) {
    var options = {root: './app/graph'};
    res.sendFile('/graph.json', options);
});

router.get('/', function(req, res) {
    //res.json({ message: 'API is running!' });
    var options = {root: './app'};
    res.sendFile('/index.html', options);
});

app.use('', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Listening on port ' + port);

module.exports = {
}