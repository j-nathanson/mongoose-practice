// import mongoose api and our campsite model
const mongoose = require('mongoose');
const Campsite = require('./models/campsite');

// location of our mongodb server
const url = 'mongodb://localhost:27017/nucampsite';
// attempt to connect to db server, is a mongose wrapper around mongodb connect methods
// config
// Set to deal with deprication warnings
// returns a promise
const connect = mongoose.connect(url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// if connected
connect.then(() => {

    console.log('Connected correctly to server');

    // create a new document from the model and hard code in values to properties
    const newCampsite = new Campsite({
        name: 'React Lake Campground',
        description: 'test'
    });

    // attempt to save to the database, return a promise
    newCampsite.save()
        .then(campsite => {
            // log what has been saved
            console.log(campsite);
            // attempt to display all of the docs based on this model return promise
            return Campsite.find();
        })
        .then(campsites => {
            // if successful return the array of objects
            console.log(campsites);
            // attempt to delete all documents that are based on this model
            return Campsite.deleteMany();
        })
        .then(() => {
            // attempt to close the connection between the db server and backend
            return mongoose.connection.close();
        })
        .catch(err => {
            console.log(err);
            mongoose.connection.close();
        });
});