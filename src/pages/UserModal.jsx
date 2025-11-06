import React, { useEffect, useState } from "react";
import { createUser, updateUser } from "../api/Taskapi";

const UserModal = ({ show, onClose, onUserAdded, userData }) => {
  const isEditMode = Boolean(userData);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    avatar: null,
  });

  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (isEditMode && userData) {
      setFormData({
        name: userData.name || "",
        email: userData.email || "",
        password: "",
        role: userData.role || "user",
        avatar: null,
      });
      setPreview(userData.avatar || "");
    } else {
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "user",
        avatar: null,
      });
      setPreview("");
    }
  }, [userData, isEditMode]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "avatar") {
      const file = files[0];
      setFormData({ ...formData, avatar: file });
      if (file) {
        setPreview(URL.createObjectURL(file));
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("role", formData.role);
      if (formData.password) data.append("password", formData.password);
      if (formData.avatar) data.append("avatar", formData.avatar);

      if (isEditMode) {
        await updateUser(userData._id, data);
        alert("✅ User updated successfully!");
      } else {
        await createUser(data);
        alert("✅ User added successfully!");
      }

      onUserAdded();
      onClose();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.msg || "❌ Failed to save user");
    }
  };

  if (!show) return null;

  return (
    <div
      className="modal show fade d-block"
      tabIndex="-1"
      style={{ background: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content rounded-3 shadow">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title fw-semibold">
              {isEditMode ? "✏️ Edit User" : "➕ Add New User"}
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
            ></button>
          </div>

          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="modal-body">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="form-control mb-3"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="form-control mb-3"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {!isEditMode && (
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="form-control mb-3"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              )}

              {/* Image Upload */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Profile Image</label>
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  className="form-control"
                  onChange={handleChange}
                />
                {preview && (
                  <div className="mt-3 text-center">
                    <img
                      src={preview}
                      alt="Preview"
                      className="rounded-circle shadow-sm"
                      style={{ width: "80px", height: "80px", objectFit: "cover" }}
                    />
                  </div>
                )}
              </div>

              <select
                name="role"
                className="form-select mb-3"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                {isEditMode ? "Update User" : "Add User"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
