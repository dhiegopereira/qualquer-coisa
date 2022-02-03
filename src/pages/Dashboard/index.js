import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import Copyright from '../../components/Copyright';
import CoursesList from '../../components/CoursesList';
import Reports from '../../components/Reports';
import NameAndPhone from '../../components/NameAndPhone';
import firebase from 'firebase';
import MenuIcons from '../../components/MenuIcons';

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
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  courseList: {
    display: 'flex',
    justifyContent: 'center',

    [theme.breakpoints.down(600 + theme.spacing(2) * 2)]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },

  messageCompletData: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default function Dashboard(props) {
  const classes = useStyles();

  const [history, setHistory] = useState(props.history);
  const [completedData, setCompletedData] = useState(null);

  const changeState = () => {
    setCompletedData(!completedData);
  };

  const validData = async () => {
    const db = firebase.firestore();

    const usersRef = db.collection('users');

    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        usersRef
          .where('uid', '==', user.uid)
          .get()
          .then((querySnapshot) => {
            if (querySnapshot.docs.length > 0) {
              setCompletedData(true);
            } else {
              setCompletedData(false);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  useEffect(() => {
    validData();
    return () => {
      setHistory('');
    };
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />

      <main className={classes.content}>
        {localStorage?.getItem('isRecruiter') === 'true' && <MenuIcons />}
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          {localStorage?.getItem('userType') === 'teacher' && (
            <Grid container spacing={3}>
              <Reports />
            </Grid>
          )}

          {completedData && localStorage?.getItem('userType') === 'student' ? (
            <Grid container spacing={3} className={classes.courseList}>
              <CoursesList buy={false} history={history} />
            </Grid>
          ) : (
            completedData === false && (
              <Grid
                container
                spacing={3}
                className={classes.messageCompletData}
              >
                <h3>Para continuar complete seus dados</h3>
                <NameAndPhone completData={true} changeState={changeState} />
              </Grid>
            )
          )}
        </Container>
        <Box pt={4} style={{ position: 'absolute', bottom: 0, width: '100%' }}>
          <Copyright />
        </Box>
      </main>
    </div>
  );
}
