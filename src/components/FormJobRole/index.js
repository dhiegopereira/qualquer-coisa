import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { Tooltip, IconButton } from '@material-ui/core';
import { Save, Clear } from '@material-ui/icons';
import firebase from 'firebase';
import MenuItem from '@material-ui/core/MenuItem';
import { notify } from '../../util/toast';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles((theme) => ({

  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: '95%',
  }
}));

const FormJobRole = ({ update }) => {
  const classes = useStyles();
  const [progressLoad, setProgressLoad] = useState(false);
  const [inputJobRole, setInputJobRole] = useState('');

  const handleChangeFunction = (event) => {
    setInputJobRole(event.target.value);
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
              setInputJobRole(doc.data().jobRole);
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

    if (inputJobRole == '') {
      notify('Preencha todos os campos!', 1000, 'error');
      setProgressLoad(false);
      return;
    }

    var userRef = db.collection('users').doc(localStorage.getItem('user'));

    // Update successful.
    userRef
      .update({
        jobRole: inputJobRole,
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
      <FormControl
        fullWidth
        variant="outlined"
        className={classes.formControl}
      >
        <InputLabel id="demo-simple-select-outlined-label">
          Função
    </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={inputJobRole}
          onChange={handleChangeFunction}
          label="Função"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={'Frontend Developer'}>Frontend</MenuItem>
          <MenuItem value={'Backend Developer'}>Backend</MenuItem>
          <MenuItem value={'Fullstack Developer'}>
            Fullstack
      </MenuItem>
        </Select>

      </FormControl>

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
          onClick={() => setInputJobRole('')}
          disabled={progressLoad}
        >
          <Clear />
        </IconButton>
      </Tooltip>
    </Form>

  );
};

export default FormJobRole;
