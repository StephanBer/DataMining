// Loading modules
//var redis = require('./app/redisModule');
var tweeter = require('./app/tweeterModule');
var classification = require('./app/classificationModule');
var mongoose    = require('mongoose');
mongoose.connect('mongodb://localhost:27017/tweeter');
var db          = mongoose.connection;
var Tweet = require('./app/tweet');
var User = require('./app/user');
var stopwords = require('nltk-stopwords');
var countryLanguage = require('country-language');

/*for(var i; i<100; i++){
    redis.close;
}*/

tweeter.getTweets('citroen', '2018-02-01')
    .then(function (tweets) {

            tweets.forEach(function(tweet){
                /*console.log(tweet.user.screen_name);
                console.log(tweet.text);
                console.log(tweet.created_at);
                console.log(tweet.lang);
                console.log();*/
                console.log(tweet.lang);
                console.log(countryLanguage.getLanguage(tweet.lang.toUpperCase()).name[0]);
                var language = countryLanguage.getLanguage(tweet.lang.toUpperCase()).name[0];
                if(language) {
                    User.findById(tweet.user.id, function (err, results) {
                        if (!results) {
                            var u = createUser(tweet.user);
                            u.save();
                        }
                    });
                    Tweet.findById(tweet.id, function (err, results) {
                        if (!results) {
                            var t = createTweet(tweet);
                            t.save();
                        }
                    });
                }
            });
    });

Tweet.find(function(err, tweets) {
    tweets.forEach(function(tweet){
        /*console.log(tweet._id);
        console.log(tweet.text);*/
    });
});

function createTweet(tweet){
    var t = new Tweet();
    t._id = tweet.id;
    t.created_at = tweet.created_at,
    t.text = tweet.text,
    t.author = tweet.user.id;

    try {
        var language = countryLanguage.getLanguage(tweet.lang.toUpperCase()).name[0];
        t.stopwords = stopwords.remove(tweet.text, language.toLowerCase()).split(" ");
    }
    catch(error) {
        console.log(error);
    }

    t.lang = tweet.lang;
    return t;
}

function createUser(user){
    var u = new User();
    u._id = user.id;
    u.name = user.name;
    return u;
}


// BLABLA...
/*
console.log(data.statuses[i].user.id);
console.log(data.statuses[i].user.name);
console.log(data.statuses[i].user.screen_name);
console.log(data.statuses[i].text);
console.log(data.statuses[i].created_at);

steamer tokenizer stopword

nltk
https://github.com/ttezel/bayes --> emotion analyser
*/