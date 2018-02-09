var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var StopWordSchema   = new Schema({
    _id: String,
    occurences: Number,
    hashtag: Boolean
});

module.exports = mongoose.model('StopWord', StopWordSchema);