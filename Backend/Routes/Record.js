const express = require("express");

//This is the authenticator that checks the cookie of a user.
const withAuth = require('../middleware');

const secret = 'ThisIsSuchASecret';
const jwt = require('jsonwebtoken');

const cookieParser = require('cookie-parser');
//Password encryption
const bcrypt = require("bcrypt");
const saltRounds = 10;

const recordRoutes = express.Router();
recordRoutes.use(cookieParser());
// This will help us connect to the database
const dbo = require("../DB/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;



// This section will help you get a list of all the country records.
recordRoutes.route("/countries").get(function (req, res) {
  let db_connect = dbo.getDb("IECTracker");
  db_connect
    .collection("Countries")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a list of all the ROI records.
recordRoutes.route("/roi").get(function (req, res) {
  let db_connect = dbo.getDb("IECTracker");
  db_connect
    .collection("ROI")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a single country record by id
recordRoutes.route("/countries/:id").get(function (req, res) {
  let db_connect = dbo.getDb("IECTracker");
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect
      .collection("Countries")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});




// This section will help you get a single roi record by id
recordRoutes.route("/roi/:id").get(function (req, res) {
  let db_connect = dbo.getDb("IECTracker");
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect
      .collection("ROI")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

// This section will help you get all ROI records that match the query
recordRoutes.route("/roi/filteredROI/:name").get(function (req, res) {
  let db_connect = dbo.getDb("IECTracker");
  let myquery = { country_name: req.params.name};
  db_connect
      .collection("ROI")
      .find(myquery)
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

// This section will help you get all Country records that match the query
recordRoutes.route("/countries/filteredCountries/:name").get(function (req, res) {
  let db_connect = dbo.getDb("IECTracker");
  let myquery = { country_name: req.params.name};
  db_connect
      .collection("Countries")
      .find(myquery)
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

// This section will help you create a new record for Admin collection.
recordRoutes.route("/admin").post(withAuth,function (req, response) {
  let db_connect = dbo.getDb("IECTracker");
  let myobj = {
    username: req.body.username,
    password: ''
  };
  bcrypt.hash(req.body.password, saltRounds,
    function(err, hash){
      if(err){
        console.log(err);
      }else{
        myobj.password = hash;
        
        db_connect.collection("Admin").insertOne(myobj, function (err, res) {
          if (err) throw err;
          response.json(res);
        });
      }
    })
  
  
});

// This section will handle login functionality of checking and comparing user data. It uses bcrypt to compare
//the users entered password versus the one stored in the db. If it's valid, it issues a token and creates a cookie
//which expires after an hour.
recordRoutes.route("/login").post(function (req, response) {
  let db_connect = dbo.getDb("IECTracker");
  let myObj = {
    username: req.body.username
  };
  db_connect
      .collection("Admin")
      .findOne(myObj, function (err, result) {
        if (err) throw err;
        bcrypt.compare(req.body.password, result.password, (err, data)=>{
          if (err) throw err;
          if (data) {
             // Issue token
            const payload = myObj;
            const token = jwt.sign(payload, secret, {
              expiresIn: '1h'
            });
            response.cookie('token', token, { httpOnly: true, sameSit: 'strict' })
              .sendStatus(200);
        
        } else {
            console.log('fail');
        }

        });
      });
});
  


// This section will help you create a new record for Countries collection.
recordRoutes.route("/countries").post(withAuth,function (req, response) {
  let db_connect = dbo.getDb("IECTracker");
  let myobj = {
    country_name: req.body.country_name,
    country_quota: req.body.country_quota,
    country_season: req.body.country_season,
  };
  db_connect.collection("Countries").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you create a new record for ROI collection.
recordRoutes.route("/roi").post(withAuth,function (req, response) {
  let db_connect = dbo.getDb("IECTracker");
  let myobj = {
    country_name: req.body.country_name,
    country_candidates: req.body.country_candidates,
    country_permits: req.body.country_permits,
    country_invitations: req.body.country_invitations,
    country_date: req.body.country_date
  };
  db_connect.collection("ROI").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you update a record by id in countries.
recordRoutes.route("/countries/:id").put(withAuth,function (req, response) {
  let db_connect = dbo.getDb("IECTracker"); 
  let myquery = { _id: ObjectId( req.params.id )};
  let newvalues = {
    $set: {
      country_name: req.body.country_name,
      country_quota: req.body.country_quota,
      country_season: req.body.country_season,
    },
  };
  db_connect
    .collection("Countries")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});


// This section will help you update a record by id in ROI.
recordRoutes.route("/roi/:id").put(withAuth,function (req, response) {
  let db_connect = dbo.getDb("IECTracker");
  let myquery = { _id: ObjectId( req.params.id )};
  let newvalues = {
    $set: {
      country_name: req.body.country_name,
    country_candidates: req.body.country_candidates,
    country_permits: req.body.country_permits,
    country_invitations: req.body.country_invitations,
    country_date: req.body.country_date
    },
  };
  db_connect
    .collection("ROI")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// This section will help you delete a record in countries
recordRoutes.route("/countries/:id").delete(withAuth,function(req, response){
  let db_connect = dbo.getDb("IECTracker");
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect.collection("Countries").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.status(obj);
  });
});

// This section will help you delete a record in ROI
recordRoutes.route("/roi/:id").delete(withAuth, function(req, response){
  let db_connect = dbo.getDb("IECTracker");
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect.collection("ROI").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.status(obj);
  });
});

//This is used to authenticate the cookie in the front end, it requires the correct authentication to access
//so if it sends 200 it's correct.
recordRoutes.route('/auth').get(withAuth, function (req, res){
  res.sendStatus(200);
});

//Handles log out, replaces the existing cookie with an empty one that expires in a second
recordRoutes.route('/logout').get(function(req, res){
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 1000),
    httpOnly: true});
  res.status(200).json({success: true, message: 'User logged out successfully' });
});


module.exports = recordRoutes;