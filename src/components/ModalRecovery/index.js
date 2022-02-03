import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import firebase from 'firebase';
import { notify } from '../../util/toast';

export default function ModalRecovery({ open, handleClose }) {
  const [email, setEmail] = useState('');

  const recoveryPassword = () => {
    var auth = firebase.auth();

    auth
      .sendPasswordResetEmail(email)
      .then(function () {
        notify('E-mail enviado com sucesso!', 1000, 'success');
        handleClose();
        setEmail('');
      })
      .catch(function (error) {
        notify(
          'Falha ao enviar e-mail, contate o administrador!',
          1000,
          'error'
        );
        handleClose();
      });
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Recuperação de senha</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Insira o seu e-mail cadastrado na plataforma, após clicar no botão
            'recuperar' você receberá um e-mail para redefinição de senha!
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email"
            type="email"
            fullWidth
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => recoveryPassword()} color="primary">
            Recuperar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
