var models = require('../models');

module.exports = {
  get: function (req, res) {
    models.meta.getMeta(function(err, results) {
      if (err) {
        console.error('Unable to retrieve from the database: ', err);
        res.sendStatus(500);
      } else {
        res.json(results);
      }
    });
  },
};