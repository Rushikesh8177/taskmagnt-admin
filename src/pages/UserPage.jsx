import React, { useEffect, useState, useContext } from "react";
import { getAllUsers, deleteUser } from "../api/Taskapi";
import { AuthContext } from "../context/AuthContext";
import UserModal from "./UserModal";
import DeleteTaskModel from "./DeleteTaskModel";
import "bootstrap/dist/css/bootstrap.min.css";

const UserPage = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
const [selectedItem, setSelectedItem] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await getAllUsers();
      setUsers(res.data.users || []);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

 // When user clicks delete button
const handleDelete= (item) => {
  setSelectedItem(item);
  setShowDeleteModal(true);
};
// Confirm deletion
const confirmDelete = async () => {
  try {
    await deleteUser(selectedItem._id);
    alert("✅ Task deleted successfully!");
    fetchUsers();
  } catch (error) {
    console.error(error);
    alert("❌ Failed to delete task");
  } finally {
    setShowDeleteModal(false);
  }
};
  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-primary">👥 User Management</h2>
        {user?.role === "admin" && (
          <button
            className="btn btn-success px-3 rounded-pill shadow-sm"
            onClick={() => {
              setSelectedUser(null);
              setShowModal(true);
            }}
          >
            ➕ Add User
          </button>
        )}
      </div>

      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : users.length === 0 ? (
        <div className="alert alert-info text-center shadow-sm" role="alert">
          No users found.
        </div>
      ) : (
        <div className="table-responsive shadow-sm rounded bg-white">
          <table className="table table-striped table-hover align-middle mb-0">
            <thead className="table-primary">
              <tr>
                <th>Avatar</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                {user?.role === "admin" && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td>
                    {u.avatar ? (
                      <img
                        src={u.avatar}
                        alt="avatar"
                        width="40"
                        height="40"
                        className="rounded-circle"
                      />
                    ) : (
                      <span className="text-muted">No Avatar</span>
                    )}
                  </td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>
                    <span
                      className={`badge ${u.role === "admin" ? "bg-danger" : "bg-secondary"
                        }`}
                    >
                      {u.role}
                    </span>
                  </td>

                  {user?.role === "admin" && (
                    <td>
                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => handleEdit(u)}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(u)}
                      >
                        🗑 Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add / Edit Modal */}
      <UserModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onUserAdded={fetchUsers}
        userData={selectedUser}
      />

      {/* Delete Confirmation Modal */}
      <DeleteTaskModel
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        title="Delete Task"
        message={`Are you sure you want to delete "${selectedItem?.title}"?`}
      />
    </div>
  );
};

export default UserPage;
