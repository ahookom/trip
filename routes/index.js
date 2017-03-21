
const router = require('express').Router();
const db = require('../models');

const Restaurants = db.models.restaurant;
const Activities = db.models.activity;
const Places = db.models.place;
const Hotels = db.models.hotel;
const Days = db.models.day;
const Bookings = db.models.booking;

router.get('/', function(req, res, next) {
  Days.sync()
  .then(function(){
    return Bookings.sync({force: true });
  })
  .then(function(){
    return Days.sync({force: true});
  })
  .then(function(){
    return Days.create({ofTrip: 1})
  })
  .then(function(){
    res.redirect('/1')})
  .catch(next);
})
//Should fix newday button to send via "post" but until we do ...

router.get('/newDay', function(req,res,next){
  let newTripLength = 0;
  Days.all()
  .then(function(result){
    newTripLength = result.length+1;
    return Days.create({
    ofTrip : newTripLength
    });
  })
  .then(function(){
    res.redirect('/'+newTripLength);
  })
  .catch(next);
})

router.get('/restaurants/', function(req, res, next){

})

router.get('/hotels/', function(req, res, next){
  Hotels.all().
  then(function(hotels){
    res.render('hotels', {hotels});
  }).
  catch(next);
})

router.get('/activities/', function(req, res, next){
  Activities.all().
  then(function(activities){
    res.render('activities', {activities});
  }).
  catch(next);
})

router.get('/:day/restaurants',function(req,res,next){
  Restaurants.all().
  then(function(restaurants){
    res.render('restaurants', {restaurants});
  }).
  catch(next);
})

//for handling reqs from the "add" button on the restaurants page
router.post('/:day/restaurants/:restaurantId/:restaurantName/',function(req,res,next){
  const day= req.params.day;
  const venue = req.params.restaurantName;
  const restId = req.params.restaurantId;

  let newBooking = Bookings.build({
    type: 'restaurant',
    venue: venue
  });
  // newBooking.setDay(day);
  // newBooking.setRestaurant(restId);
  console.log(newBooking);
  newBooking.save()
  .then(function(savedBooking){
    return savedBooking.setRestaurant(restId);
  })
  .then(function(){
    res.redirect('/' + day);
  })
  .catch(next);
})

router.get('/:day', function(req,res,next){
  const currentDay = req.params.day;
  const hotel = currentDay.getHotel;
  const activities = currentDay.getActivities;
  let restaurants = [];
  Bookings.findAll({
    where: {
      type: 'restaurant'
    }
  })
  .then(function(result){
    console.log(result);
    restaurants = result;
    return Days.all();
  })
  .then(function(result){
    const tripLength = result.length;
    let days = [];
    for(let i=1;i<=tripLength;i++){
      days.push(i);
    }
    console.log({currentDay, days, restaurants, hotel, activities});
    res.render('index', {currentDay, days, restaurants, hotel, activities});
  })
  .catch(next);

})

module.exports = router;
