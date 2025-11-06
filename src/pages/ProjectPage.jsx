import React, { useEffect, useState, useContext } from "react";
import { getAllProjects,  deleteProject } from "../api/Taskapi";
import { AuthContext } from "../context/AuthContext";
import ProjectModal from "./ProjectModal";
import "bootstrap/dist/css/bootstrap.min.css";
import DeleteTaskModel from "./DeleteTaskModel";

const ProjectPage = () => {
  const { user } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editProject, setEditProject] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteProjectId, setDeleteProjectId] = useState(null);

  // ✅ Fetch all projects
  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await getAllProjects();
      setProjects(res.data.project || []);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // ✅ Handle Edit
  const handleEdit = (project) => {
    setEditProject(project);
    setShowModal(true);
  };

  // ✅ Handle Delete
  const handleDelete = (projectId) => {
    setDeleteProjectId(projectId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteProject(deleteProjectId);
      alert("✅ Project deleted successfully");
      fetchProjects();
    } catch (error) {
      console.error(error);
      alert("❌ Failed to delete project");
    } finally {
      setShowDeleteModal(false);
      setDeleteProjectId(null);
    }
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-primary">📁 Project Management</h2>
        {user && user.role?.toLowerCase() === "admin" && (
          <button
            className="btn btn-success px-3 rounded-pill shadow-sm"
            onClick={() => {
              setEditProject(null);
              setShowModal(true);
            }}
          >
            ➕ Add Project
          </button>
        )}
      </div>

      {/* ✅ Loading / Empty States */}
      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : projects.length === 0 ? (
        <div className="alert alert-info text-center shadow-sm">
          No projects found.{" "}
          {user?.role === "admin" && "Click 'Add Project' to create one."}
        </div>
      ) : (
        <div className="table-responsive shadow-sm rounded bg-white">
          <table className="table table-striped table-hover align-middle mb-0">
            <thead className="table-primary">
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Status</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Added By</th>
                {user?.role === "admin" && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p._id}>
                  <td className="fw-semibold">{p.name}</td>
                  <td>{p.description}</td>
                  <td>
                    <span
                      className={`badge ${
                        p.status === "Completed"
                          ? "bg-success"
                          : p.status === "In progress"
                          ? "bg-warning text-dark"
                          : "bg-secondary"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td>
                    {p.startDate
                      ? new Date(p.startDate).toLocaleDateString()
                      : "-"}
                  </td>
                  <td>
                    {p.endDate
                      ? new Date(p.endDate).toLocaleDateString()
                      : "-"}
                  </td>
                  <td>{p.addedBy || "N/A"}</td>
                  {user?.role === "admin" && (
                    <td>
                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => handleEdit(p)}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(p._id)}
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

      {/* ✅ Project Modal (Create / Edit) */}
      <ProjectModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onProjectAdded={fetchProjects}
        project={editProject}
      />

      {/* ✅ Delete Confirmation Modal */}
      <DeleteTaskModel
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this project? This action cannot be undone."
      />
    </div>
  );
};

export default ProjectPage;
