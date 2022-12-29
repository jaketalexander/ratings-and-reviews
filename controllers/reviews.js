var models = require('../models');

module.exports = {
  get: function (req, res) {
    models.reviews.getReviews(req.params, function(err, results) {
      if (err) {
        console.error('Unable to retrieve from the database: ', err);
        res.sendStatus(500);
      } else {
        let result = {
          product: req.params.product_id,
          page: req.params.page || 0,
          count: req.params.count || 5,
          results: results.rows,
        }
        res.json(result);
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