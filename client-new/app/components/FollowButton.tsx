"use client";
import { useState, useEffect } from "react";

const FollowButton = ({ userId }: { userId: number }) => {
  const [relationshipData, setRelationshipData] = useState<number[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // 1. Get Current User from LocalStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  // 2. Fetch "Who follows this person?"
  useEffect(() => {
    const fetchRelationships = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/relationships?followedUserId=${userId}`);
        const data = await res.json();
        setRelationshipData(data);
      } catch (err) {
        console.log(err);
      }
    };
    if (userId) fetchRelationships();
  }, [userId]);

  const isFollowing = currentUser ? relationshipData.includes(currentUser.id) : false;

  const handleFollow = async () => {
    if (!currentUser) return alert("Please login first!");
    setLoading(true);

    try {
      if (isFollowing) {
        await fetch(`http://localhost:5000/api/relationships?userId=${userId}`, {
          method: "DELETE",
          credentials: "include",
        });
        setRelationshipData(prev => prev.filter(id => id !== currentUser.id));
      } else {
        await fetch(`http://localhost:5000/api/relationships`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
          credentials: "include",
        });
        setRelationshipData(prev => [...prev, currentUser.id]);
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  if (currentUser && userId === currentUser.id) return null; // Don't show on own profile

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
        marginLeft: "10px"
      }}
    >
      {loading ? "..." : isFollowing ? "Following" : "Follow"}
    </button>
  );
};

export default FollowButton;