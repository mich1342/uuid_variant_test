var PGConnector = require("./pg_connector");

var fs = require("fs");
var sql_query = fs.readFileSync("./initiate_db.sql").toString();
PGConnector.query(sql_query, [], (err, res) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Success");
    process.exit();
  }
});
