import React from 'react';
import Copyright from '../Copyright';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '150px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginTop: '150px',
    bottom: -10,
    right: 0,
    left: 0,
    backgroundColor: '#ceccce',
    opacity: '0.9',
  },
  middle: {
    display: 'flex',
    width: '100%',
    padding: '0px 50px 0px 50px',
    alignItems: 'center',
    justifyContent: 'space-between',

    [theme.breakpoints.down(600 + theme.spacing(2) * 2)]: {
      flexDirection: 'column',
      justifyContent: 'center',
    },
  },
  contact: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  organization: {
    margin: 0,
    fontSize: '18px',
    fontWeight: 'bold',
    [theme.breakpoints.down(600 + theme.spacing(2) * 2)]: {
      marginTop: 10,
      fontSize: '14px',
    },
  },
  title: {
    margin: 0,
    fontWeight: 'bold',
    [theme.breakpoints.down(600 + theme.spacing(2) * 2)]: {
      marginTop: 10,
      fontSize: '14px',
    },
  },
  subTitle: {
    margin: 0,
    [theme.breakpoints.down(600 + theme.spacing(2) * 2)]: {
      textAlign: 'center',
      fontSize: '12px',
    },
  },
}));

function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.middle}>
        <Link
          to="/"
          style={{ textDecoration: 'none', color: 'rgba(0, 0, 0, 0.87)' }}
        >
          <div>
            <h3 className={classes.organization}>{`<JACODE/> XD`}</h3>
          </div>
        </Link>
        <div>
          <Copyright />
        </div>
        <div className={classes.contact}>
          <h3 className={classes.title}>CONTATO</h3>
          <p className={classes.subTitle}>
            <b>Email: </b> danieldeandradelopes@gmail.com
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
