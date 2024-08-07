var PGConnector = require("./pg_connector");
var short = require("short-uuid");
const translator = short();
const dotenv = require("dotenv");
dotenv.config();
const iter_num = parseInt(process.env.ITERATION_NUM) || 10000;

PGConnector.query(`SELECT * FROM test_data`, [], (err, res) => {
  if (err) {
    console.log(err);
  } else {
    let val = res.rows;
    val.forEach((val, id) => {
      const recovered_uuid = translator.toUUID(val.test_short_uuid);
      let evaluation = false;
      if (recovered_uuid === val.test_uuid) {
        evaluation = true;
      }
      PGConnector.query(
        `UPDATE test_data SET test_equals = $1 WHERE test_uuid::TEXT LIKE $2`,
        [evaluation, val.test_uuid],
        (err1, res1) => {
          console.log(`${id}`);
          if (id >= iter_num - 1) {
            process.exit();
          }
        }
      );
    });
  }
});
