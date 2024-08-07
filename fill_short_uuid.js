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
      const short_uuid = translator.fromUUID(val.test_uuid);
      PGConnector.query(
        `UPDATE test_data SET test_short_uuid = $1 WHERE test_uuid::TEXT LIKE $2`,
        [short_uuid, val.test_uuid],
        (err1, res1) => {
          console.log(
            `${id}\t\t ${val.test_uuid} \t ${translator.fromUUID(
              val.test_uuid
            )}`
          );
          if (id >= iter_num - 1) {
            process.exit();
          }
        }
      );
    });
  }
});
