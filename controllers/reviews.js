var models = require('../models');

module.exports = {
  get: function (req, res) {
    models.reviews.getReviews(req.params, function(err, results) {
      if (err) {
        console.error('Unable to retrieve from the database: ', err);
        res.sendStatus(500);
      } else {
        res.status(200).send(results);
      }
    });
  },
  post: function (req, res) {
    models.reviews.post(req, function(err, results) {
      if (err) {
        console.error('Unable to retrieve from the database: ', err);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    });
  },
  helpful: function (req, res) {
    models.reviews.helpful(req.params.review_id, function(err, results) {
      if (err) {
        console.error('Unable to retrieve from the database: ', err);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    });
  },
  report: function (req, res) {
    models.reviews.report(req.params.review_id, function(err, results) {
      if (err) {
        console.error('Unable to report: ', err);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    });
  },
};