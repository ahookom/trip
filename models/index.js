var Sequelize = require('sequelize');
const db = require('./db').db;
const Hotel = require('./hotel');
const Place = require('./place');
const Restaurant = require('./restaurant');
const Activity = require('./activity');
const Day = require('./day');
const Booking = require('./booking');


Hotel.belongsTo(Place);
Activity.belongsTo(Place);
Restaurant.belongsTo(Place);

Booking.belongsTo(Day);
Restaurant.hasOne(Booking);
Hotel.hasOne(Booking);
Activity.hasOne(Booking);

// console.log(db);
module.exports= db;
