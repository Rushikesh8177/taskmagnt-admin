import React, { useState, useEffect } from "react";
import { createTask, updateTask } from "../api/Taskapi";

const TaskModal = ({ show, onClose, onTaskAdded, task }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    projectId: "",
    assignTo: "",
    startDate: "",
    endDate: "",
    status: "Planned",
    priority: "Low",
  });

  const [loading, setLoading] = useState(false);

  // ✅ If editing, pre-fill form with existing task data
  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        projectId: task.projectId || "",
        assignTo: task.assignTo || "",
        startDate: task.startDate ? task.startDate.split("T")[0] : "",
        endDate: task.endDate ? task.endDate.split("T")[0] : "",
        status: task.status || "Planned",
        priority: task.priority || "Low",
      });
    } else {
      // Reset for new task
      setFormData({
        title: "",
        description: "",
        projectId: "",
        assignTo: "",
        startDate: "",
        endDate: "",
        status: "Planned",
        priority: "Low",
      });
    }
  }, [task]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle Add or Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (task?._id) {
        // Edit existing task
        await updateTask(task._id, formData);
        alert("✅ Task updated successfully!");
      } else {
        // Create new task
        await createTask(formData);
        alert("✅ Task created successfully!");
      }

      onTaskAdded(); // Refresh parent list
      onClose(); // Close modal
    } catch (error) {
      console.error("Task save error:", error);
      alert(error.response?.data?.msg || "❌ Failed to save task");
    } finally {
      setLoading(false);
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
              {task ? "✏️ Edit Task" : "➕ Add New Task"}
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
            ></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <input
                type="text"
                name="title"
                placeholder="Task Title"
                className="form-control mb-3"
                value={formData.title}
                onChange={handleChange}
                required
              />

              <textarea
                name="description"
                placeholder="Description"
                className="form-control mb-3"
                value={formData.description}
                onChange={handleChange}
              />

              <input
                type="text"
                name="projectId"
                placeholder="Project ID"
                className="form-control mb-3"
                value={formData.projectId}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="assignTo"
                placeholder="Assign To (User ID)"
                className="form-control mb-3"
                value={formData.assignTo}
                onChange={handleChange}
                required
              />

              <div className="d-flex gap-2">
                <input
                  type="date"
                  name="startDate"
                  className="form-control mb-3"
                  value={formData.startDate}
                  onChange={handleChange}
                />
                <input
                  type="date"
                  name="endDate"
                  className="form-control mb-3"
                  value={formData.endDate}
                  onChange={handleChange}
                />
              </div>

              <div className="d-flex gap-2">
                <select
                  name="status"
                  className="form-select mb-3"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option>Planned</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>

                <select
                  name="priority"
                  className="form-select mb-3"
                  value={formData.priority}
                  onChange={handleChange}
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
                disabled={loading}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Saving...
                  </>
                ) : task ? (
                  "Update Task"
                ) : (
                  "Add Task"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
