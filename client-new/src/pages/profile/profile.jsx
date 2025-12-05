import "./profile.css";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import Update from "../../components/update/Update";

const Profile = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  
  const userId = parseInt(location.pathname.split("/")[2]);

  const { isLoading, error, data } = useQuery(["user"], () =>
    makeRequest.get("/users/find/" + userId).then((res) => res.data)
  );

  const { isLoading: rIsLoading, data: relationshipData } = useQuery(
    ["relationship"],
    () =>
      makeRequest.get("/relationships?followedUserId=" + userId).then((res) => res.data)
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (following) => {
      if (following) return makeRequest.delete("/relationships?userId=" + userId);
      return makeRequest.post("/relationships", { userId });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["relationship"]);
      },
    }
  );

  const handleFollow = () => {
    mutation.mutate(relationshipData.includes(currentUser.id));
  };

  const handleDelete = async () => {
    if (window.confirm("Apakah Anda yakin ingin menghapus akun?")) {
      try {
        await makeRequest.delete("/users"); 
        localStorage.clear(); 
        navigate("/login"); 
      } catch (err) {
        alert("Gagal menghapus akun.");
      }
    }
  };

  return (
    <div className="profile">
      {isLoading || !data ? (
        <div style={{padding:"20px", textAlign:"center"}}>Loading...</div>
      ) : (
        <>
          <div className="images">
            <img
              src={data.coverPic ? "/upload/" + data.coverPic : "https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
              alt=""
              className="cover"
            />
            <img
              src={data.profilePic ? "/upload/" + data.profilePic : "https://images.pexels.com/photos/14028501/pexels-photo-14028501.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"}
              alt=""
              className="profilePic"
              // HANYA STYLE INI YANG SAYA UBAH: Biar bulat dan rapi
              style={{ borderRadius: "50%", objectFit: "cover" }} 
            />
          </div>
          
          <div className="profileContainer">
            <div className="uInfo">
              
              {/* Sisi Kiri (Ikon Sosmed) */}
              <div className="left">
                <a href="http://facebook.com"><FacebookTwoToneIcon fontSize="large" /></a>
                <a href="http://instagram.com"><InstagramIcon fontSize="large" /></a>
                <a href="http://twitter.com"><TwitterIcon fontSize="large" /></a>
              </div>
              
              {/* --- BAGIAN TENGAH (NAMA & TOMBOL) --- */}
              {/* SAYA MENAMBAHKAN 'paddingTop' 80px DI SINI AGAR TURUN KE BAWAH */}
              <div className="center" style={{ paddingTop: "80px", position: "relative", zIndex: 10 }}> 
                
                <span style={{ fontSize: "30px", fontWeight: "bold" }}>{data.name}</span>
                
                {/* Info Followers (Di bawah Nama) */}
                <div style={{display: "flex", gap: "20px", margin: "10px 0", color: "#555", justifyContent: "center"}}>
                    <div style={{textAlign: "center"}}>
                        <span style={{fontWeight: "bold", fontSize: "16px"}}>
                            {relationshipData ? relationshipData.length : 0}
                        </span> Followers
                    </div>
                    <div style={{textAlign: "center"}}>
                        <span style={{fontWeight: "bold", fontSize: "16px"}}>0</span> Following
                    </div>
                </div>

                <div className="info">
                  <div className="item">
                    <PlaceIcon />
                    <span>{data.city || "-"}</span>
                  </div>
                  <div className="item">
                    <LanguageIcon />
                    <span>{data.website || "-"}</span>
                  </div>
                </div>

                {rIsLoading ? (
                  "loading"
                ) : userId === currentUser.id ? (
                  <div style={{ display: "flex", gap: "10px", alignItems: "center", marginTop: "10px" }}>
                    <button onClick={() => setOpenUpdate(true)}>Update Profile</button>
                    <button
                      onClick={handleDelete}
                      style={{ backgroundColor: "red", color: "white", border: "none", padding: "5px 10px", borderRadius: "5px", cursor: "pointer"}}
                    >
                      Delete
                    </button>
                  </div>
                ) : (
                  <button onClick={handleFollow}>
                    {relationshipData.includes(currentUser.id) ? "Following" : "Follow"}
                  </button>
                )}
              </div>
              
              {/* Sisi Kanan (Email & More) */}
              <div className="right">
                <EmailOutlinedIcon />
                <MoreVertIcon />
              </div>
            </div>
            <Posts userId={userId} />
          </div>
        </>
      )}
      {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data} />}
    </div>
  );
};

export default Profile;