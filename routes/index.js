var express = require('express');
var router = express.Router();

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv:user:user@cluster0-ilsrc.mongodb.net/test?retryWrites=true';
/* GET home page. */
router.get('/', function (req, res, next) {
    MongoClient.connect(url, (err, database) => {
        if (err) {
            res.render('error', {message: 'Error', error: err});
            return console.log(err);
        }
        const db = database.db("usersdb");
        const collection = db.collection("users");
        collection.find().toArray(function (err, results) {
            if (err) {
                res.render('error', {message: 'Error', error: err});
                return console.log(err);
            }
            res.render('index', {title: 'Persons', data: results});
            database.close();
            return true;
        });
    });
});

module.exports = router;
