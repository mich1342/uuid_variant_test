var PGConnector = require("./pg_connector");

PGConnector.query(
  `
  SELECT
    COUNT(DISTINCT test_uuid) as unique_uuid,
    COUNT(DISTINCT test_nanoid) as unique_nanoid,
    COUNT(DISTINCT test_short_uuid) as unique_short_uuid,
    (SELECT COUNT(test_equals) FROM test_data WHERE test_equals = false) as invalid_uuid_conversion
  FROM test_data;
  `,
  [],
  (err, res) => {
    if (err) {
      console.log(err);
    } else {
      let val = res.rows[0];
      console.log(val);
      process.exit();
    }
  }
);
