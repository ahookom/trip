var Sequelize = require('sequelize');
const db = require('./db').db;


const Day = db.define("day", {
    ofTrip: {
        type: Sequelize.INTEGER
    },
});

module.exports = Day;
