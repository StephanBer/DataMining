var Twit = require('twit');

var T = new Twit({
    consumer_key: 'SNewHsSpDg3MEzbDIzEeCWXxH',
    consumer_secret: 'R2lC8JMVPGEJpF75Fg5qXMLX9SwdgaSIMGPkxGBYceUQigDgxr',
    access_token: '515784347-rBxjQre9Rr9lhunbj62I63f4j3H2PKkyZiSpI1Bz',
    access_token_secret: 'APx2Prh8pxeXTeIvGdFbuWNb3nz0DjTtze3ozOX2o4IFK'
});

function getTweets() {
    T.get('search/tweets', { q: 'citroen since:2017-10-24', count: 2 }, function(err, data, response) {
        return data;
    });
}