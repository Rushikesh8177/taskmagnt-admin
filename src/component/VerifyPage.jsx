import React, { useState } from "react";
import { verifyOtp } from "../api/Taskapi";
import { useNavigate } from "react-router-dom";

const VerifyPage = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
    const navigate = useNavigate(); 

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const res = await verifyOtp({ email, otp });
      alert(res.data.msg);

       navigate("/login");
    } catch (err) {
      alert(err.response?.data?.msg || "Verification failed");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light flex-column">
      <form onSubmit={handleVerify} className="bg-white p-4 rounded-3 shadow-lg w-100" style={{ maxWidth: "400px" }}>
        <h2 className="text-center mb-4 fw-semibold">Verify OTP</h2>

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
            type="text"
            placeholder="Enter OTP"
            className="form-control border p-2 rounded"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100 py-2 fw-semibold">
          Verify
        </button>
      </form>
    </div>
  );
};

export default VerifyPage;
