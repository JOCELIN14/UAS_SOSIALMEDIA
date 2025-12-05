import "./share.css";
import Image from "@mui/icons-material/Image";
import Map from "@mui/icons-material/Map";
import Friend from "@mui/icons-material/EmojiEmotions";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const Share = () => {
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");

  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient(); // Get dari provider

  const mutation = useMutation({
    mutationFn: (newPost) => {
      return makeRequest.post("/posts", newPost);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setDesc("");
      setFile(null);
    },
    onError: (error) => {
      console.error("Failed to create post:", error);
      alert("Failed to create post. Please try again.");
    },
  });

  const handleClick = async (e) => {
    e.preventDefault();
    if (!desc.trim()) {
      alert("Please write something!");
      return;
    }
    mutation.mutate({ desc });
  };

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <img src={currentUser.profilePic || "/default-avatar.png"} alt="" />
          <input
            type="text"
            placeholder={`What's on your mind ${currentUser.name}?`}
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
          />
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="file">
              <div className="item">
                <Image />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <Map />
              <span>Add Place</span>
            </div>
            <div className="item">
              <Friend />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            <button onClick={handleClick} disabled={mutation.isPending}>
              {mutation.isPending ? "Sharing..." : "Share"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
