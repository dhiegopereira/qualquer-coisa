import { Button } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import firebase from 'firebase';
import JoditEditor from 'jodit-react';
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
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%', // Fix IE 11 issue.
    alignItems: 'center',
    marginTop: theme.spacing(3),
  },
  submitLeft: {
    margin: theme.spacing(3, 0, 2),
    marginRight: 10,
    width: '70%',
  },
  submitRight: {
    margin: theme.spacing(3, 0, 2),
    marginLeft: 10,
    width: '30%',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function CreateCourse(props) {
  const classes = useStyles();
  const [image, setImage] = useState(null);

  const [progress, setProgress] = useState(false);

  const editorRequirement = useRef(null);
  const [requirements, setRequirements] = useState('Aqui vão os requisitos');

  const editorDescription = useRef(null);
  const [description, setDescription] = useState('Aqui vai a descrição');

  const name = useRef(null);
  const [inputName, setInputName] = useState('');

  const duration = useRef(null);
  const [inputDuration, setInputDuration] = useState('');

  const price = useRef(null);
  const [inputPrice, setInputPrice] = useState('');

  const shortDescription = useRef(null);
  const [inputShortDescription, setInputShortDescription] = useState('');
  const payment = useRef(null);
  const [inputCodePayment, setInputCodePayment] = useState('');
  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
  };

  useEffect(() => {
    loadDataCourse();
    //eslint-disable-next-line
  }, []);

  const handleChangeImageCourse = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      setImage(image);
    }
  };

  const loadDataCourse = () => {
    async function fetchData() {
      if (props.history.location.state) {
        setProgress(true);
        const db = firebase.firestore();

        const coursesRef = db
          .collection('courses')
          .doc(`${props.history.location.state.id}`);

        await coursesRef
          .get()
          .then(function (doc) {
            if (doc.exists) {
              setInputName(doc.data().name);
              setInputDuration(doc.data().duration);
              setInputPrice(doc.data().price);
              setInputCodePayment(doc.data().codePayment);
              setInputShortDescription(doc.data().shortDescription);
              setDescription(doc.data().description);
              setRequirements(doc.data().requirements);
              setProgress(false);
            } else {
              // doc.data() will be undefined in this case
              console.log('No such document!');
            }
          })
          .catch(function (error) {
            console.log('Error getting documents: ', error);
          });
      }
    }
    fetchData();
    setProgress(false);
  };

  const extensionsPermitted = ['png', 'jpg', 'jpeg'];

  const handleEditCourse = () => {
    if (
      inputName !== '' &&
      inputDuration !== '' &&
      inputPrice !== '' &&
      inputCodePayment !== '' &&
      inputShortDescription !== '' &&
      description !== '' &&
      requirements !== ''
    ) {
      if (image !== null) {
        const extension = image.name.split('.').pop();

        if (extensionsPermitted.includes(extension)) {
          const storage = firebase.storage();

          setProgress(true);

          const uploadTask = storage
            .ref(`images_courses/${image.name}`)
            .put(image);
          uploadTask.on(
            'state_changed',
            (snapshot) => { },
            (error) => {
              // Error function ...
              console.log(error);
            },
            () => {
              // complete function ...
              storage
                .ref('images_courses')
                .child(image.name)
                .getDownloadURL()
                .then((url) => {
                  addedInfoCollectionCourse(url, false);
                });
            }
          );
        } else {
          notify('Esse tipo de arquivo não é permitido!', 1000, 'error');
        }
      } else {
        addedInfoCollectionCourse('', false);
      }
    } else {
      notify('Preencha todos os campos!', 1000, 'error');
    }
  };

  const addedInfoCollectionCourse = (url, clear) => {
    const cloudFirestore = firebase.firestore();

    let date = new Date();

    let payload = {
      author: localStorage.getItem('user'),
      name: inputName,
      background:
        'https://firebasestorage.googleapis.com/v0/b/jacode-cursos.appspot.com/o/generic%2Fbackground-default.jpg?alt=media&token=95d180a0-9d96-4b87-9d6c-344d25e8c0f0',
      description,
      duration: inputDuration,
      price: inputPrice,
      requirements,
      shortDescription: inputShortDescription,
      codePayment: inputCodePayment,
      createdAt: date,
      enable: true,
      id: '',
    };

    if (url !== '') {
      payload = { ...payload, image: url };
    }

    cloudFirestore
      .collection('courses')
      .doc(`${props.history.location.state.id}`)
      .update(payload)
      .then(() => {
        setProgress(false);
        if (clear) {
          handleClear();
        } else {
          loadDataCourse();
        }
        notify('Curso atualizado com sucesso!', 1000, 'success');
      })
      .catch(function (error) {
        console.error('Error adding domcument', error);
        notify('Falha ao atualizar o curso!', 1000, 'error');
      });
  };

  const handleRegister = () => {
    if (image !== null) {
      const extension = image.name.split('.').pop();

      if (extensionsPermitted.includes(extension)) {
        if (
          inputName !== '' &&
          inputDuration !== '' &&
          inputPrice !== '' &&
          inputCodePayment !== '' &&
          inputShortDescription !== '' &&
          description !== '' &&
          requirements !== ''
        ) {
          const storage = firebase.storage();

          setProgress(true);

          const uploadTask = storage
            .ref(`images_courses/${image.name}`)
            .put(image);
          uploadTask.on(
            'state_changed',
            (snapshot) => { },
            (error) => {
              // Error function ...
              console.log(error);
            },
            () => {
              // complete function ...
              storage
                .ref('images_courses')
                .child(image.name)
                .getDownloadURL()
                .then((url) => {
                  addedInfoCollectionCourse(url, true);
                });
            }
          );
        } else {
          notify('Preencha todos os campos!', 1000, 'error');
        }
      } else {
        notify('Esse tipo de arquivo não é permitido!', 1000, 'error');
      }
    } else {
      notify('Selecione um arquivo para enviar!', 1000, 'error');
    }
  };

  const handleClear = () => {
    setDescription('');
    setInputName('');
    setInputDuration('');
    setInputPrice('');
    setInputCodePayment('');
    setInputShortDescription('');
    setRequirements('');
  };

  return (
    <div className={classes.root}>
      {progress && (
        <Backdrop className={classes.backdrop} open={progress}>
          <CircularProgress color="inherit" />
          <p style={{ fontSize: 18, marginLeft: 10 }}>Carregando...</p>
        </Backdrop>
      )}
      <CssBaseline />

      <div>
        <div className={classes.appBarSpacer} />
      </div>

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3} style={{ width: '70%' }}>
            <form className={classes.form}>
              <FormControl
                variant="outlined"
                fullWidth
                className={classes.formControl}
                style={{ margin: 10 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} style={{ textAlign: 'center' }}>
                    <h1>
                      {props.history.location.state
                        ? 'Editando curso'
                        : 'Criar Cursos'}
                    </h1>
                  </Grid>
                </Grid>
              </FormControl>

              <FormControl
                variant="outlined"
                fullWidth
                className={classes.formControl}
                style={{ margin: 10 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="fname"
                      name="fullName"
                      variant="outlined"
                      required
                      fullWidth
                      id="fullName"
                      ref={name}
                      value={inputName}
                      onBlur={(newContent) => setInputName(newContent)}
                      label="Nome do Curso"
                      autoFocus
                    />
                  </Grid>
                </Grid>
              </FormControl>
              <FormControl
                variant="outlined"
                fullWidth
                className={classes.formControl}
                style={{ margin: 10 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="fduration"
                      name="duration"
                      variant="outlined"
                      required
                      fullWidth
                      id="duration"
                      type="number"
                      value={inputDuration}
                      ref={duration}
                      onBlur={(newContent) => setInputDuration(newContent)}
                      label="Duração em horas"
                    />
                  </Grid>
                </Grid>
              </FormControl>

              <FormControl
                variant="outlined"
                fullWidth
                className={classes.formControl}
                style={{ margin: 10 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="fprice"
                      name="price"
                      variant="outlined"
                      required
                      fullWidth
                      type="number"
                      id="price"
                      ref={price}
                      value={inputPrice}
                      onBlur={(newContent) => setInputPrice(newContent)}
                      label="Preço"
                    />
                  </Grid>
                </Grid>
              </FormControl>

              <Grid container spacing={2}>
                <FormControl
                  variant="outlined"
                  fullWidth
                  className={classes.formControl}
                  style={{ margin: 10 }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        autoComplete="fshortDescription"
                        name="shortDescription"
                        variant="outlined"
                        required
                        fullWidth
                        id="shortDescription"
                        ref={shortDescription}
                        value={inputShortDescription}
                        onBlur={(newContent) =>
                          setInputShortDescription(newContent)
                        }
                        label="Descrição Curta"
                      />
                    </Grid>
                  </Grid>
                </FormControl>

                <FormControl
                  variant="outlined"
                  fullWidth
                  className={classes.formControl}
                  style={{ margin: 10 }}
                >
                  <Grid item xs={12}>
                    <JoditEditor
                      ref={editorDescription}
                      value={description}
                      config={config}
                      tabIndex={1} // tabIndex of textarea
                      onBlur={(newContent) => setDescription(newContent)} // preferred to use only this option to update the content for performance reasons
                      onChange={(newContent) => { }}
                    />
                  </Grid>
                </FormControl>

                <FormControl
                  variant="outlined"
                  fullWidth
                  className={classes.formControl}
                  style={{ margin: 10 }}
                >
                  <Grid item xs={12}>
                    <JoditEditor
                      ref={editorRequirement}
                      value={requirements}
                      config={config}
                      tabIndex={1} // tabIndex of textarea
                      onBlur={(newContent) => setRequirements(newContent)} // preferred to use only this option to update the content for performance reasons
                      onChange={(newContent) => { }}
                    />
                  </Grid>
                </FormControl>

                <Grid container spacing={2}>
                  <FormControl
                    variant="outlined"
                    fullWidth
                    className={classes.formControl}
                    style={{
                      display: 'flex',
                      borderWidth: '1px',
                      borderColor: '#c6b3b3',
                      borderStyle: 'solid',
                      borderRadius: 4,
                      margin: 15,
                      padding: 5,
                    }}
                  >
                    <Grid item xs={12}>
                      <p style={{ marginLeft: 10 }}>Imagem do Curso</p>
                      <div style={{ margin: '10px 10px 20px 10px' }}>
                        <input type="file" onChange={handleChangeImageCourse} />
                      </div>
                    </Grid>
                  </FormControl>
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
                  <p style={{ margin: 10 }}>Enviando...</p>
                </div>
              ) : (
                  <div style={{ display: 'flex', width: '100%' }}>
                    <Button
                      fullWidth
                      variant="contained"
                      disabled={!!progress}
                      style={{
                        backgroundColor: `${customizations?.secondaryColor}`,
                        color: '#fff',
                      }}
                      onClick={
                        props.history.location.state
                          ? handleEditCourse
                          : handleRegister
                      }
                      className={classes.submitLeft}
                    >
                      CADASTRAR
                  </Button>
                    <Button
                      fullWidth
                      variant="contained"
                      style={{
                        backgroundColor: `${customizations?.primaryColor}`,
                        color: '#fff',
                      }}
                      onClick={handleClear}
                      className={classes.submitRight}
                    >
                      LIMPAR
                  </Button>
                  </div>
                )}
            </form>
          </Grid>
        </Container>
        <Box pt={4}>
          <Copyright />
        </Box>
      </main>
    </div>
  );
}
