import { db } from "./db.js";

const qPost = "INSERT INTO posts (`desc`, `img`, `userId`, `createdAt`) VALUES (?, ?, ?, NOW())";

const desc = 'This is a dummy post created by the AI to verify the feed.';
const img = 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

db.query("SELECT id FROM users LIMIT 1", (err, users) => {
    if (err) {
        console.error("Error getting users:", err);
        process.exit(1);
    }
    if (users.length === 0) {
        console.error("No users found! Please register a user first via the app.");
        process.exit(1);
    }
    const targetUserId = users[0].id;
    console.log("Creating post for user ID:", targetUserId);

    db.query(qPost, [desc, img, targetUserId], (err, data) => {
        if (err) {
            console.error("Error creating post:", err);
        } else {
            console.log("Dummy post created successfully!");
        }
        process.exit();
    });
});
