import { useState } from "react";
import { Link } from "react-router-dom";
import "./register.css";
import axios from "axios";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });
  const [err, setErr] = useState(false);
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/auth/register", inputs);
    } catch (err) {
      setErr(err.response.data);
    }
  };

  console.log(err);
  return (
    <div className="register">
      <form className="registerForm">
        <div className="left">
          <h1> Sosial Uas FrontEnd </h1>
          <p>
            {" "}
            Berikut merupakan Sosmed yang telah kami buat sebagai tugas akhir di
            Semester 3 ini. Semoga berkesan{" "}
          </p>
          <span> Sudah punya akun? </span>
          <Link to="/login">
            <button> Login </button>
          </Link>
        </div>
        <data className="right">
          <h1> Daftar </h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Nama Lengkap"
              name="name"
              onChange={handleChange}
            />
            {err && err}
            <button onClick={handleClick}> Register </button>
          </form>
        </data>
      </form>
    </div>
  );
};
export default Register;
