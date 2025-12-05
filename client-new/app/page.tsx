import Link from "next/link";

export default function Home() {
  return (
    <div style={{ padding: "40px", textAlign: "center", fontFamily: "sans-serif" }}>
      <h1>Welcome to Social Media App</h1>
      
      <div style={{ marginTop: "20px" }}>
        <Link href="/search">
          <button style={{
            padding: "10px 20px",
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px"
          }}>
            Go to Search Page 🔍
          </button>
        </Link>
      </div>
    </div>
  );
}