var models = require('../models');

module.exports = {
  get: function (req, res) {
    models.reviews.getReviews(function(err, results) {
      if (err) {
        console.error('Unable to retrieve from the database: ', err);
        res.sendStatus(500);
      } else {
        res.json(results);
      }
    });
  },
  post: function (req, res) {
    var params = [req.body];
    models.reviews.post(function(err, results) {
      if (err) {
        console.error('Unable to retrieve from the database: ', err);
        res.sendStatus(500);
      } else {
        res.json(results);
      }
    });
  },
  helpful: function (req, res) {
    models.reviews.helpful(function(err, results) {
      if (err) {
        console.error('Unable to retrieve from the database: ', err);
        res.sendStatus(500);
      } else {
        res.json(results);
      }
    });
  },
  report: function (req, res) {
    models.reviews.report(function(err, results) {
      if (err) {
        console.error('Unable to retrieve from the database: ', err);
        res.sendStatus(500);
      } else {
        res.json(results);
      }
    });
  },
};