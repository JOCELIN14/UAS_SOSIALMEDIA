"use client";
import { useState } from "react";
// 1. Import the Follow Button Component
import FollowButton from "./components/FollowButton"; 

// Define User Type based on API response
type User = {
  id: number;
  username: string;
  email: string;
};

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<User[]>([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  // Function to handle the search submission
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);
    setSearched(true);
    try {
      const res = await fetch(`http://localhost:5000/api/users/search?q=${query}`);
      const data = await res.json();
      
      if (Array.isArray(data)) {
        setResults(data);
      } else {
        setResults([]);
        console.error("API Error:", data);
      }
    } catch (err) {
      console.error(err);
      setResults([]);
    }
    setLoading(false);
  };

  return (
    <div style={{ 
      minHeight: "100vh", 
      padding: "40px 20px", 
      maxWidth: "600px", 
      margin: "0 auto", 
      fontFamily: "var(--font-geist-sans), sans-serif" 
    }}>
      <div style={{ marginBottom: "40px", textAlign: "center" }}>
        <h1 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "10px" }}>Find Friends</h1>
        <p style={{ color: "#666" }}>Search for users by their username.</p>
      </div>
      
      {/* Search Input Box */}
      <form onSubmit={handleSearch} style={{ display: "flex", gap: "10px", marginBottom: "30px" }}>
        <input
          type="text"
          placeholder="Type a username..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ 
            flex: 1, 
            padding: "14px", 
            borderRadius: "8px", 
            border: "1px solid #ccc",
            fontSize: "16px",
            outline: "none"
          }}
        />
        <button 
          type="submit"
          disabled={loading}
          style={{ 
            padding: "14px 28px", 
            backgroundColor: "#000", 
            color: "#fff", 
            border: "none", 
            borderRadius: "8px", 
            cursor: "pointer",
            fontWeight: "bold",
            opacity: loading ? 0.7 : 1
          }}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {/* Results List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {searched && results.length === 0 && !loading && (
          <div style={{ textAlign: "center", padding: "20px", color: "#888" }}>
            No users found matching "{query}"
          </div>
        )}
        
        {results.map((user) => (
          <div 
            key={user.id} 
            style={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center", 
              padding: "15px 20px", 
              border: "1px solid #eee", 
              borderRadius: "12px",
              backgroundColor: "#fff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              {/* Simple Avatar Placeholder using CSS */}
              <div style={{ 
                width: "45px", 
                height: "45px", 
                borderRadius: "50%", 
                backgroundColor: "#333",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                fontWeight: "bold"
              }}>
                {user.username.charAt(0).toUpperCase()}
              </div>
              
              <div>
                <h4 style={{ margin: "0 0 4px 0", fontSize: "16px", fontWeight: "600" }}>
                  {user.username}
                </h4>
                <span style={{ fontSize: "13px", color: "#888" }}>
                  {user.email}
                </span>
              </div>
            </div>

            {/* 2. Follow Button Component*/}
            <FollowButton userId={user.id} />

          </div>
        ))}
      </div>
    </div>
  );
}