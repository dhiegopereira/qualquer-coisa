import Badge from '@material-ui/core/Badge';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import StorefrontIcon from '@material-ui/icons/Storefront';
import firebase from 'firebase';
import React, { useEffect, useState } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { notify } from '../../util/toast';
import Menu from '../../components/Menu';
import { logout } from '../../services/auth';
import {
  Container,
  IconContainerButton,
  Name,
  StyledIconButton,
  StyledForm,
} from './styles';
import { Link } from 'react-router-dom';
import { customizations } from '../../configs/customizations';

export default function NavBarDashboard(props) {
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
      setuserData(false);
    };
  }, []);

  const handleLogout = () => {
    logout();
    firebase.auth().signOut();
    localStorage.clear();
    notify('Até logo, já estamos com saudades!', 2000, 'info');
    props.history.push('/');
  };

  const redirectToShop = () => {
    props.history.push('/');
  };

  const redirectToCart = () => {
    props.history.push('/cart');
  };

  return (
    <Navbar
      expand="lg"
      style={{ backgroundColor: `${customizations?.secondaryColor}` }}
    >
      <Menu history={props.history} />
      <Link to="/dashboard">
        <Navbar.Brand style={{ color: '#fff' }}>
          <b>{`<JACODE/> XD`}</b>
        </Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto"></Nav>
        <StyledForm inline>
          <Container>
            <Name>
              <b>Bem vindo:</b> {userData.name}
            </Name>
            <IconContainerButton>
              <StyledIconButton color="inherit" onClick={redirectToShop}>
                <Badge color="secondary">
                  <StorefrontIcon />
                </Badge>
                <p style={{ fontSize: 12, margin: 2 }}>Voltar para Loja</p>
              </StyledIconButton>
              <StyledIconButton color="inherit" onClick={redirectToCart}>
                <Badge color="secondary">
                  <ShoppingCartIcon />
                </Badge>
                <p style={{ fontSize: 12, margin: 2 }}>Carrinho</p>
              </StyledIconButton>
              <StyledIconButton color="inherit" onClick={handleLogout}>
                <Badge color="secondary">
                  <ExitToAppIcon />
                </Badge>
                <p style={{ fontSize: 12, margin: 2 }}>Sair</p>
              </StyledIconButton>
            </IconContainerButton>
          </Container>
        </StyledForm>
      </Navbar.Collapse>
    </Navbar>
  );
}
