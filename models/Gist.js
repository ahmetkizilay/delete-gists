module.exports = function (mongoose) {
    "use strict";

    var GistSchema = new mongoose.Schema({
        id: {type: String, unique: true, index: true},
        group: {type: String, unique: true}
    });

    var Gist = mongoose.model('Gist', GistSchema);

    return {
        Gist: Gist
    };
};