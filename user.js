var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017'

module.exports = {
    signup: function(name, email, password) {
        MongoClient.connect(url,{useNewUrlParser: true }, function(err,client){
                var db=client.db('Blog')
                console.log(db)
                db.collection('user').insertOne( {
                    "name": name,
                    "password": password,
                    "email": email
                },function(err,result) {
                assert.equal(err,null);
                console.log("success")
            })
                /*assert.equal(err,null);
                console.log("Saved the user datails")*/
            })
        },
    
    validateSignIn: function(username, password, callback) {
        MongoClient.connect(url, {useNewUrlParser: true}, function(err,client){
            var db=client.db('Blog');
            db.collection('user').findOne({email: username, password: password}, function(err, result){
                if(result == null){
                    callback(false)
                }else{
                    callback(true)
                }
            })
        })
        },

    getUserInfo: function(username, callback){
        MongoClient.connect(url, function(err,client){
            var db = client.db('Blog');
            db.collection('user').findOne({
                email: username
            }, function(err,result){
                if(result == null) {
                    callback(false)
                }else{
                    console.log(result);
                    callback(result);
                }
            })
        })
    },

    updateProfile: function(name, password, username, callback){
        MongoClient.connect(url, function(err, client){
            var db = client.db('Blog');
            db.collection('user').updateOne(
                {"email": username},
                {$set:
                    {
                        "name": name,
                        "password": password
                    }
                }, function(err,result){
                    if(err == null){
                        callback(true)
                    }else{
                        callback(false)
                    }
                }
            )
        })
    }
    }
