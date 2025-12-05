import { db } from "./db.js";

const q = "DELETE FROM users WHERE name IS NULL OR name = ''";

db.query(q, (err, data) => {
    if (err) {
        console.error(err);
    } else {
        console.log("Deleted invalid users:", data.affectedRows);
    }
    process.exit();
});
