const dotenv = require("dotenv");
dotenv.config();

const { Client } = require("pg");

let client;

function connectDB() {
  client = new Client({
    user: process.env.POSTGRES_USER || "postgres",
    host: process.env.POSTGRES_IP || "localhost",
    database: process.env.POSTGRES_DB || "postgres",
    password: process.env.POSTGRES_PASS || "postgres",
    port: process.env.POSTGRES_PORT || 5432,
  });

  client.on("error", (err) => {
    console.log("Retry Connection");
    setTimeout(connectDB, 5000);
  });

  client.connect((err) => {
    if (err) {
      console.log("Retry Connection");
      client.end();
      setTimeout(connectDB, 5000);
    } else {
      console.log("Connected");
    }
  });
}

connectDB();

module.exports = client;
