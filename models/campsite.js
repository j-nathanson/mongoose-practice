const mongoose = require('mongoose');
// shorthand to the mongoose scheme function
const Schema = mongoose.Schema;


// schema represents the structure of a particular document, either completely or just a portion of the document

// new schema for documents storing comments data for a specific campsite. doc within a doc. objects within an object
const commentSchema = new Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});



// creating a stucture for the 'campsite' document
// each doc required to have 3 properties, no 2 docs can have the same name. campsites can have comments property to store the comments in an array. Comments added must follow this stucture
const campsiteSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    comments: [commentSchema]
}, {
    // auto add 2 properties to schema createdApp updatedApp properties managed by mongoose
    timestamps: true
});

// conects schema to collection in the data base
// first argument name of the collection
// will look for the lower case plural version of this name
// second arg the schema for how the data will look like
const Campsite = mongoose.model('Campsite', campsiteSchema);

// export
module.exports = Campsite;