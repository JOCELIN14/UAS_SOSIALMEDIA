import "./post.css";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../comments/comment";
import { useState, useContext } from "react"; // useContext diimport lebih awal
import moment from "moment";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";

const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Ambil user dari context
  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();

  // --- 1. QUERY: Ambil Status Likes ---
  const {
    isLoading,
    error,
    data: likeData,
  } = useQuery({
    // Ganti 'data' menjadi 'likeData'
    queryKey: ["likes", post.id],
    queryFn: () =>
      makeRequest.get("/likes?postId=" + post.id).then((res) => {
        // Data harus berupa array ID pengguna yang menyukai
        return res.data;
      }),
    enabled: !!post.id, // Pastikan query hanya berjalan jika post.id ada
  });

  // Cek apakah user saat ini menyukai post
  const isLiked = likeData && likeData.includes(currentUser.id);

  // --- 2. MUTATION: Handle Like/Unlike ---
  const likeMutation = useMutation({
    // Ganti 'mutation' menjadi 'likeMutation'
    mutationFn: (liked) => {
      if (liked) return makeRequest.delete("/likes?postId=" + post.id);
      return makeRequest.post("/likes", { postId: post.id });
    },
    onSuccess: () => {
      // Invalidate query likes spesifik untuk post ini
      queryClient.invalidateQueries({ queryKey: ["likes", post.id] });
    },
    onError: (err) => {
      console.error("Gagal melakukan like/unlike:", err);
      // Tambahkan state untuk menampilkan error ke user jika perlu
    },
  });

  // --- 3. MUTATION: Handle Delete Post ---
  const deleteMutation = useMutation({
    mutationFn: (postId) => {
      return makeRequest.delete("/posts/" + postId);
    },
    onSuccess: () => {
      // Invalidate query posts utama agar list postingan di-refresh
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (err) => {
      console.error("Gagal menghapus post:", err);
    },
  });

  // --- HANDLERS ---
  const handleLike = () => {
    // Panggil mutation dengan status like saat ini
    likeMutation.mutate(isLiked);
  };

  const handleDelete = () => {
    // Tambahkan konfirmasi agar user tidak salah hapus
    if (window.confirm("Apakah Anda yakin ingin menghapus postingan ini?")) {
      deleteMutation.mutate(post.id);
    }
  };

  // --- RENDERING ---
  // Tampilkan pesan error jika query likes gagal
  if (error) return <div className="post-error">Gagal memuat status like.</div>;

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            {/* Menggunakan path relatif /upload/ */}
            <img
              src={
                post.profilePic
                  ? `/upload/${post.profilePic}`
                  : "/default-avatar.png"
              }
              alt={post.name}
            />
            <div className="details">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.name}</span>
              </Link>
              <span className="date">{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
          {/* Menu Opsi */}
          <MoreHorizIcon
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ cursor: "pointer" }}
          />
          {/* Tampilkan tombol delete hanya jika menu terbuka dan user adalah pemilik post */}
          {menuOpen && post.userId === currentUser.id && (
            <button
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
              className="delete-button"
            >
              {deleteMutation.isPending ? "Menghapus..." : "Hapus"}
            </button>
          )}
        </div>

        <div className="content">
          <p>{post.desc}</p>
          {/* Render img hanya jika post.img tersedia */}
          {post.img && <img src={`/upload/${post.img}`} alt="Post Image" />}
        </div>

        <div className="info">
          <div className="item">
            {/* Status Likes */}
            {isLoading ? (
              "Memuat..."
            ) : isLiked ? (
              <FavoriteOutlinedIcon
                style={{ color: "red", cursor: "pointer" }}
                onClick={handleLike}
              />
            ) : (
              <FavoriteBorderOutlinedIcon
                onClick={handleLike}
                style={{ cursor: "pointer" }}
              />
            )}
            {/* Tampilkan jumlah likes dari likeData, default 0 jika null/undefined */}
            {likeData?.length || 0} Likes
          </div>

          <div
            className="item"
            onClick={() => setCommentOpen(!commentOpen)}
            style={{ cursor: "pointer" }}
          >
            <TextsmsOutlinedIcon />
            Lihat Komentar
          </div>

          <div className="item" style={{ cursor: "pointer" }}>
            <ShareOutlinedIcon />
            Bagikan
          </div>
        </div>

        {/* Comments Component */}
        {commentOpen && <Comments postId={post.id} />}
      </div>
    </div>
  );
};

export default Post;
