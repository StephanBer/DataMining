var Twit = require('twit')

var T = new Twit({
        consumer_key: 'SNewHsSpDg3MEzbDIzEeCWXxH',
        consumer_secret: 'R2lC8JMVPGEJpF75Fg5qXMLX9SwdgaSIMGPkxGBYceUQigDgxr',
        access_token: '515784347-rBxjQre9Rr9lhunbj62I63f4j3H2PKkyZiSpI1Bz',
        access_token_secret: 'APx2Prh8pxeXTeIvGdFbuWNb3nz0DjTtze3ozOX2o4IFK'
})

var redis = require("redis"),
    client = redis.createClient();

// if you'd like to select database 3, instead of 0 (default), call
// client.select(3, function() { /!* ... *!/ });

client.on("error", function (err) {
    console.log("Error " + err);
});


write();

read();

setTimeout(function() {client.quit();}, 1000);

//
//  search twitter for all tweets containing the word 'banana' since July 11, 2011
//
function write() {
    T.get('search/tweets', { q: 'banana since:2017-07-11', count: 2 }, function(err, data, response) {

        //console.log(data.statuses.length);

        for(var i = 0; i < data.statuses.length; i++){
            console.log(data.statuses[i]);
            client.set("twit" + i, JSON.stringify(data.statuses[i].created_at));
            //client.set("twit" + i, "test" + i);
        }
    });
}


function read() {
    for(var i = 0; i < 10; i++) {
        client.get("twit" + i, function (err, reply) {
            if(reply != null){
                console.log(reply);
                console.log();
            }
        });
    }
}



/*client.hset("hash key", "hashtest 4", "some value", redis.print);
client.hkeys("hash key", function (err, replies) {
    console.log(replies.length + " replies:");
    replies.forEach(function (reply, i) {
        console.log("    " + i + ": " + reply + " | " + reply);
    });
    client.quit();
});*/

//console.log(data.statuses[i].user.id;
//console.log(data.statuses[i].user.name;