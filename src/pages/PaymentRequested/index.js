import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import React, { useState, useEffect } from 'react';
import Copyright from '../../components/Copyright';
import firebase from 'firebase';
import moment from 'moment';

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
    display: 'flex',
    justifyContent: 'center',
  },
  table: {
    minWidth: 650,
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
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function PaymentRequested(props) {
  const classes = useStyles();
  const [allPaymentsRequested, setAllPaymentsRequested] = useState([]);
  const [progress, setProgress] = useState(false);

  const [state] = React.useState({
    columns: [
      { title: 'Data', field: 'createdAt' },
      { title: 'Preço total', field: 'totalPrice' },
    ],
    data: allPaymentsRequested,
  });

  const loadPaymentsRequested = () => {
    setProgress(true);

    async function fetchData() {
      const db = firebase.firestore();

      const paymentsRef = db.collection('paymentsRequested').orderBy('id');

      await paymentsRef
        .where('userId', '==', `${localStorage.getItem('user')}`)
        .get()
        .then((querySnapshot) => {
          const payments = [];
          querySnapshot.forEach((doc) => {
            const { createdAt, totalPrice } = doc.data();

            const date = moment
              .unix(createdAt)
              .locale('pt-br')
              .format('DD/MM/YYYY');

            const paymentObject = {
              createdAt: date !== 'Invalid date' ? date : 'Data não informada',
              totalPrice,
            };
            payments.push(paymentObject);
          });

          setAllPaymentsRequested(payments);
          setProgress(false);
        })
        .catch(function (error) {
          console.log('Error getting documents: ', error);
        });
    }

    fetchData();
  };

  useEffect(() => {
    loadPaymentsRequested();

    return () => {
      setAllPaymentsRequested('');
    };
  }, []);

  return (
    <div className={classes.root}>
      {progress && (
        <Backdrop className={classes.backdrop} open={progress}>
          <CircularProgress color="inherit" />
          <p style={{ fontSize: 18, marginLeft: 10 }}>Carregando...</p>
        </Backdrop>
      )}

      <CssBaseline />

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />

        <Container
          maxWidth="lg"
          className={classes.container}
          style={{ height: '80%' }}
        >
          <Grid
            container
            spacing={3}
            style={{
              display: 'flex',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <MaterialTable
              title="Histórico de pedidos"
              columns={state.columns}
              style={{ width: '80%' }}
              data={allPaymentsRequested}
              editable={{}}
            />
          </Grid>
        </Container>
        <Box pt={4}>
          <Copyright />
        </Box>
      </main>
    </div>
  );
}
