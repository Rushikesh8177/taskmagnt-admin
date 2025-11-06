import React, { useEffect, useState, useContext } from "react";
import { getAllTasks , deleteTask } from "../api/Taskapi";
import { AuthContext } from "../context/AuthContext";
import TaskModal from "./TaskModal";
import DeleteTaskModel from "./DeleteTaskModel";
import "bootstrap/dist/css/bootstrap.min.css";

const TaskPage = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTaskId, setDeleteTaskId] = useState(null);

  // ✅ Fetch all tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await getAllTasks();
      setTasks(res.data.Task || []);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ✅ Handle Edit
  const handleEdit = (task) => {
    setEditTask(task);
    setShowModal(true);
  };

  // ✅ Handle Delete
  const handleDelete = (taskId) => {
    setDeleteTaskId(taskId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteTask(deleteTaskId);
      alert("Task deleted successfully");
      fetchTasks();
    } catch (error) {
      console.error(error);
      alert("Failed to delete task");
    } finally {
      setShowDeleteModal(false);
      setDeleteTaskId(null);
    }
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-primary">🗂️ Task Management</h2>
        {user?.role === "admin" && (
          <button
            className="btn btn-success px-3 rounded-pill shadow-sm"
            onClick={() => {
              setEditTask(null);
              setShowModal(true);
            }}
          >
            ➕ Add Task
          </button>
        )}
      </div>

      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : tasks.length === 0 ? (
        <div className="alert alert-info text-center shadow-sm" role="alert">
          No tasks found. {user?.role === "admin" && "Click 'Add Task' to create one."}
        </div>
      ) : (
        <div className="table-responsive shadow-sm rounded bg-white">
          <table className="table table-striped table-hover align-middle mb-0">
            <thead className="table-primary">
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Project ID</th>
                <th>Assigned To</th>
                <th>Start Date</th>
                <th>End Date</th>
                {user?.role === "admin" && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {tasks.map((t) => (
                <tr key={t._id}>
                  <td className="fw-semibold">{t.title}</td>
                  <td>{t.description}</td>
                  <td>
                    <span
                      className={`badge ${
                        t.status === "Completed"
                          ? "bg-success"
                          : t.status === "In Progress"
                          ? "bg-warning text-dark"
                          : "bg-secondary"
                      }`}
                    >
                      {t.status}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        t.priority === "High"
                          ? "bg-danger"
                          : t.priority === "Medium"
                          ? "bg-info"
                          : "bg-light text-dark"
                      }`}
                    >
                      {t.priority}
                    </span>
                  </td>
                  <td>{t.projectId}</td>
                  <td>{t.assignTo}</td>
                  <td>{t.startDate ? new Date(t.startDate).toLocaleDateString() : "-"}</td>
                  <td>{t.endDate ? new Date(t.endDate).toLocaleDateString() : "-"}</td>
                  {user?.role === "admin" && (
                    <td>
                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => handleEdit(t)}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(t._id)}
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ✅ Task Modal (Create / Edit) */}
      <TaskModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onTaskAdded={fetchTasks}
        task={editTask}
      />

      {/* ✅ Delete Confirmation Modal */}
      <DeleteTaskModel
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this task? This action cannot be undone."
      />
    </div>
  );
};

export default TaskPage;
