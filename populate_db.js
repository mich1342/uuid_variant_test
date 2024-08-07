var PGConnector = require("./pg_connector");
const dotenv = require("dotenv");
dotenv.config();
const iter_num = parseInt(process.env.ITERATION_NUM) || 10000;
for (let i = 0; i < iter_num; i++) {
  PGConnector.query(
    `INSERT INTO test_data (test_val) VALUES ($1)`,
    [i],
    (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`${i}. \tSuccess`);
        if (i >= iter_num - 1) {
          process.exit();
        }
      }
    }
  );
}
