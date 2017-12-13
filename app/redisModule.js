var redis = require("redis");
var client = redis.createClient();

client.on("error", function (err) {
    console.log("Error " + err);
});


/*
T:get retourne les tweets
Stoque les tweets dans redis
since: year-month-day
*/
function write(statuses) {

        //console.log(data.statuses.length);

        for(var i = 0; i < statuses.length; i++){
            console.log(statuses[i]);
            client.set("twit" + i, JSON.stringify(statuses[i].created_at));
            //client.set("twit" + i, "test" + i);
        }
}

// lit les tweets dans la base
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