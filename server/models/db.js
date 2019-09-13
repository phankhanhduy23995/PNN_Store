const mongoose = require('mongoose');
// let gracefulShutdown;
const dbURI = 'mongodb://localhost/pnn_store';
const mongo_connection = process.env.MONGO_CONNECTION || dbURI;
const log4js = require('log4js');
const logger = log4js.getLogger('server');

mongoose.set('useCreateIndex', true);
mongoose.connect(mongo_connection, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false });

// CONNECTION EVENTS
mongoose.connection.on('connected', function () {
    logger.info('Mongoose connected to ', mongo_connection);
});
mongoose.connection.on('error', function (err) {
    logger.info('Mongoose connection error: ', err);
});
mongoose.connection.on('disconnected', function () {
    logger.info('Mongoose disconnected');
});

// BRING IN YOUR SCHEMAS & MODELS
require('./category_model');
require('./role_model');
require('./user_model');

/**
 * Insert collection from json file
 */
// B1: cd C:\Program Files\MongoDB\Server\4.0\bin
// B2: .\mongoimport.exe --db <db_name> --collection <collection_name> --jsonArray --file <access_to_json_file>
