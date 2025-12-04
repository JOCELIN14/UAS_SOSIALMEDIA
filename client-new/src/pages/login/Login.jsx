import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const [err, setErr] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/");
    } catch (err) {
      setErr(err.response?.data || "Login failed");
    }
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1> Hello World. </h1>
          <p>
            Selamat datang di Sosial Uas FrontEnd, silahkan masuk untuk
            pengalaman lebih lanjut.
          </p>
          <span>Dont you have an account?</span>
          <Link to="/register">
            <button> Register </button>
          </Link>
        </div>
        <div className="right">
          <h1> Login </h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            {err && <span style={{ color: "red" }}>{err}</span>}
            <button onClick={handleLogin}> Login </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
