import React, { useState, useContext } from "react";
import { registerUser } from "../api/Taskapi";
import { AuthContext } from "../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css"; // ✅ Import Bootstrap CSS
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    myfile: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));

    try {
      const res = await registerUser(data);
      // alert(res.data.msg);
      alert(res.data.msg);
// window.location.href = "/verify";
    navigate("/verify")
      // Optionally auto-login user after registration
    } catch (error) {
      alert(error.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light flex-column">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-3 shadow-lg w-100"
        style={{ maxWidth: "400px" }}
      >
        <h2 className="text-center mb-4 fw-semibold">Register</h2>

        <div className="mb-3">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="form-control border p-2 rounded"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="form-control border p-2 rounded"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="form-control border p-2 rounded"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="file"
            name="myfile"
            className="form-control border p-2 rounded"
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100 py-2 fw-semibold"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
