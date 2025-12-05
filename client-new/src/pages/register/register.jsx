import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";
import axios from "axios";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/auth/register", inputs);
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      console.log("Full error:", err); // Debug

      // Extract error message dengan aman
      let errorMessage = "Registration failed. Please try again.";

      if (err.response && err.response.data) {
        const errorData = err.response.data;

        // Kalau error data adalah string
        if (typeof errorData === "string") {
          errorMessage = errorData;
        }
        // Kalau error data adalah object dengan message
        else if (errorData.message) {
          errorMessage = errorData.message;
        }
        // Kalau error data adalah object dengan sqlMessage
        else if (errorData.sqlMessage) {
          errorMessage = errorData.sqlMessage;
        }
        // Kalau duplicate entry
        else if (errorData.code === "ER_DUP_ENTRY") {
          errorMessage = "Username or email already exists!";
        }
      } else if (err.request) {
        errorMessage =
          "Cannot connect to server. Please check if backend is running.";
      }

      setErr(errorMessage);
    }
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Social Media App</h1>
          <p>
            Create an account to connect with friends and the world around you on Social Media App.
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Daftar</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
              required
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              placeholder="Nama Lengkap"
              name="name"
              onChange={handleChange}
              required
            />
            {err && <span className="error">{String(err)}</span>}
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
