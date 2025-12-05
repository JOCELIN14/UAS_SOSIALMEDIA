import { db } from "./api/db.js";

const userId = 1; // Assuming user with ID 1 exists (created by register) - wait, I don't know if user 1 exists.
// I should first get a user or create one.

// Let's generic user creation too.
const qUser = "INSERT INTO users (username, email, password, name) VALUES ('testuser', 'test@test.com', 'hash', 'Test User') ON DUPLICATE KEY UPDATE id=id";
const qPost = "INSERT INTO posts (`desc`, `img`, `userId`, `createdAt`) VALUES ('This is a dummy post created by the assistant to verify the feed.', 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', ?, NOW())";

db.query(qUser, (err, result) => {
    if (err) {
        console.error("Error creating/getting user:", err);
        process.exit(1);
    }
    const uid = result.insertId || 1; // If duplicate, insertId might be 0, so assume 1 or fetch.
    // Actually ON DUPLICATE doesn't return ID easily if not inserted.
    // Let's just select first user.

    db.query("SELECT id FROM users LIMIT 1", (err, users) => {
        if (err || users.length === 0) {
            console.error("No users found. Please register a user in the app first.");
            process.exit(1);
        }
        const targetUserId = users[0].id;

        db.query(qPost, [targetUserId], (err, data) => {
            if (err) {
                console.error(err);
            } else {
                console.log("Dummy post created!");
            }
            process.exit();
        });
    });
});
