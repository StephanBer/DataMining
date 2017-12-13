// Loading modules
var redis = require('./app/redisModule');
var tweeter = require('./app/tweeterModule');
var classification = require('./app/classificationModule');

tweeter.getTweets('citroen', '2017-10-24')
    .then(function (tweets) {
        console.log(tweets[0].user.screen_name);
        console.log(tweets[0].text);
        console.log(tweets[0].created_at);
        console.log(tweets[0].lang);
        redis.write(tweets);
    })


setTimeout(function() {redis.close}, 2000);


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
