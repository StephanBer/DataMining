// Alex


write();

read();

setTimeout(function() {client.quit();}, 1000);


/*
T:get retourne les tweets
on les stock ensuite dans la base redis
since: year-month-day
*/
function write() {
    T.get('search/tweets', { q: 'citroen since:2017-10-24', count: 2 }, function(err, data, response) {

        //console.log(data.statuses.length);

        for(var i = 0; i < data.statuses.length; i++){
            console.log(data.statuses[i]);
            client.set("twit" + i, JSON.stringify(data.statuses[i].created_at));
            //client.set("twit" + i, "test" + i);
        }
    });
}

// lis les tweets dans la base
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

/*
console.log(data.statuses[i].user.id);
console.log(data.statuses[i].user.name);
console.log(data.statuses[i].text);
console.log(data.statuses[i].created_at);

steamer tokenizer stopword

nltk
https://github.com/ttezel/bayes --> emotion analyser
*/
