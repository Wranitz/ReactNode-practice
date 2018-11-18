var mongodb = require('mongodb');
var MongoClient =require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/';

module.exports = {
    addPost: function(title, subject, tag, user, callback) {
        MongoClient.connect(url, function(err,client) {
            var db = client.db('Blog');
            db.collection('post').insertOne({
                "title": title,
                "subject": subject,
                "tag": tag,
                "user": user,
            },function(err,result){
                assert.equal(err,null);
                console.log("Saved the blog post");
                if(err == null){
                    callback(true)
                }else{
                    callback(false)
                }
            })
        })
    },
    getPost: function(callback){
        MongoClient.connect(url, function(err,client){
            var db = client.db('Blog');
            db.collection('post').find().toArray(function(err,list){
                    callback(list);
                })
            })
    },
    getPostWithId: function(id, callback) {
        MongoClient.connect(url, function(err, client){
            var db = client.db('Blog');
            db.collection('post').findOne({
                _id: new mongodb.ObjectID(id)
            },
            function(err, result){
                assert.equal(err,null);
                if(err == null) {
                    callback(result)
                }else{
                    callback(false)
                }
            });
        });
    },
    updatePost: function(id, title, subject, tag, callback){
        MongoClient.connect(url, function(err, client){
            var db = client.db('Blog');
            db.collection('post').updateOne(
                {"_id": new mongodb.ObjectId(id) },
                {$set:
                    {
                        "title": title,
                        "subject": subject,
                        "tag": tag
                    }
                }, function(err, result){
                    assert.equal(err,null);
                    if(err == null){
                        callback(true)
                    }else{
                        callback(false)
                    }
                }
            )
        })
    },
    deletePost: function(id, callback) {
        MongoClient.connect(url, function(err, client){
            var db = client.db('Blog');
            db.collection('post').deleteOne({
                _id: new mongodb.ObjectID(id)
            },
            function(err, result) {
                assert.equal(err, null);
                console.log("Deleted the post.");
                if(err == null){
                    callback(true)
                }else{
                    callback(false)
                }
            })
        })
    },
    addTag: function(tagName, callback){
        MongoClient.connect(url, function(err, client){
            var db = client.db('Blog');
            db.collection('tag').insertOne({
                "name": tagName
            }, function(err,result){
                assert.equal(err,null);
                console.log("Saved the tag details.");
                if(err == null){
                    callback(true)
                }else{
                    callback(false)
                }
            });
        });
    },
    getTag: function(callback){
        MongoClient.connect(url, function(err, client){
            var db = client.db('Blog');
            db.collection('tag').find().toArray(function (err, list){
                console.log(list)
                callback(list);
            });
        });
    }
}