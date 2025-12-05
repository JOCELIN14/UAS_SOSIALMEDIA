import { db } from "./db.js";

const q = "SELECT id, name FROM users";

db.query(q, (err, data) => {
    if (err) {
        console.error(err);
    } else {
        console.log("Current Users:", data);
    }
    process.exit();
});
