var db = require('../db');

module.exports = {
  getMeta: function (callback) {
    var queryStr = 'select * from reviews limit 10';
    db.query(queryStr, function(err, results) {
      callback(err, results);
    });
  },
};
