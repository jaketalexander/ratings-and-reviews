var db = require('../db');

module.exports = {
  getReviews: function (params, callback) {
    let count = params.count || 5;
    let offset = params.page || 0;
    const queryStr = `select * from reviews where product_id = ${params.product_id} limit ${count} offset ${offset}`;

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
  helpful: function (id, callback) {
    var queryStr = `UPDATE reviews SET helpfulness = helpfulness + 1 WHERE review_id = ${id}`;
    db.query(queryStr, function(err, results) {
      callback(err, results);
    });
  },
  report: function (id, callback) {
    var queryStr = `UPDATE reviews SET reported = true WHERE review_id = ${id}`;
    db.query(queryStr, function(err, results) {
      callback(err, results);
    });
  },
};
