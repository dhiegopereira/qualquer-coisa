import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import FormAboutMe from '../../components/FormAboutMe';
import FormLanguages from '../../components/FormLanguages';
import FormProfessionalExperience from '../../components/FormProfessionalExperience';
import FormJobRole from '../../components/FormJobRole';

const ProfileItems = ({ modalShow, handleClose, option, update }) => {
  return (
    <Modal
      show={modalShow}
      onHide={() => handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          {option === 'aboutMe' && 'Sobre Mim'}
          {option === 'skills' && 'Skills'}
          {option === 'professionalExperience' && 'Experiências profisionais'}
          {option === 'jobRole' && 'Cargo'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {option === 'aboutMe' && <FormAboutMe update={update} />}
        {option === 'skills' && <FormLanguages update={update} />}
        {option === 'professionalExperience' && (
          <FormProfessionalExperience update={update} />
        )}
        {option === 'jobRole' && (
          <FormJobRole update={update} />
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProfileItems;
