var db = require('../db');

module.exports = {
  getMeta: function (id, callback) {
    const query = `SELECT count(*) FILTER (WHERE product_id = ${id.product_id} AND recommend) FROM reviews`;

    const metaObj = {};
    metaObj.product_id = id.product_id;
    metaObj.ratings = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };
    metaObj.recommended = {
      false: 0,
      true: 0,
    };
    metaObj.characteristics = {};

    Promise.all(Array.from({ length: 5 }, (_, i) => i + 1).map(num => {
      return db.query(`SELECT count(*) FROM reviews WHERE rating=${num} AND product_id = ${id.product_id}`)
        .then(res => {
          metaObj.ratings[num] = res.rows[0].count;
        });
    }))
      .then(res1 => {
        const total = Object.values(metaObj.ratings).reduce((acc, value) => {
          acc += Number(value);
          return acc;
        }, 0);
        db.query(`SELECT count(*) FILTER (WHERE product_id = ${id.product_id} AND recommend) FROM reviews`)
          .then(res => {
            metaObj.recommended.true = parseInt(res.rows[0].count);
            metaObj.recommended.false = total - res.rows[0].count;
            db.query(`SELECT characteristic_id, name FROM characteristics WHERE product_id = ${id.product_id}`)
              .then(res => {
                Promise.all(res.rows.map(char => {
                  return db.query(`SELECT value FROM reviewcharacteristics WHERE characteristic_id = ${char.characteristic_id}`)
                    .then(res => {
                      const average = res.rows.reduce((acc, value) => {
                        acc += value.value;
                        return acc;
                      }, 0);
                      metaObj.characteristics[char.name] = {
                        id: char.characteristic_id,
                        value: average / res.rows.length,
                      };
                    });
                }))
                  .then(res => {
                    callback(null, metaObj);
                  })
                  .catch(err => {
                    callback(err);
                  });
              });
          });
      });
  },
};
