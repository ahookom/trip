
const router = require('express').Router();
const db = require('../models');

const Restaurants = db.models.restaurant;
const Activities = db.models.activity;
const Places = db.models.place;
const Hotels = db.models.hotel;
const Days = db.models.day;

router.get('/', function(req, res, next) {
  // Days.all()
  // .then(function(days){
  //   console.log(days);
  //   // if(days.length)res.redirect('/' + days.length);
  //   return
  Days.sync({force: true})
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
  Restaurants.all().
  then(function(restaurants){
    res.render('restaurants', {restaurants});
  }).
  catch(next);
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

router.get('/:day', function(req,res,next){
  const currentDay = req.params.day;
  const restaurants = currentDay.getRestaurants;
  const hotel = currentDay.getHotel;
  const activities = currentDay.getActivities;
  Days.all()
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
