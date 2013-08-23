var async = require('async');
var mongoose = require('mongoose');
var models = require('./models')(mongoose);
var Gist = models.Gist;

mongoose.connect('mongodb://localhost/rssfeedtracker');

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
                'Authorization': 'token ' + '',
                'Content-Type': 'application/json; charset=UTF-8'
            }
        };

        var req = http.request(gistDeletePostOptions, function (res) {

        });
        
    }, function (err) {
        if(err) {
            throw err;
        }

        console.log('completed');
    });
});