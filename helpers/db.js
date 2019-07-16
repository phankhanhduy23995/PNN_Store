const mongoose = require('mongoose');
// let gracefulShutdown;
const dbURI = 'mongodb://localhost/pnn_store';
const mongo_connection = process.env.MONGO_CONNECTION || dbURI;

mongoose.set('useCreateIndex', true);
mongoose.connect(mongo_connection, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false });

// CONNECTION EVENTS
mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ', mongo_connection);
});
mongoose.connection.on('error', function (err) {
    console.log('Mongoose connection error: ', err);
});
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
});
