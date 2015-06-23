var mongoose = require('mongoose');
var count = 0;
mongoose.connect('mongodb://localhost/DB');
var schema = new mongoose.Schema({
   _id : Number,
    email : String,
    pass : String
});
var users = mongoose.model('users', schema);