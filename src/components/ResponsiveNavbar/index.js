import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import StorefrontIcon from '@material-ui/icons/Storefront';
import firebase from 'firebase';
import React from 'react';
import { Button, Nav, Navbar } from 'react-bootstrap';
import { customizations } from '../../configs/customizations';
import { istAuthenticated, logout } from '../../services/auth';
import { notify } from '../../util/toast';
import { getCart } from '../../util/utils';
import { IconContainerButton, StyledLink } from './styles';

function ResponsiveNavbar(props) {
  const handleLogout = () => {
    logout();
    firebase.auth().signOut();
    notify('Até logo, já estamos com saudades!', 2000, 'info');
    props.history.push('/');
  };

  return (
    <Navbar
      expand="lg"
      style={{ backgroundColor: `${customizations?.primaryColor}` }}
    >
      <StyledLink to="/">
        <Navbar.Brand style={{ color: '#fff' }}>
          <b>{`<JACODE/> XD`}</b>
        </Navbar.Brand>
      </StyledLink>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto"></Nav>
        <IconContainerButton>
          <StyledLink to="/">
            <IconButton
              color="inherit"
              style={{ marginRight: 15, padding: 0, color: '#fff' }}
            >
              <Badge color="secondary">
                <StorefrontIcon />
              </Badge>
              <p style={{ fontSize: 12, margin: 2 }}>Loja</p>
            </IconButton>
          </StyledLink>
          <StyledLink to="/cart">
            <IconButton
              color="inherit"
              style={{ marginRight: 15, padding: 0, color: '#fff' }}
            >
              <Badge
                color="secondary"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '12px',
                }}
              >
                {getCart()?.length} <ShoppingCartIcon />
              </Badge>
              <p style={{ fontSize: 12, margin: 2 }}>Carrinho</p>
            </IconButton>
          </StyledLink>

          {!istAuthenticated() ? (
            <>
              <StyledLink to="/sign-in">
                <Button
                  variant="contained"
                  size="small"
                  style={{
                    backgroundColor: `${customizations?.secondaryColor}`,
                    color: '#fff',
                  }}
                >
                  Login
                </Button>
              </StyledLink>
            </>
          ) : (
            <>
              <StyledLink to="/dashboard">
                <IconButton
                  color="inherit"
                  style={{ marginRight: 15, padding: 0, color: '#fff' }}
                >
                  <Badge color="secondary">
                    <AccountBoxIcon />
                  </Badge>
                  <p style={{ fontSize: 12, margin: 2 }}>Minha Conta</p>
                </IconButton>
              </StyledLink>

              <IconButton
                onClick={handleLogout}
                style={{ margin: 0, padding: 0, color: '#fff' }}
              >
                <Badge color="secondary">
                  <ExitToAppIcon />
                </Badge>
                <p style={{ fontSize: 12, margin: 2 }}>Sair</p>
              </IconButton>
            </>
          )}
        </IconContainerButton>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default ResponsiveNavbar;
