"use client";
import { useState, useEffect } from "react";

const FollowButton = ({ userId }: { userId: number }) => {
  const [relationshipData, setRelationshipData] = useState<number[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // 1. Get Current User from LocalStorage (Assuming you saved it during Login)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  // 2. Fetch "Who follows this person?" to see if *I* am in the list
  useEffect(() => {
    const fetchRelationships = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/relationships?followedUserId=${userId}`);
        const data = await res.json();
        setRelationshipData(data); // data is array of IDs like [1, 5]
      } catch (err) {
        console.log(err);
      }
    };
    if (userId) fetchRelationships();
  }, [userId]);

  // Check if I am following
  const isFollowing = currentUser ? relationshipData.includes(currentUser.id) : false;

  const handleFollow = async () => {
    if (!currentUser) {
      alert("Please login first!");
      return;
    }
    setLoading(true);

    try {
      if (isFollowing) {
        // UNFOLLOW Request
        await fetch(`http://localhost:5000/api/relationships?userId=${userId}`, {
          method: "DELETE",
          credentials: "include", // Sends your cookie
        });
        // Update local state: Remove my ID
        setRelationshipData(prev => prev.filter(id => id !== currentUser.id));
      } else {
        // FOLLOW Request
        await fetch(`http://localhost:5000/api/relationships`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
          credentials: "include", // Sends your cookie
        });
        // Update local state: Add my ID
        setRelationshipData(prev => [...prev, currentUser.id]);
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  // If viewing my own profile in search results, hide the button
  if (currentUser && userId === currentUser.id) return null;

  return (
    <button 
      onClick={handleFollow} 
      disabled={loading}
      style={{
        border: "none",
        padding: "8px 16px",
        borderRadius: "5px",
        cursor: "pointer",
        fontWeight: "bold",
        backgroundColor: isFollowing ? "#e0e0e0" : "#000",
        color: isFollowing ? "#333" : "#fff",
        transition: "0.2s"
      }}
    >
      {loading ? "..." : isFollowing ? "Following" : "Follow"}
    </button>
  );
};

export default FollowButton;