
const router = require('express').Router();
const db = require('../models');

const Restaurants = db.models.restaurant;
const Activities = db.models.activity;
const Places = db.models.place;
const Hotels = db.models.hotel;

router.get('/', function(req, res, next) {
  res.render('index');
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

module.exports = router;
