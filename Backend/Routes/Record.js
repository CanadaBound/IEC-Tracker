const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

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

// This section will help you get a single record by id
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

// This section will help you get a single record by id
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

// This section will help you get all records that match the query
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

// This section will help you create a new record for Countries collection.
recordRoutes.route("/countries").post(function (req, response) {
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
recordRoutes.route("/roi").post(function (req, response) {
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

// This section will help you update a record by id.
recordRoutes.route("/countries/:id").put(function (req, response) {
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


// This section will help you update a record by id.
recordRoutes.route("/roi/:id").put(function (req, response) {
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

// This section will help you delete a record
recordRoutes.route("/countries/:id").delete((req, response) => {
  let db_connect = dbo.getDb("IECTracker");
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect.collection("Countries").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.status(obj);
  });
});

// This section will help you delete a record
recordRoutes.route("/roi/:id").delete((req, response) => {
  let db_connect = dbo.getDb("IECTracker");
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect.collection("ROI").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.status(obj);
  });
});



module.exports = recordRoutes;