var Sequelize = require('sequelize');
const db = require('./db').db;

const Booking = db.define('booking', {
  type: Sequelize.STRING,
  venue: Sequelize.INTEGER
});

module.exports = Booking;
