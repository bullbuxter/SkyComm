var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var work = require('./functions');
var mailer = require('./mailer');
mongoose.connect('mongodb://localhost/DB');
var schema = new mongoose.Schema({
    fname: String,
    lname: String,
    email : String,
    passwd : String,
    isActive: Boolean,
    actCode: String,
    phone: String,
    pincode: String,
    address: String,
    dataByTotal: Number,
    dataByInterval: Array,
    products: Array
});
var users = mongoose.model('users', schema);
module.exports = {
    createUser: function(email, passwd, fname, lname, phone, callback) {
        var code = work.wrapCode(email);
        new users({
            fname: fname,
            lname: lname,
            email: email,
            passwd: passwd,
            isActive: false,
            actCode: code,
            phone: phone
        }).save(function (err, doc) {
                if (err) {
                    console.log(err);
                    callback(false);
                }
                else {
                    //mailer.sendMail(email, code);
                    callback(true);
                }
            });
    },
    updateUser: function(id, fname, lname, phone, pincode, address, callback) {
        users.update({_id: id}, {$set:{fname: fname, lname: lname, phone: phone, pincode: pincode, address: address}}, function(err) {
           if(err) {
               console.log(err);
               return callback(false);
           }
            callback(true);
        });
    },
    updateEmail: function(id, email) {
        var code = work.wrapCode(email);
        users.update({_id: id}, {$set:{email: email, isActive: false, actCode: code}}, function(err) {
            if (err)
                console.log(err + '\nfor user ' + id);
           // else mailer.sendMail(email, code);
        });
    },
    updatePasswd: function(id, passwd) {
      users.update({_id: id}, {$set:{passwd: passwd}}, function(err){
         if(err)
         console.log(err + '\nfor user ' + id);
      });
    },
    toActivate: function(email, code, callback) {
        users.find({email: email, actCode: code}, function (err, doc) {
            if (err) {
                console.log(err);
                return callback(err);
            } else if(doc[0]) {
                users.update({_id: doc[0]._id}, {$set: {isActive: true}}, function (err) {
                    if (err) {
                        console.log(err);
                        return callback(err);
                    }
                    callback(null, true);
                });
            } else
                callback(null, false);
        });
    },
    updateDataTotal: function (name, data, days) {
        users.find({name: name}, function (err, doc) {
            if (err) {
                console.log(err);
                return;
            }
            users.update({_id: doc[0]._id}, {$set: {dataByTotal: (doc[0].dataByTotal + data)}}, function (err) {
                if (err)
                    console.log(err);
            });
        });
    },
    updateDataInterval: function(name, data) {
        users.find({name: name}, function (err, doc) {
            if (err) {
                console.log(err);
                return;
            }
            if (doc[0].dataByInterval.length > 15) {
                users.update({_id: doc[0]._id}, {$pop:{dataByInterval: -1}}, function(err) {
                    if (err)
                        console.log(err);
                });
            }
            users.update({_id: doc[0]._id}, {$push:{dataByInterval: data}}, function(err) {
                if (err)
                    console.log(err);
            });
        });
    },
    getUserData: function (email, callback) {
        users.find({email: email}, function (err, doc) {
            if (err) {
                console.log(err);
                return callback(err);
            }
            callback(null, doc[0]);
        });
    }
};
process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected on app termination');
        process.exit(0);
    });
});