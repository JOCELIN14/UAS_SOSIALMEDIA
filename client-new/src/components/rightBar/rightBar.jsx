import "./rightBar.css";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";

const RightBar = () => {
  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const { isLoading, error, data: users } = useQuery({
    queryKey: ["users"],
    queryFn: () => makeRequest.get("/users").then((res) => res.data),
  });

  // State for dismissed users
  const [dismissed, setDismissed] = useState([]);

  // Filter suggestions: exclude current user, dismissed users, AND already followed users
  const suggestions = users
    ? users.filter(
      (u) =>
        u.id !== currentUser.id &&
        !dismissed.includes(u.id) &&
        (!relationshipData || !relationshipData.includes(u.id))
    )
    : [];

  const handleDismiss = (userId) => {
    setDismissed((prev) => [...prev, userId]);
  };

  // 2. Fetch people I follow to check status
  const { isLoading: rIsLoading, data: relationshipData } = useQuery({
    queryKey: ["relationships", currentUser.id],
    queryFn: () =>
      makeRequest.get("/relationships?followerUserId=" + currentUser.id).then((res) => res.data),
  });

  // 3. Mutation for Follow/Unfollow
  const mutation = useMutation({
    mutationFn: (userId) => {
      // Safeguard: Check if we are already following
      if (relationshipData && relationshipData.includes(userId)) {
        return makeRequest.delete("/relationships?userId=" + userId);
      }
      return makeRequest.post("/relationships", { userId });
    },
    onSuccess: () => {
      // Invalidate relationships to refresh button state
      queryClient.invalidateQueries({ queryKey: ["relationships"] });
    },
    onError: (err) => {
      console.error("Follow/Unfollow Failed:", err);
      alert("Failed to update follow status. Please try again.");
    }
  });

  const handleFollow = (userId) => {
    if (rIsLoading) return; // Prevent click while loading
    mutation.mutate(userId);
  };

  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
          <span>Suggestions For You</span>
          {isLoading ? (
            "Loading..."
          ) : error ? (
            "Something went wrong!"
          ) : (
            suggestions.map((user) => (
              <div className="user" key={user.id}>
                <div className="userInfo">
                  <img
                    src={user.profilePic ? "/upload/" + user.profilePic : "https://images.pexels.com/photos/14028501/pexels-photo-14028501.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"}
                    alt=""
                  />
                  <span>{user.name}</span>
                </div>
                <div className="buttons">
                  <button onClick={() => handleFollow(user.id)} disabled={mutation.isLoading}>
                    {rIsLoading
                      ? "..."
                      : relationshipData && relationshipData.includes(user.id)
                        ? "Following"
                        : "Follow"}
                  </button>
                  <button onClick={() => handleDismiss(user.id)}>dismiss</button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Helper content to fill space */}
        <div className="item">
          <span>Online Friends</span>
          <div className="user"><div className="userInfo"><span>(Static Data)</span></div></div>
        </div>
      </div>
    </div>
  );
};

export default RightBar;
