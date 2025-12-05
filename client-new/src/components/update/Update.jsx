import { useState } from "react";
import { makeRequest } from "../../axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CloudUploadIcon from "@mui/icons-material/CloudUpload"; // Pastikan install mui icons

const Update = ({ setOpenUpdate, user }) => {
  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);
  
  const [texts, setTexts] = useState({
    name: user.name || "",
    city: user.city || "",
    website: user.website || "",
    password: "", 
  });

  // Fungsi Upload Gambar ke Server
  const upload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      // Asumsi endpoint upload kamu ada di /api/upload
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
      return "";
    }
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (user) => {
      return makeRequest.put("/users", user);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const handleChange = (e) => {
    setTexts((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    
    // Logika: Jika user memilih foto baru, upload dulu. Jika tidak, pakai foto lama (user.profilePic)
    let coverUrl = user.coverPic;
    let profileUrl = user.profilePic;

    if (cover) coverUrl = await upload(cover);
    if (profile) profileUrl = await upload(profile);

    // Kirim semua data (teks + nama file gambar) ke backend
    mutation.mutate({ ...texts, coverPic: coverUrl, profilePic: profileUrl });
    
    setOpenUpdate(false);
    setTimeout(() => window.location.reload(), 500);
  };

  // Styles
  const overlayStyle = {
    position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 99999
  };

  const boxStyle = {
    backgroundColor: "white", padding: "40px", borderRadius: "20px", width: "500px", maxWidth: "90%",
    display: "flex", flexDirection: "column", gap: "20px", boxShadow: "0px 10px 40px rgba(0,0,0,0.3)",
    fontFamily: "Arial, sans-serif", maxHeight: "90vh", overflowY: "auto" // Biar bisa discroll kalau layar kecil
  };

  const labelStyle = { fontSize: "14px", fontWeight: "bold", color: "#555", marginBottom: "5px", display: "block" };
  const inputStyle = { width: "100%", padding: "12px", border: "1px solid #ccc", borderRadius: "8px", fontSize: "14px" };

  return (
    <div style={overlayStyle}>
      <div style={boxStyle}>
        <h2 style={{ margin: 0, color: "#333", borderBottom: "1px solid #eee", paddingBottom:"10px" }}>Edit Profil</h2>
        
        <form style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          
          {/* --- BAGIAN UPLOAD FOTO --- */}
          <div style={{display:"flex", gap:"10px"}}>
             <div style={{flex:1}}>
                <label style={labelStyle}>Foto Profil</label>
                <input type="file" onChange={e=>setProfile(e.target.files[0])} style={{fontSize:"12px"}} />
             </div>
             <div style={{flex:1}}>
                <label style={labelStyle}>Foto Sampul</label>
                <input type="file" onChange={e=>setCover(e.target.files[0])} style={{fontSize:"12px"}} />
             </div>
          </div>
          {/* ------------------------- */}

          <div>
            <label style={labelStyle}>Nama Lengkap</label>
            <input type="text" name="name" value={texts.name} onChange={handleChange} style={inputStyle} />
          </div>

          <div style={{ display: "flex", gap: "15px" }}>
            <div style={{ flex: 1 }}>
                <label style={labelStyle}>Kota</label>
                <input type="text" name="city" value={texts.city} onChange={handleChange} style={inputStyle} />
            </div>
            <div style={{ flex: 1 }}>
                <label style={labelStyle}>Website</label>
                <input type="text" name="website" value={texts.website} onChange={handleChange} style={inputStyle} />
            </div>
          </div>

          <div style={{ backgroundColor: "#fff0f0", padding: "15px", borderRadius: "10px", border: "1px dashed #ffcccc" }}>
            <label style={{ ...labelStyle, color: "#d9534f" }}>Ganti Password (Opsional)</label>
            <input type="password" name="password" onChange={handleChange} style={{...inputStyle, borderColor: "#ffcccc"}} placeholder="Kosongkan jika tidak ingin ganti"/>
          </div>

          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <button onClick={handleClick} style={{ flex: 1, padding: "15px", border: "none", borderRadius: "8px", backgroundColor: "#007bff", color: "white", fontWeight: "bold", cursor: "pointer" }}>Simpan</button>
            <button onClick={() => setOpenUpdate(false)} style={{ flex: 1, padding: "15px", border: "1px solid #ccc", borderRadius: "8px", backgroundColor: "transparent", color: "#555", fontWeight: "bold", cursor: "pointer" }}>Batal</button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Update;