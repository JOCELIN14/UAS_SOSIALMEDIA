// api/db.js
import mysql from "mysql";

// Create the connection object
export const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "uas", // <--- GANTI DI SINI
});

// Connect
db.connect((err) => {
  if (err) throw err;
  console.log("MySQL Connected!");
});
