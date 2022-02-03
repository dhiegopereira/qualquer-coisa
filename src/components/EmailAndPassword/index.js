import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import firebase from 'firebase';
import React, { useState } from 'react';
import { customizations } from '../../configs/customizations';
import { notify } from '../../util/toast';

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function EmailAndPassword({ handleNext }) {
  const classes = useStyles();
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [inputConfirmPassword, setInputConfirmPassword] = useState('');
  const [progress, setProgress] = useState(false);

  const handleRegister = async (event) => {
    event.preventDefault();

    setProgress(true);

    if (
      inputEmail.trim() !== '' &&
      inputPassword !== '' &&
      inputConfirmPassword !== ''
    ) {
      if (inputPassword === inputConfirmPassword) {
        await firebase
          .auth()
          .createUserWithEmailAndPassword(inputEmail.trim(), inputPassword)
          .then((success) => {
            localStorage.setItem('register-email', inputEmail.trim());
            localStorage.setItem('register-uid', success.user.uid);
            setProgress(false);
            handleNext(1);
          })
          .catch(function (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            setProgress(false);
            console.log(errorCode, errorMessage);
            notify(error.message, 1000, 'error');
          });
      } else {
        notify('As senhas digitadas são diferentes!', 1000, 'error');
        setProgress(false);
      }
    } else {
      notify('Preencha todos os campos!', 1000, 'error');
      setProgress(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <form className={classes.form} onSubmit={handleRegister}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                value={inputEmail}
                onChange={(event) => setInputEmail(event.target.value)}
                label="E-mail"
                name="email"
                autoComplete="email"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Senha"
                value={inputPassword}
                onChange={(event) => setInputPassword(event.target.value)}
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirm-password"
                label="Confirmação de senha"
                type="password"
                value={inputConfirmPassword}
                onChange={(event) =>
                  setInputConfirmPassword(event.target.value)
                }
                id="confirm-password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          {progress ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'center',
                padding: 20,
              }}
            >
              <CircularProgress />
              <p style={{ margin: 10 }}>Aguarde...</p>
            </div>
          ) : (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{
                backgroundColor: `${customizations?.primaryColor}`,
                color: '#fff',
              }}
              className={classes.submit}
            >
              OBTER MEU ACESSO
            </Button>
          )}
        </form>
      </div>
    </Container>
  );
}
