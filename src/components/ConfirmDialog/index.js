import React from 'react';
import { Button, Modal } from 'react-bootstrap';

function ConfirmDialog({ open, handleClose, title, confirm, titleButton }) {
  if (open === true) {
    return (
      <Modal
        show={open}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{title ? title : 'Confirma operação?'}</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={confirm}>
            {titleButton ? titleButton : 'Confirmar'}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  } else {
    return <></>;
  }
}

export default ConfirmDialog;
