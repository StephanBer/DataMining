var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var StopwordSchema   = new Schema({
    _id: String,
    occurences: Number,
    hashtag: Boolean
});

module.exports = mongoose.model('Stopword', StopwordSchema);