import React, { useState, useContext } from "react";
import { loginUser, getUserInfo } from "../api/Taskapi";
import { AuthContext } from "../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css"; // ✅ Import Bootstrap CSS
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser({ email, password });
      const token = res.data.token;
      localStorage.setItem("token", token);

      // Fetch user info
      const userRes = await getUserInfo(token);
      login({ ...userRes.data.userinfo, token });

      alert("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light flex-column">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-3 shadow-lg w-100"
        style={{ maxWidth: "400px" }}
      >
        <h2 className="text-center mb-4 fw-semibold">Login</h2>

        <div className="mb-3">
          <input
            type="email"
            placeholder="Email"
            className="form-control border p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="password"
            placeholder="Password"
            className="form-control border p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100 py-2 fw-semibold"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
