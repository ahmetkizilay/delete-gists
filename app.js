var https = require('https');
var async = require('async');
var cfg = require('./config');
var mongoose = require('mongoose');
var models = require('./models')(mongoose);
var Gist = models.Gist;

mongoose.connect(cfg.mongo.connection_string);

/*
  Read all the gist records from the database and delete them on GitHub Gist
  The StatusCode for successful deletion is 204
*/
Gist.Gist.find(function (err, gists) {
    if(err) {
        throw err;
    }

    async.eachSeries(gists, function (gist, done) {

        var gistDeletePostOptions = {
            host: 'api.github.com',
            port: 443,
            path: '/gists/' + gist.id,
            method: 'DELETE',
            headers: {
                'Authorization': 'token ' + cfg.github_token,
                'Content-Type': 'application/json; charset=UTF-8'
            }
        };

        var req = https.request(gistDeletePostOptions, function (res) {
            res.setEncoding('utf8');

            if(res.statusCode === 204) {
                console.log('deleted gist id: ' + gist.id);
                done();
            }
            else {
                done({statusCode: res.statusCode});
                return;
            }
        });

        req.on('error', function (err) {
            done(err);
        });

        req.end();
        
    }, function (err) {
        if(err) {
            console.log(err);
            throw err;
        }

        console.log('deleted all gists');
    });
});