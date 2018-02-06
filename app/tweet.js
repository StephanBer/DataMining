var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var TweetSchema   = new Schema({
    _id: String,
    created_at: String,
    text: String,
    author: {type: String, ref: 'User'},
    stopwords: [String],
    lang: String
});

TweetSchema.static('findByUser', function (user, callback) {
    return this.find({ author: user }, callback);
});

module.exports = mongoose.model('Tweet', TweetSchema);