import { db } from "./db.js";
import bcrypt from "bcryptjs";

const users = [
    { name: "Jane Doe", username: "janedoe", email: "jane@test.com" },
    { name: "John Smith", username: "johnsmith", email: "john@test.com" },
    { name: "Alice Wonderland", username: "alice", email: "alice@test.com" },
    { name: "Bob Builder", username: "bob", email: "bob@test.com" },
];

const salt = bcrypt.genSaltSync(10);
const password = bcrypt.hashSync("123456", salt);

const q = "INSERT INTO users (username, email, password, name) VALUES ?";

const values = users.map(u => [u.username, u.email, password, u.name]);

db.query(q, [values], (err, data) => {
    if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            console.log("Users already exist (duplicate entry). Skipping.");
        } else {
            console.error(err);
        }
    } else {
        console.log("Dummy users created!");
    }
    process.exit();
});
