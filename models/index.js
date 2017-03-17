var Sequelize = require('sequelize');
const db = require('./db').db;
const Hotel = require('./hotel');
const Place = require('./place');
const Restaurant = require('./restaurant');
const Activity = require('./activity');

Hotel.belongsTo(Place);
Restaurant.belongsTo(Place);
Activity.belongsTo(Place);

// console.log(db);
module.exports= db;