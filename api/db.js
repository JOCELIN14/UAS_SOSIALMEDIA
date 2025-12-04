// api/db.js
import mysql from "mysql";

export const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "uas", 
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }
  console.log("MySQL Connected!");
});