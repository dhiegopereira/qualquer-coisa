import { Button } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import firebase from 'firebase';
import React, { useEffect, useRef, useState } from 'react';
import Copyright from '../../components/Copyright';
import { customizations } from '../../configs/customizations';
import { notify } from '../../util/toast';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100%',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    display: 'flex',
    justifyContent: 'center',
  },
  table: {
    minWidth: 650,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: '95%',
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    width: '150px',
    height: '150px',
    backgroundColor: '#d5d5d5',
    borderWidth: '5px',
    borderStyle: 'solid',
    borderColor: '#45c',
    cursor: 'pointer',

    '&:hover': {
      opacity: 0.7,
    },
    [theme.breakpoints.down(600 + theme.spacing(2) * 2)]: {
      width: '120px',
      height: '120px',
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  submit: {
    width: '95%',
  },
  contentAll: {
    display: 'flex',
    flexDirection: 'column',
    width: '50%',
    [theme.breakpoints.down(600 + theme.spacing(2) * 2)]: {
      width: '100%',
    },
  },
}));

export default function Profile(props) {
  const classes = useStyles();
  const [inputName, setInputName] = useState('');
  const [inputCellphone, setInputCellphone] = useState('');
  const [inputCity, setInputCity] = useState('');
  const [inputJobRole, setInputJobRole] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [inputConfirmPassword, setInputConfirmPassword] = useState('');
  const [progressLoad, setProgressLoad] = useState(false);
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [inputState, setInputState] = useState('');

  const fileRef = useRef();
  const [recruiterCheck, setRecruiterCheck] = useState(false);
  const [publicProfile, setPublicProfile] = useState(false);

  const handleChangeRecruiter = () => {
    setRecruiterCheck(!recruiterCheck);
  };
  const handleChangePublicProfile = () => {
    setPublicProfile(!publicProfile);
  };

  const loadData = () => {
    setProgressLoad(true);
    const db = firebase.firestore();

    const usersRef = db.collection('users');

    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        usersRef
          .where('uid', '==', user.uid)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              setPreviewImage(doc.data()?.profileImage);
              setInputName(doc.data()?.name || '');
              setInputEmail(doc.data()?.email || '');
              setInputCity(doc.data()?.city || '');
              setInputState(doc.data()?.state || '');
              setInputCellphone(doc.data()?.cellphone || '');
              setInputJobRole(doc.data()?.jobRole || '');
              setRecruiterCheck(doc.data()?.isRecruiter || false);
              setPublicProfile(doc.data()?.publicProfile || false);
              setProgressLoad(false);
            });
          });
      }
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (event) => {
    setInputState(event.target.value);
  };
  const handleChangeFunction = (event) => {
    setInputJobRole(event.target.value);
  };

  const handleChangeAvatar = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];

      if (image) {
        var reader = new FileReader();

        reader.onload = function () {
          setPreviewImage(reader.result);
        };

        reader.readAsDataURL(image);
      }
      setImage(image);
    }
  };

  const redirectToProfile = () => {
    props.history.push(`/public-profile/${inputEmail}`);
  };

  const handleRegister = () => {
    setProgressLoad(true);
    const db = firebase.firestore();

    var userRef = db.collection('users').doc(localStorage.getItem('user'));

    if (
      inputName !== '' &&
      inputCellphone !== '' &&
      inputCity !== '' &&
      inputState !== ''
    ) {
      if (!recruiterCheck) {
        if (inputJobRole == '') {
          notify('Preencha todos os campos!', 1000, 'error');
          setProgressLoad(false);
          return;
        }
      }

      if (inputPassword !== '' && inputConfirmPassword !== '') {
        if (inputPassword === inputConfirmPassword) {
          var user = firebase.auth().currentUser;

          user
            .updatePassword(inputPassword)
            .then(function () {
              // Update successful.
              userRef
                .update({
                  name: inputName,
                  cellphone: inputCellphone,
                  city: inputCity,
                  state: inputState,
                  isRecruiter: recruiterCheck,
                  jobRole: inputJobRole,
                  publicProfile: publicProfile,
                })
                .then(function () {
                  // upload image
                  notify('Dados atualizados com sucesso!', 1000, 'success');

                  setProgressLoad(false);
                  // end upload
                })
                .catch(function (error) {
                  // The document probably doesn't exist.
                  console.error('Error updating document: ', error);
                  notify('Falha ao atualizar os dados!', 1000, 'error');
                  setProgressLoad(false);
                });
            })
            .catch(function (error) {
              // An error happened.
              setProgressLoad(false);
            });
        } else {
          notify('As senhas não conferem!', 1000, 'error');
          setProgressLoad(false);
        }
      } else {
        userRef
          .update({
            name: inputName,
            cellphone: inputCellphone,
            city: inputCity,
            state: inputState,
            isRecruiter: recruiterCheck,
            jobRole: inputJobRole,
            publicProfile: publicProfile,
          })
          .then(function () {
            notify('Dados atualizados com sucesso!', 1000, 'success');
            setProgressLoad(false);
          })
          .catch(function (error) {
            // The document probably doesn't exist.
            setProgressLoad(false);
            console.error('Error updating document: ', error);
            notify('Falha ao atualizar os dados!', 1000, 'error');
          });
      }

      if (image !== null) {
        const storage = firebase.storage();

        const uploadTask = storage
          .ref(
            `profiles/${localStorage.getItem('@jacode-email')}/${image.name}`
          )
          .put(image);
        uploadTask.on(
          'state_changed',
          (snapshot) => {},
          (error) => {
            // Error function ...
            console.log(error);
          },
          () => {
            // complete function ...
            storage
              .ref(`profiles/${localStorage.getItem('@jacode-email')}`)
              .child(image.name)
              .getDownloadURL()
              .then((url) => {
                userRef
                  .update({
                    profileImage: url,
                  })
                  .then(function () {
                    setProgressLoad(false);
                    notify('Imagem atualizada!', 1000, 'success');
                  })
                  .catch(function (error) {
                    // The document probably doesn't exist.
                    setProgressLoad(false);
                    console.error('Error updating document: ', error);
                    notify('Falha ao atualizar os dados!', 1000, 'error');
                  });
              });
          }
        );
      }
    } else {
      notify('Preencha todos os campos!', 1000, 'error');
      setProgressLoad(false);
    }
  };

  return (
    <div className={classes.root}>
      <CssBaseline />

      <main className={classes.content}>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3} className={classes.contentAll}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                margin: 5,
              }}
            >
              {progressLoad ? (
                <Backdrop className={classes.backdrop} open={progressLoad}>
                  <CircularProgress color="inherit" />
                  <p style={{ fontSize: 18, marginLeft: 10 }}>Carregando...</p>
                </Backdrop>
              ) : (
                <>
                  <Avatar
                    className={classes.avatar}
                    src={previewImage}
                    onClick={() => {
                      document.getElementById('file').click();
                    }}
                  ></Avatar>
                  <i style={{ fontSize: 10, marginBottom: 20, marginTop: 10 }}>
                    Clique na imagem para selecionar uma nova foto
                  </i>

                  <input
                    type="file"
                    id="file"
                    onChange={handleChangeAvatar}
                    ref={fileRef}
                    style={{
                      visibility: 'hidden',
                      height: 0,
                      margin: 0,
                      padding: 0,
                    }}
                  />

                  <div>
                    <FormControlLabel
                      style={{ marginTop: 20 }}
                      control={
                        <Checkbox
                          checked={recruiterCheck}
                          onChange={handleChangeRecruiter}
                          name="checkedB"
                          color="primary"
                        />
                      }
                      label="Sou Recrutador"
                    />

                    <FormControlLabel
                      style={{ marginTop: 20 }}
                      control={
                        <Checkbox
                          checked={publicProfile}
                          onChange={handleChangePublicProfile}
                          name="checkedB"
                          color="primary"
                        />
                      }
                      label="Não deixar meu perfil público"
                    />
                  </div>

                  <Button
                    type="button"
                    variant="contained"
                    onClick={redirectToProfile}
                    style={{
                      backgroundColor: `${customizations?.secondaryColor}`,
                      color: '#fff',
                      padding: 10,
                    }}
                    className={classes.submit}
                  >
                    VER MEU PERFIL PÚBLICO
                  </Button>

                  <FormControl
                    variant="outlined"
                    fullWidth
                    className={classes.formControl}
                    style={{ marginTop: 40 }}
                  >
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
                  </FormControl>
                  <FormControl
                    variant="outlined"
                    fullWidth
                    className={classes.formControl}
                  >
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        fullWidth
                        disabled
                        id="email"
                        value={inputEmail}
                        onChange={(event) => setInputEmail(event.target.value)}
                        label="E-mail"
                        name="email"
                        autoComplete="email"
                      />
                    </Grid>
                  </FormControl>

                  <FormControl
                    variant="outlined"
                    fullWidth
                    className={classes.formControl}
                  >
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        fullWidth
                        id="cellphone"
                        value={inputCellphone}
                        onChange={(event) =>
                          setInputCellphone(event.target.value)
                        }
                        label="Celular"
                        name="cellphone"
                        autoComplete="cellphone"
                      />
                    </Grid>
                  </FormControl>
                  <FormControl
                    variant="outlined"
                    fullWidth
                    className={classes.formControl}
                  >
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        fullWidth
                        id="city"
                        value={inputCity}
                        onChange={(event) => setInputCity(event.target.value)}
                        label="Cidade"
                        name="city"
                        autoComplete="city"
                      />
                    </Grid>
                  </FormControl>

                  <FormControl
                    fullWidth
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel id="demo-simple-select-outlined-label">
                      Estado
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={inputState}
                      onChange={handleChange}
                      label="Estado"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={'AC'}>AC</MenuItem>
                      <MenuItem value={'AL'}>AL</MenuItem>
                      <MenuItem value={'AP'}>AP</MenuItem>
                      <MenuItem value={'AM'}>AM</MenuItem>
                      <MenuItem value={'BA'}>BA</MenuItem>
                      <MenuItem value={'CE'}>CE</MenuItem>
                      <MenuItem value={'DF'}>DF</MenuItem>
                      <MenuItem value={'ES'}>ES</MenuItem>
                      <MenuItem value={'GO'}>GO</MenuItem>
                      <MenuItem value={'MA'}>MA</MenuItem>
                      <MenuItem value={'MT'}>MT</MenuItem>
                      <MenuItem value={'MS'}>MS</MenuItem>
                      <MenuItem value={'MG'}>MG</MenuItem>
                      <MenuItem value={'PA'}>PA</MenuItem>
                      <MenuItem value={'PB'}>PB</MenuItem>
                      <MenuItem value={'PR'}>PR</MenuItem>
                      <MenuItem value={'PE'}>PE</MenuItem>
                      <MenuItem value={'PI'}>PI</MenuItem>
                      <MenuItem value={'RJ'}>RJ</MenuItem>
                      <MenuItem value={'RN'}>RN</MenuItem>
                      <MenuItem value={'RS'}>RS</MenuItem>
                      <MenuItem value={'RO'}>RO</MenuItem>
                      <MenuItem value={'RR'}>RR</MenuItem>
                      <MenuItem value={'SC'}>SC</MenuItem>
                      <MenuItem value={'SP'}>SP</MenuItem>
                      <MenuItem value={'SE'}>SE</MenuItem>
                      <MenuItem value={'TO'}>TO</MenuItem>
                    </Select>
                  </FormControl>
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

                  <FormControl
                    variant="outlined"
                    fullWidth
                    className={classes.formControl}
                  >
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        fullWidth
                        name="password"
                        label="Senha"
                        value={inputPassword}
                        onChange={(event) =>
                          setInputPassword(event.target.value)
                        }
                        type="password"
                        id="password"
                        autoComplete="current-password"
                      />
                    </Grid>
                  </FormControl>
                  <FormControl
                    variant="outlined"
                    fullWidth
                    className={classes.formControl}
                  >
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
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
                  </FormControl>

                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: '100%',
                      padding: '0 15px 0 15px',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      onClick={handleRegister}
                      style={{
                        backgroundColor: `${customizations?.secondaryColor}`,
                        color: '#fff',
                        marginRight: 10,
                      }}
                      className={classes.submit}
                    >
                      ATUALIZAR
                    </Button>
                    <Button
                      fullWidth
                      variant="contained"
                      style={{
                        backgroundColor: `${customizations?.primaryColor}`,
                        color: '#fff',
                      }}
                      className={classes.submitRight}
                    >
                      Cancelar
                    </Button>
                  </div>
                </>
              )}
            </div>
          </Grid>
        </Container>
        <Box pt={4} style={{ marginBottom: 10 }}>
          <Copyright />
        </Box>
      </main>
    </div>
  );
}
