import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import AccountBox from '@material-ui/icons/AccountBox';
import AddToQueue from '@material-ui/icons/AddToQueue';
import CardMembership from '@material-ui/icons/CardMembership';
import FormatListNumbered from '@material-ui/icons/FormatListNumbered';
import Functions from '@material-ui/icons/Functions';
import MenuIcon from '@material-ui/icons/Menu';
import PanoramaIcon from '@material-ui/icons/Panorama';
import School from '@material-ui/icons/School';
import clsx from 'clsx';
import firebase from 'firebase';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  items: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: '#707070',

    '&:hover': {
      color: '#707070',
      textDecoration: 'none',
    },
  },
});

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [userData, setuserData] = useState([]);

  useEffect(() => {
    const db = firebase.firestore();

    const usersRef = db.collection('users');

    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        usersRef
          .where('uid', '==', user.uid)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              setuserData(doc.data());
            });
          });
      }
    });
  }, []);

  useEffect(() => {
    return () => {
      setuserData('');
    };
  }, []);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {userData.userType === 'student' && (
        <>
          <List>
            {['Perfil', 'Meus Pedidos'].map((text, index) => (
              <Link
                to={
                  index === 0 ? '/profile' : index === 1 && 'payment-requested'
                }
                className={classes.items}
                key={index}
              >
                <ListItem button key={text}>
                  <ListItemIcon>
                    {index === 0 ? <AccountBox /> : <FormatListNumbered />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              </Link>
            ))}
          </List>
          <Divider />
          <List>
            {['Meus Cursos'].map((text, index) => (
              <Link
                to={
                  index === 0 ? '/dashboard' : index === 1 && 'my-certificates'
                }
                className={classes.items}
                key={index}
              >
                <ListItem button key={text}>
                  <ListItemIcon>
                    <ListItemIcon>
                      {index === 0 ? (
                        <PanoramaIcon />
                      ) : (
                        index === 1 && <CardMembership />
                      )}
                    </ListItemIcon>
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              </Link>
            ))}
          </List>
        </>
      )}

      {userData.userType === 'teacher' && (
        <>
          <List>
            {['Criar Curso', 'Cursos'].map((text, index) => (
              <Link
                to={
                  index === 0
                    ? '/create-course'
                    : index === 1 && '/list-my-courses'
                }
                className={classes.items}
                key={index}
              >
                <ListItem button key={text}>
                  <ListItemIcon>
                    {index === 0 ? (
                      <AddToQueue />
                    ) : (
                      index === 1 && <FormatListNumbered />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              </Link>
            ))}
          </List>
          <Divider />
          <List>
            {['Alunos'].map((text, index) => (
              <Link
                to={index === 0 && '/list-my-students'}
                className={classes.items}
                key={index}
              >
                <ListItem button key={text}>
                  <ListItemIcon>
                    <ListItemIcon>
                      {index === 0 ? (
                        <PanoramaIcon />
                      ) : (
                        index === 1 && <School />
                      )}
                    </ListItemIcon>
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              </Link>
            ))}
          </List>
        </>
      )}

      {userData.userType === 'admin' && (
        <>
          <List>
            {['Organizações', 'Configurações'].map((text, index) => (
              <ListItem button key={text}>
                <Link
                  to={
                    index === 0 ? '/organizations' : index === 1 && '/settings'
                  }
                  className={classes.items}
                >
                  <ListItemIcon>
                    {index === 0 ? <Functions /> : index === 1 && <School />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </Link>
              </ListItem>
            ))}
          </List>
        </>
      )}
    </div>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            <MenuIcon style={{ color: '#fff' }} />
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
