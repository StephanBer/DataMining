var redis = require("redis");
var client = redis.createClient();

client.on("error", function (err) {
    console.log("Error " + err);
});


/*
Stoque les tweets dans redis
*/
function write(statuses) {

        //console.log(data.statuses.length);

        for(var i = 0; i < statuses.length; i++){
            client.set("twit" + i, JSON.stringify(statuses[i]));
        }
}

// lit les tweets dans la base
function read() {
    for(var i = 0; i < 10; i++) {
        client.get("twit" + i, function (err, reply) {
            if(reply != null){
                var twit = JSON.parse(reply);
                console.log(twit.user.screen_name);
                console.log(twit.text);
                console.log(twit.created_at);
                console.log(twit.lang);
                console.log();
            }
        });
    }
}

function close() {
    client.quit();
}

module.exports = {
    write: write,
    read: read,
    close: close
};