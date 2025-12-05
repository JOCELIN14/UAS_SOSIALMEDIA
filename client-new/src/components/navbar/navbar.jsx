import "./navbar.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined"; // Ikon Notifikasi
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined"; // Ikon Inbox
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined"; // Ikon Teman
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import { makeRequest } from "../../axios";

const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (searchQuery.length > 2) {
        try {
          const res = await makeRequest.get("/users/search?q=" + searchQuery);
          setSearchResults(res.data);
        } catch (err) {
          console.log(err);
        }
      } else {
        setSearchResults([]);
      }
    };
    fetchUsers();
  }, [searchQuery]);

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>Social Media</span>
        </Link>
        <HomeOutlinedIcon />
        {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} />
        ) : (
          <DarkModeOutlinedIcon onClick={toggle} />
        )}
        <GridViewOutlinedIcon />
        <div className="search">
          <SearchOutlinedIcon />
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
          />
          {searchResults.length > 0 && (
            <div className="search-results">
              {searchResults.map((user) => (
                <Link
                  to={`/profile/${user.id}`}
                  key={user.id}
                  className="search-result-item"
                  onClick={() => {
                    setSearchQuery("");
                    setSearchResults([]);
                  }}
                >
                  <img src={user.profilePic ? "/upload/" + user.profilePic : "https://images.pexels.com/photos/14028501/pexels-photo-14028501.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"} alt="" />
                  <span>{user.name}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="right">

        {/* --- IKON YANG SAYA KEMBALIKAN --- */}
        <EmailOutlinedIcon />
        <NotificationsOutlinedIcon />
        {/* -------------------------------- */}

        <div className="user">
          <Link
            to={`/profile/${currentUser.id}`}
            style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", color: "inherit" }}
          >
            <img
              src={currentUser.profilePic ? "/upload/" + currentUser.profilePic : "https://images.pexels.com/photos/14028501/pexels-photo-14028501.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"}
              alt=""
            />
            <span style={{ fontWeight: "bold" }}>{currentUser.name}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;