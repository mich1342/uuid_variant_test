var PGConnector = require("./pg_connector");
const dotenv = require("dotenv");
dotenv.config();
const iter_num = parseInt(process.env.ITERATION_NUM) || 10000;

PGConnector.query(`SELECT * FROM test_data`, [], (err, res) => {
  if (err) {
    console.log(err);
  } else {
    let val = res.rows;
    val.forEach((x, id) => {
      console.log(
        `${id}\t${x.test_uuid}\t${x.test_nanoid}\t${x.test_short_uuid}\t${x.test_equals}`
      );
      if (id >= iter_num - 1) {
        process.exit();
      }
    });
  }
});
