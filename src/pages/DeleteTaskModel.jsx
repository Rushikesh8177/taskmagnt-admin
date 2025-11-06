import React from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const DeleteTaskModel = ({
  show,
  onClose,
  onConfirm,
  title = "Confirm Delete",
  message = "Are you sure you want to delete this item?",
}) => {
  return (
    <Modal show={show} onHide={onClose} centered backdrop="static">
      <Modal.Header className="bg-danger text-white" closeButton>
        <Modal.Title>
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="mb-0 fs-5 text-secondary">{message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteTaskModel;
