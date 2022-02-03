import { Box, CssBaseline, Grid, IconButton, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import React, { useEffect, useState } from 'react';
import LoadingImage from '../../assets/loading.gif';
import ConfirmDialog from '../../components/ConfirmDialog';
import Copyright from '../../components/Copyright';
import ResponsiveNavbar from '../../components/ResponsiveNavbar';
import VisualFeedback from '../../components/VisualFeedback';
import { customizations } from '../../configs/customizations';
import { format } from '../../util/format';
import { clearCart, getCart, removeItemToCart } from '../../util/utils';
import {
  Body,
  Checkout,
  ContainerDescritption,
  ContainerInformation,
  ContainerPrice,
  InternalContainer,
  Main,
  SpaceBar,
  StyledBadge,
  StyledButton,
  StyledContainer,
  StyledFormControl,
  StyledGrid,
  StyledImage,
  StyledItem,
} from './styles';

const useStyles = makeStyles((theme) => ({
  appBarSpacer: {
    height: '30px',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function Cart(props) {
  useStyles();

  const [coursesData, setCoursesData] = useState(getCart() || []);
  const [totalPrice, setTotalPrice] = useState(0);
  const [open, setOpen] = useState(false);
  const [removeItem, setRemoveItem] = useState(null);
  const [render, setRender] = useState(true);
  const [title, setTitle] = useState('');
  const [titleButton, setTitleButton] = useState('');

  useEffect(() => {
    if (render) {
      let total = 0;
      coursesData.forEach((course) => {
        total = parseFloat(course?.price) + total;
      });
      setTotalPrice(total);
      setRender(false);

      if (total <= 0) {
        setTimeout(() => props.history.push('/'), 1000);
      }
    }
    //eslint-disable-next-line
  }, [render]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemoveItem = (course) => {
    setOpen(true);
    setRemoveItem(course);
    setTitle(`Remover ${course.name} do carrinho?`);
    setTitleButton('Remover');
  };

  const handleClearCart = () => {
    setOpen(true);
    setTitle('Esvaziar o carrinho?');
    setTitleButton('Esvaziar');
  };

  const confirmClearCart = () => {
    handleClose();
    setRender(true);
    if (removeItem) {
      removeItemToCart(removeItem);
      setRemoveItem(false);
    } else {
      clearCart();
      setTimeout(() => props.history.push('/'), 1000);
    }
    setCoursesData(getCart() || []);
  };

  const completeBuy = () => {
    props.history.push('/checkout');
  };

  return (
    <StyledContainer>
      <CssBaseline />
      <ResponsiveNavbar history={props?.history} />
      <SpaceBar />
      <Body>
        <Main>
          {coursesData?.length === 0 && (
            <VisualFeedback
              description="seu carrinho está vazio!"
              subDescription="volte para a loja e veja nossas opções!"
            />
          )}
          {coursesData.map((course) => (
            <InternalContainer maxWidth="lg" key={course.id}>
              <StyledGrid container spacing={3}>
                <StyledFormControl variant="outlined" fullWidth>
                  <Grid container spacing={2}>
                    <StyledGrid
                      item
                      xs={12}
                      style={{ justifyContent: 'space-between' }}
                    >
                      <ContainerDescritption>
                        <StyledImage
                          src={course.image || LoadingImage}
                          alt="course"
                        />
                        <StyledItem>
                          <p>{course.name}</p>
                          <p>{course.duration} Horas</p>
                        </StyledItem>
                      </ContainerDescritption>
                      <ContainerPrice>
                        <Tooltip title="Retirar do carrinho" placement="bottom">
                          <IconButton
                            aria-label="delete"
                            onClick={() => handleRemoveItem(course)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>

                        <StyledBadge>
                          {format(course.price)}
                          <LoyaltyIcon style={{ marginTop: 10 }} />
                        </StyledBadge>
                      </ContainerPrice>
                    </StyledGrid>
                  </Grid>
                </StyledFormControl>
              </StyledGrid>
            </InternalContainer>
          ))}
        </Main>
        <Checkout>
          <h5 style={{ width: '100%', marginTop: '20px' }}>Resumo do pedido</h5>
          <ContainerInformation>
            <h6>{coursesData?.length} </h6>
            <h6>Curso (s) adicionado(s) </h6>
          </ContainerInformation>
          <hr
            style={{
              border: 1,
              borderColor: '#d5d5d5',
              borderStyle: 'solid',
              width: '100%',
            }}
          />
          <ContainerInformation>
            <h6>Total: </h6>
            <h1>{format(totalPrice)}</h1>
          </ContainerInformation>
          <StyledButton
            fullWidth
            variant="contained"
            onClick={() => completeBuy()}
            style={{ backgroundColor: `${customizations?.secondaryColor}` }}
          >
            Finalizar a compra
          </StyledButton>

          <StyledButton
            fullWidth
            variant="contained"
            color="secondary"
            onClick={() => handleClearCart()}
          >
            Esvaziar carrinho
          </StyledButton>
        </Checkout>
      </Body>
      <Box pt={4}>
        <Copyright />
      </Box>

      <ConfirmDialog
        open={open}
        handleClose={handleClose}
        title={title}
        confirm={confirmClearCart}
        titleButton={titleButton}
      />
    </StyledContainer>
  );
}
