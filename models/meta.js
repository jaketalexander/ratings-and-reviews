var db = require('../db');

module.exports = {
  getMeta: function (id, callback) {
    const queryStr = `
    SELECT json_build_object(
      'product_id', ${id}::TEXT,
      'ratings',
      (SELECT json_object_agg(rating, count) FROM ratings WHERE product_id = $1),
      'recommended',
      (SELECT json_object_agg(recommend, count) FROM recommended WHERE product_id = $1),
      'characteristics',
      (SELECT json_object_agg(name, json_build_object(
        'id', characteristic_id,
        'value', values::TEXT))
        FROM agg_characteristics WHERE product_id = $1)
    )`;

    const queryArgs = [id];

    db.query(queryStr, queryArgs, function(err, results) {
      callback(err, results);
    });
  },
};
