import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import firebase from 'firebase';
import React, { useEffect, useRef, useState } from 'react';
import {
  BigPlayButton,
  ControlBar,
  ForwardControl,
  PlaybackRateMenuButton,
  Player,
  ReplayControl,
} from 'video-react';
import Copyright from '../../components/Copyright';
import VisualFeedback from '../../components/VisualFeedback';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    overflow: 'auto',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '80%',
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  table: {
    minWidth: 650,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function WatchClasse(props) {
  const classes = useStyles();

  const [classesData, setClassesData] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [progress, setProgress] = useState(false);
  // const [progressClasse, setProgressClasse] = useState(0);
  const playerRef = useRef();
  // const userId = localStorage.getItem('user');

  const loadData = async () => {
    if (!props.history.location.state) {
      return props.history.push('/dashboard');
    }

    const { idCourse, idClasse } = props.history.location.state;

    // await verifyActualProgress(idCourse, idClasse);

    const db = firebase.firestore();

    const coursesRef = db.collection('courses').doc(idCourse);

    await coursesRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
          setCourseData(doc.data());
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
        }
      })
      .catch(function (error) {
        console.log('Error getting documents: ', error);
      });

    const classesRef = db
      .collection(`courses/${idCourse}/classes`)
      .orderBy('id');

    await classesRef
      .get()
      .then((querySnapshot) => {
        const classes = [];
        const links = [];
        querySnapshot.forEach((doc) => {
          if (doc.data().id === idClasse) {
            classes.push(doc.data());
            links.push(doc.data().links);
          }
        });
        setClassesData(classes);
        // setLinksData(links);
        setProgress(false);
      })
      .catch(function (error) {
        console.log('Error getting documents: ', error);
      });
  };

  const goBack = () => {
    props.history.goBack();
  };

  // const verifyActualProgress = async (idCourse, idClasse) => {
  //   const db = firebase.firestore();

  //   const progressRef = db.collection('progress');

  //   await progressRef
  //     .where('userId', '==', userId)
  //     .where('courseId', '==', idCourse)
  //     .where('classeId', '==', idClasse)
  //     .get()
  //     .then((querySnapshot) => {
  //       querySnapshot.forEach((doc) => {
  //         const { currentTime } = doc.data();
  //         setProgressClasse(currentTime);
  //       });
  //     })
  //     .catch(function (error) {
  //       console.log('Error getting documents: ', error);
  //     });
  // };

  // const saveProgress = () => {
  //   const { currentTime } = playerRef.current.video.video;

  //   const cloudFirestore = firebase.firestore();

  //   console.log(courseData);
  //   console.log(classesData);
  //   console.log(currentTime);

  //   const courseId = courseData.id;
  //   const classeId = classesData[0].id;

  //   cloudFirestore
  //     .collection('progress')
  //     .add({
  //       courseId,
  //       userId,
  //       classeId,
  //       currentTime,
  //       id: '',
  //     })
  //     .then(function (doc) {
  //       cloudFirestore.collection('progress').doc(doc.id).update({
  //         id: doc.id,
  //       });
  //     })
  //     .catch(function (error) {
  //       console.error('Error adding domcument', error);
  //     });
  // };

  // const goTo = (time) => {
  //   const { seek } = playerRef.current.actions;
  //   console.log(time);

  //   seek(time);
  // };

  // useEffect(() => {
  //   goTo(progressClasse);
  // }, [progressClasse]);

  useEffect(() => {
    async function fetchData() {
      setProgress(true);
      await loadData();
    }

    fetchData();

    return () => {
      // saveProgress();
      setClassesData([]);
    };

    //eslint-disable-next-line
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div>
        <div className={classes.appBarSpacer} />
      </div>

      <div className={classes.root}>
        <CssBaseline />

        {classesData.map((classe) => (
          <main className={classes.content} key={classe.id}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
              <Grid container spacing={3}>
                <Backdrop className={classes.backdrop} open={progress}>
                  <CircularProgress color="inherit" />
                  <p style={{ fontSize: 18, marginLeft: 10 }}>Carregando...</p>
                </Backdrop>

                {!progress ? (
                  <>
                    <FormControl
                      variant="outlined"
                      fullWidth
                      className={classes.formControl}
                    >
                      <Grid container spacing={2}>
                        <h2
                          style={{
                            marginLeft: '11%',
                            marginTop: 20,
                            color: '#7a7171',
                            cursor: 'pointer',
                          }}
                          onClick={() => goBack()}
                        >
                          {courseData.name}
                        </h2>
                        <Grid
                          item
                          xs={12}
                          style={{
                            marginTop: 0,
                            marginBottom: 10,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}
                        >
                          <h4
                            style={{
                              padding: 0,
                              margin: '0 0 0 10%',
                              cursor: 'pointer',
                            }}
                          >
                            {classe.position + '- ' + classe.title}
                          </h4>
                        </Grid>
                      </Grid>
                    </FormControl>
                    <FormControl
                      variant="outlined"
                      fullWidth
                      className={classes.formControl}
                    >
                      <Grid container spacing={2}>
                        <Grid
                          item
                          xs={12}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {classesData.map((classe) =>
                            classe.url_video != '' ? (
                              <Player
                                key={classe.id}
                                src={classe.url_video}
                                playsInline
                                fluid={false}
                                width={800}
                                poster=""
                                ref={playerRef}
                              >
                                <ControlBar autoHide={false}>
                                  <PlaybackRateMenuButton
                                    rates={[5, 2, 1, 0.5, 0.1]}
                                  />
                                  <ReplayControl seconds={30} order={2.3} />
                                  <ForwardControl seconds={30} order={3.3} />
                                </ControlBar>
                                <BigPlayButton position="center" />
                              </Player>
                            ) : (
                              <VisualFeedback
                                key={classe.id}
                                style={{
                                  marginTop: '30px',
                                  marginBottom: '50px',
                                }}
                                description={
                                  'Essa aula não possui vídeo, apenas texto!'
                                }
                                subDescription={
                                  'Leia o artigo e/ou a descrição (esse será o conteúdo dessa aula)'
                                }
                              />
                            )
                          )}
                        </Grid>
                        {/* <Button onClick={() => saveProgress()}>Save</Button>
                        <Button onClick={() => goTo(progressClasse)}>
                          goto
                        </Button> */}
                        <p style={{ marginLeft: '11%' }}>
                          <b>Descrição: </b>
                          {classe.description}
                        </p>
                        {/* <p style={{ marginLeft: '11%' }}>
                          <b>Links: </b>
                          {console.log(linksData)}
                          {linksData.map((link) => (
                            <a href={link.name} key={link.name}>
                              {link.name}
                            </a>
                          ))}
                        </p> */}
                      </Grid>
                    </FormControl>
                  </>
                ) : (
                  ''
                )}
              </Grid>
            </Container>
            {!progress && (
              <Box pt={4} style={{ marginBottom: 15 }}>
                <Copyright />
              </Box>
            )}
          </main>
        ))}
      </div>
    </div>
  );
}
