import React, { useState, useEffect, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import { Tooltip, IconButton } from '@material-ui/core';
import { Save, Clear } from '@material-ui/icons';
import firebase from 'firebase';
import { notify } from '../../util/toast';
import JoditEditor from 'jodit-react';

const FormProfessionalExperience = ({ update }) => {
  const [progressLoad, setProgressLoad] = useState(false);

  const editorProfessionalExperience = useRef(null);
  const [professionalExperience, setProfessionalExperience] = useState(
    'Aqui vão suas experiências profissionais.'
  );
  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
  };

  const loadData = () => {
    const db = firebase.firestore();

    const usersRef = db.collection('users');

    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        usersRef
          .where('uid', '==', user.uid)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              setProfessionalExperience(doc.data().professionalExperience);
            });
          });
      }
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRegister = () => {
    setProgressLoad(true);
    const db = firebase.firestore();

    var userRef = db.collection('users').doc(localStorage.getItem('user'));

    // Update successful.
    userRef
      .update({
        professionalExperience: professionalExperience,
      })
      .then(function () {
        // upload image
        notify('Dados atualizados com sucesso!', 1000, 'success');

        setProgressLoad(false);
        update();
        // end upload
      })
      .catch(function (error) {
        // The document probably doesn't exist.
        console.error('Error updating document: ', error);
        notify('Falha ao atualizar os dados!', 1000, 'error');
        setProgressLoad(false);
      });
  };

  return (
    <Form>
      <JoditEditor
        ref={editorProfessionalExperience}
        value={professionalExperience}
        config={config}
        tabIndex={1} // tabIndex of textarea
        onBlur={(newContent) => setProfessionalExperience(newContent)} // preferred to use only this option to update the content for performance reasons
        onChange={(newContent) => {}}
      />
      <Tooltip title="Salvar Alterações" placement="bottom-start">
        <IconButton
          aria-label="save"
          onClick={() => handleRegister()}
          disabled={progressLoad}
        >
          <Save />
        </IconButton>
      </Tooltip>
      <Tooltip title="Limpar" placement="bottom-start">
        <IconButton
          aria-label="save"
          onClick={() => setProfessionalExperience('')}
          disabled={progressLoad}
        >
          <Clear />
        </IconButton>
      </Tooltip>
    </Form>
  );
};

export default FormProfessionalExperience;
