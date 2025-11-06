import React, { useState, useEffect } from "react";
import { createProject, updateProject } from "../api/Taskapi";

const ProjectModal = ({ show, onClose, onProjectAdded, project }) => {
  const isEditMode = Boolean(project);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "Planned",
  });

  // ✅ Pre-fill data when editing
  useEffect(() => {
    if (isEditMode && project) {
      setFormData({
        name: project.name || "",
        description: project.description || "",
        startDate: project.startDate
          ? project.startDate.split("T")[0]
          : "",
        endDate: project.endDate ? project.endDate.split("T")[0] : "",
        status: project.status || "Planned",
      });
    } else {
      // reset on new add
      setFormData({
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        status: "Planned",
      });
    }
  }, [project, isEditMode]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditMode) {
        await updateProject(project._id, formData);
        alert("✅ Project updated successfully!");
      } else {
        await createProject(formData);
        alert("✅ Project added successfully!");
      }
      onProjectAdded(); // refresh project list
      onClose();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.msg || "Failed to save project");
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
              {isEditMode ? "✏️ Edit Project" : "➕ Add New Project"}
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
                name="name"
                placeholder="Project Name"
                className="form-control mb-3"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <textarea
                name="description"
                placeholder="Project Description"
                className="form-control mb-3"
                value={formData.description}
                onChange={handleChange}
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
              <select
                name="status"
                className="form-select mb-3"
                value={formData.status}
                onChange={handleChange}
              >
                <option>Planned</option>
                <option>In progress</option>
                <option>Completed</option>
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
                {isEditMode ? "Update Project" : "Add Project"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
