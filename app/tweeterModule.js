var Twit = require('twit');
var twitterConfig = require('../twitterConfig');

var T = new Twit({
    consumer_key: twitterConfig.consumer_key,
    consumer_secret: twitterConfig.consumer_secret,
    access_token: twitterConfig.access_token,
    access_token_secret: twitterConfig.access_token_secret
});

/*T:get retourne les tweets
since: year-month-day*/
function getTweets(sujet, date) {
    return new Promise(function (fulfill, reject) {
        T.get('search/tweets', {q: sujet + ' since:' + date, count: 2})
            .then(function (result) {
                fulfill(result.data.statuses);
            });
    });
}

module.exports = {
    getTweets: getTweets
}