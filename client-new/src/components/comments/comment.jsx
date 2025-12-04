import { useContext, useState } from "react";
import "./comments.css";
import { AuthContext } from "../../context/authContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import moment from "moment";

const Comments = ({ postId }) => {
  // 1. State untuk input komentar dan error saat posting
  const [desc, setDesc] = useState("");
  const [postError, setPostError] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();

  // --- 1. QUERY: Mengambil Data Komentar ---
  const { isLoading, error, data } = useQuery({
    // Tambahkan postId ke queryKey untuk cache yang spesifik per post
    queryKey: ["comments", postId],
    queryFn: () =>
      makeRequest.get(`/comments?postId=${postId}`).then((res) => {
        return res.data;
      }),
    // Hanya jalankan query jika postId ada
    enabled: !!postId,
  });

  // --- 2. MUTATION: Mengirim Komentar Baru ---
  const mutation = useMutation({
    mutationFn: (newComment) => {
      // Pastikan backend menerima newComment (yaitu { desc, postId })
      return makeRequest.post("/comments", newComment);
    },
    onSuccess: () => {
      // Invalidate cache hanya untuk post ini
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      setPostError(null); // Bersihkan error posting
    },
    onError: (err) => {
      // Tangani error posting, tampilkan pesan dari backend jika ada
      const errorMessage = err.response?.data || "Gagal mengirim komentar.";
      setPostError(errorMessage);
    },
  });

  // --- 3. HANDLER PENGIRIMAN ---
  const handleClick = (e) => {
    e.preventDefault();

    // Validasi: Komentar tidak boleh kosong
    if (!desc.trim()) {
      setPostError("Komentar tidak boleh kosong.");
      return;
    }

    // Panggil mutation
    mutation.mutate({ desc, postId });
    setDesc(""); // Bersihkan input setelah dipanggil
    setPostError(null); // Reset error saat mencoba mengirim
  };

  // --- 4. RENDERING ---
  return (
    <div className="comments">
      <div className="write">
        {currentUser && currentUser.profilePic && (
          // Lebih aman menggunakan && untuk menghindari error jika profilePic null/undefined
          <img
            src={
              currentUser.profilePic
                ? `/upload/${currentUser.profilePic}`
                : "/default-avatar.png"
            }
            alt="User Profile"
          />
        )}
        <input
          type="text"
          placeholder="Tulis komentar..."
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        {/* Tombol dinonaktifkan saat pengiriman berlangsung */}
        <button onClick={handleClick} disabled={mutation.isPending}>
          {mutation.isPending ? "Mengirim..." : "Kirim"}
        </button>
      </div>

      {/* Tampilkan error posting jika ada */}
      {postError && <div className="post-error">{postError}</div>}

      {/* Tampilkan status loading/error saat memuat komentar */}
      {error ? (
        <div className="error-message">
          Gagal memuat komentar. ({error.message})
        </div>
      ) : isLoading ? (
        <div className="loading-message">Memuat komentar...</div>
      ) : (
        // Map komentar
        data.map((comment) => (
          <div className="comment" key={comment.id}>
            {" "}
            {/* Tambahkan key untuk rendering list */}
            <img
              src={
                comment.profilePic
                  ? `/upload/${comment.profilePic}`
                  : "/default-avatar.png"
              }
              alt={comment.name}
            />
            <div className="info">
              <span>{comment.name}</span>
              <p>{comment.desc}</p>
            </div>
            <span className="date">{moment(comment.createdAt).fromNow()}</span>
          </div>
        ))
      )}
    </div>
  );
};

export default Comments;
