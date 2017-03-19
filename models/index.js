var Sequelize = require('sequelize');
const db = require('./db').db;
const Hotel = require('./hotel');
const Place = require('./place');
const Restaurant = require('./restaurant');
const Activity = require('./activity');
const Day = require('./day');

Hotel.belongsTo(Place);
Restaurant.belongsTo(Place);
Activity.belongsTo(Place);

Day.hasMany(Restaurant);
Day.hasMany(Activity);
Day.hasOne(Hotel);

// console.log(db);
module.exports= db;
