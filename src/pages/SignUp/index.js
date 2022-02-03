import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import firebase from 'firebase';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { notify } from '../../util/toast';
import Copyright from '../../components/Copyright';
import { customizations } from '../../configs/customizations';

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

export default function SignUp(props) {
  const classes = useStyles();
  const [inputName, setInputName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputCellphone, setInputCellphone] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [inputConfirmPassword, setInputConfirmPassword] = useState('');
  const [progress, setProgress] = useState(false);

  const handleRegister = async (event) => {
    event.preventDefault();

    let date = new Date();

    setProgress(true);

    const name = inputName;

    if (
      inputName.trim() !== '' &&
      inputEmail.trim() !== '' &&
      inputPassword !== '' &&
      inputConfirmPassword !== '' &&
      inputCellphone !== ''
    ) {
      if (inputPassword === inputConfirmPassword) {
        await firebase
          .auth()
          .createUserWithEmailAndPassword(inputEmail.trim(), inputPassword)
          .then(function (success) {
            const cloudFirestore = firebase.firestore();

            cloudFirestore
              .collection('users')
              .add({
                name,
                email: success.user.email,
                cellphone: inputCellphone,
                uid: success.user.uid,
                userType: 'student',
                createdAt: date,
                id: '',
              })
              .then(function (docRef) {
                cloudFirestore.collection('users').doc(`${docRef.id}`).update({
                  id: docRef.id,
                }).then(() => {
                  notify('Parabéns!', 1000, 'success');
                  props.history.push('/sign-in');
                  setProgress(false);
                }).catch((error) => {
                  console.error('Error adding domcument', error);
                  notify('Falha no seu cadastro!', 1000, 'error');

                })
                  ;

              })
              .catch(function (error) {
                console.error('Error adding domcument', error);
                notify('Falha no seu cadastro!', 1000, 'error');
              });
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
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Cadastre-se
        </Typography>
        <form className={classes.form} onSubmit={handleRegister}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="fullName"
                variant="outlined"
                required
                fullWidth
                id="fullName"
                value={inputName}
                onChange={(event) => setInputName(event.target.value)}
                label="Nome Completo"
                autoFocus
              />
            </Grid>
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
                id="cellphone"
                value={inputCellphone}
                onChange={(event) => setInputCellphone(event.target.value)}
                label="Celular"
                name="cellphone"
                autoComplete="cellphone"
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
                Cadastrar
              </Button>
            )}
          <Grid container justify="flex-end">
            <Grid item xs>
              <Link to="/">Voltar para o início</Link>
            </Grid>
            <Grid item>
              <Link to="/sign-in">Já tem cadastro? Faça login!</Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5} style={{ marginBottom: 20 }}>
        <Copyright />
      </Box>
    </Container>
  );
}
