var PGConnector = require("./pg_connector");
const dotenv = require("dotenv");
dotenv.config();
const iter_num =10000;

var short = require("short-uuid");
const translator = short();

for (let i = 0; i < iter_num; i++) {
  PGConnector.query(
    `INSERT INTO test_data (test_val) VALUES ($1) RETURNING test_uuid`,
    [i],
    (err, res) => {
      if (err) {
        console.log(err);
      } else {
        let val = res.rows[0];
        const short_uuid = translator.fromUUID(val.test_uuid);
        PGConnector.query(
          `UPDATE test_data SET test_short_uuid = $1 WHERE test_uuid::TEXT LIKE $2 RETURNING *`,
          [short_uuid, val.test_uuid],
          (err1, res1) => {
            let val1 = res1.rows[0];
            const recovered_uuid = translator.toUUID(val1.test_short_uuid);
            let evaluation = false;
            if (recovered_uuid === val1.test_uuid) {
              evaluation = true;
            }
            PGConnector.query(
              `UPDATE test_data SET test_equals = $1 WHERE test_uuid::TEXT LIKE $2`,
              [evaluation, val.test_uuid],
              (err2, res2) => {
                // console.log(`${i}`);
                if (i >= iter_num - 1) {
                  process.exit();
                }
              }
            );
          }
        );
      }
    }
  );
}
