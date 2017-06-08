import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';

// class ConfirmModal extends React.Component {
  // render() {
const ConfirmModal = (props) => {
  const { onCancel, onConfirm, title, message, show } = props;

  return (
    <div>
      <Modal
        show={show}
        onHide={onCancel}
        className="image-preview"
        bsSize="large"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            { title || 'Confirm?' }
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          { message || 'Are you sure?' }
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="danger" onClick={onCancel}>Cancel</Button>
          <Button bsStyle="success" onClick={onConfirm}>Confirm</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

// Define property types
ConfirmModal.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  show: PropTypes.bool,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
};

ConfirmModal.defaultProps = {
  title: null,
  message: null,
  show: false,
  onCancel: () => {},
  onConfirm: () => {},
};

export default ConfirmModal;
