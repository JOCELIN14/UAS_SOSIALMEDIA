import { db } from "./db.js";

// 1. Check if table exists
db.query("SHOW TABLES LIKE 'relationships'", (err, data) => {
    if (err) {
        console.error("Error checking table:", err);
        process.exit(1);
    }
    if (data.length === 0) {
        console.error("Table 'relationships' DOES NOT EXIST!");
        process.exit(1);
    }
    console.log("Table 'relationships' exists.");

    // 2. Try to insert a relationship
    // Assuming user 1 and user 2 exist (from our seed script)
    // We need to find two valid user IDs first.
    db.query("SELECT id FROM users LIMIT 2", (err, users) => {
        if (users.length < 2) {
            console.log("Not enough users to test follow.");
            process.exit(0);
        }
        const follower = users[0].id;
        const followed = users[1].id;

        console.log(`Testing follow: User ${follower} -> User ${followed}`);

        const q = "INSERT INTO relationships (`followerUserId`,`followedUserId`) VALUES (?)";
        const values = [follower, followed];

        db.query(q, [values], (err, data) => {
            if (err) {
                // If duplicate, that's fine, it means it works.
                if (err.code === 'ER_DUP_ENTRY') {
                    console.log("Follow successful (duplicate entry).");
                } else {
                    console.error("Follow FAILED:", err);
                }
            } else {
                console.log("Follow successful!");
            }

            // Clean up
            db.query("DELETE FROM relationships WHERE followerUserId = ? AND followedUserId = ?", [follower, followed], () => {
                process.exit();
            });
        });
    });
});
