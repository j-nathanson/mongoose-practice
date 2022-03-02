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
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// if connected
connect.then(() => {

    console.log('Connected correctly to server');

    // Attempt to create a new document from the model and hard code in values to properties. Automatically saves it to db
    Campsite.create({
        name: 'React Lake Campground',
        description: 'test'
    })
        // attempt to save to the database, return a promise
        .then(campsite => {
            // log what has been saved
            console.log(campsite);


            // attempt to update the campsite by id, the property to update, new:true. returns the new updated doc
            return Campsite.findByIdAndUpdate(campsite._id, {
                $set: { description: 'Updated Test Document' }
            }, {
                new: true
            });
        })
        // from the new updated document
        .then(campsite => {
            console.log(campsite);

            // find the subdocument and can push and object to the array
            campsite.comments.push({
                rating: 5,
                text: 'What a magnificent view!',
                author: 'Tinus Lorvaldes'
            });

            // attempt to save/update
            return campsite.save();
        })
        .then(campsite => {
            // if successful return the array of objects
            console.log(campsite);
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