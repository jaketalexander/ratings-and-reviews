var db = require('../db');

module.exports = {
  getReviews: function (callback) {
    var queryStr = 'select * from reviews limit 10';
    db.query(queryStr, function(err, results) {
      callback(err, results);
    });
  },
  post: function (callback) {
    var queryStr = 'select * from reviews limit 10';
    db.query(queryStr, function(err, results) {
      callback(err, results);
    });
  },
  helpful: function (callback) {
    var queryStr = 'select * from reviews limit 10';
    db.query(queryStr, function(err, results) {
      callback(err, results);
    });
  },
  report: function (callback) {
    var queryStr = 'select * from reviews limit 10';
    db.query(queryStr, function(err, results) {
      callback(err, results);
    });
  },
};
