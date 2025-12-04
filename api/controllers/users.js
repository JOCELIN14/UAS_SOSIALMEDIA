// In api/controllers/users.js
// ENSURE you are using 'export const'
import { db } from "../db.js";

export const getUsers = (req, res) => {
  const userId = req.params.userId;
  const q = "SELECT * FROM users WHERE id = ?";

  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    if(data.length === 0) return res.status(404).json("User not found!");
    
    // Hide password
    const { password, ...info } = data[0]; 
    return res.json(info);
  });
};

export const searchUsers = (req, res) => {
  const query = req.query.q; 
  if (!query) return res.status(400).json("Search query is required");

  // This SQL searches for users where the username contains the query text
  const q = "SELECT id, username, email FROM users WHERE username LIKE ?";
  
  db.query(q, [`%${query}%`], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};