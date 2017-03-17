var Sequelize = require('sequelize');
const db = require('./db').db;


const Hotel = db.define("hotel", {
    name: {
        type: Sequelize.STRING
    },
    num_stars: {
        type: Sequelize.FLOAT
        // validate: {
        //     min: 1,
        //     max: 5
        // }
    },
    amenities: {
        type: Sequelize.STRING
    }
}, {});

module.exports = Hotel;