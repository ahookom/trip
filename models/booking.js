var Sequelize = require('sequelize');
const db = require('./db').db;

const Booking = db.define('booking', {
  type: {
    type: Sequelize.ENUM('restaurant', 'activity', 'hotel'),
    allowNull: false
  },
  venue: {
    type: Sequelize.STRING,
    allowNull: false
  }
},{
  getterMethods: {
    getVenue: function(){
      if (this.type === 'restaurant') return db.models.Restaurant.findById(this.restaurantId);
      if (this.type === 'activity') return db.models.Activity.findById(this.activityId);
      if (this.type === 'hotel') return db.models.Hotel.findById(this.hotelId);
    }
  },
  instanceMethods: {
    setRestaurant: function(restId){
      this.restaurantId = restId;
      return this.restaurantId;
    }
  }
});

module.exports = Booking;
