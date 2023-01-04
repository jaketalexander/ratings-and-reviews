var db = require('../db');

module.exports = {
  getReviews: function (req, callback) {
    const page = Number(req.page) || 1;
    const count = Number(req.count) || 5;
    const sort = req.sort || 'relevant';
    const product_id = req.product_id;
    const offset = (page - 1) * count;

    let response = {
      product: product_id,
      page: page,
      count: count,
    };

    let sortby;
    if (sort === 'newest') {
      sortby = 'date';
    }

    if (sort === 'helpful') {
      sortby = 'helpfulness'
    }

    if (sort === 'relevant') {
      sortby = 'helpfulness'
    }

    const queryReviewStirng = `
      SELECT *,
        (SELECT
            COALESCE(json_agg(json_build_object('id', id, 'photo_url', photo_url)), '[]')
        FROM photos WHERE review_id = reviews.review_id)
      AS photos FROM reviews WHERE product_id = $1
      ORDER BY ${sortby} DESC
      LIMIT $2
      OFFSET $3`;
    const queryReviewArgs = [product_id, count, offset];
    db
      .query(queryReviewStirng, queryReviewArgs)
      .then(result => response.results = result.rows)
      .then(() => callback(null, response))
      .catch(err => callback(err))
  },
  post: function (req, callback) {
    const { product_id, rating, summary, body, recommend, name, email, photos, characteristics } = req.body;
    const date = Date.now();
    const photosString = JSON.stringify(photos).split('\"').join('\'');
    const characteristic = Object.values(characteristics).reduce((acc, item) => {
      acc.ids.push(item.id);
      acc.values.push(Number(item.value));
      return acc;
    }, {ids:[], values:[]})
    // const characteristic_values = JSON.stringify(Object.values(characteristics));
    console.log(characteristic)
    const queryReviewStirng = `
      INSERT INTO reviews(product_id, rating, date, summary, body, recommend, username, email)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING review_id`;
    const queryReviewArgs = [product_id, rating, date, summary, body, recommend, name, email];
    db
      .query(queryReviewStirng, queryReviewArgs)
      .then((results) => {
        const { review_id } = results.rows[0];
        const queryPhotoStirng = `INSERT INTO photos(review_id, photo_url) VALUES ($1, unnest(ARRAY ${photosString}))`;
        const queryPhotoArgs = [review_id];
        db
          .query(queryPhotoStirng, queryPhotoArgs)
          .catch((err) => callback(err))

        const queryCharString = `
          INSERT INTO reviewcharacteristics(characteristic_id, review_id, value)
          VALUES(unnest(ARRAY ${JSON.stringify(characteristic.ids)}), $1, unnest(ARRAY ${JSON.stringify(characteristic.values)}))`;
        // const queryCharString = `
        //   INSERT INTO reviewcharacteristics(characteristic_id, review_id, value)
        //   VALUES(${characteristic.ids[0]}, $1, ${characteristic.values[0]})
        // `;
        const queryCharArgs = [review_id];
        db
          .query(queryCharString, queryCharArgs)
          .catch((err) => callback(err))
      })
      .then((result) => callback(null, result))
      .catch((err) => callback(err))
  },
  helpful: function (id, callback) {
    const queryStr = `UPDATE reviews SET helpfulness = helpfulness + 1 WHERE review_id = ${id}`;
    db
      .query(queryStr, function(err, results) {
        callback(err, results);
      });
  },
  report: function (id, callback) {
    const queryStr = `UPDATE reviews SET reported = true WHERE review_id = ${id}`;
    db
      .query(queryStr, function(err, results) {
        callback(err, results);
      });
  },
};
