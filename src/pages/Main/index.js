import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Background from '../../assets/background-default.jpg';
import BlogIcon from '../../assets/blog.png';
import DiscordIcon from '../../assets/discord.png';
import CoursesList from '../../components/CoursesList';
import Footer from '../../components/Footer';
import ResponsiveNavbar from '../../components/ResponsiveNavbar';
import { customizations } from '../../configs/customizations';
import { istAuthenticated } from '../../services/auth';

const useStyles = makeStyles((theme) => ({
  icon: {
    width: 50,
    height: 50,
    margin: 10,
    color: '#fff',
    '&:hover': {
      opacity: 0.5,
    },

    [theme.breakpoints.down(600 + theme.spacing(2) * 2)]: {
      width: 35,
      height: 35,
      margin: 5,
    },
  },

  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));

export default function Main(props) {
  const classe = useStyles();
  const [history] = useState(props.history);

  useEffect(() => {
    const script = document.createElement('script');

    script.id = 'jivoChat';
    script.src = '//code.jivosite.com/widget/6Sb49qf6LZ';
    script.async = true;

    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    return () => {
      document.getElementById('jivoChat').remove();
    };
  }, []);

  return (
    <>
      <CssBaseline />
      <ResponsiveNavbar history={props?.history} />

      <main>
        {/* Hero unit */}
        <div
          className={classe.heroContent}
          style={{
            backgroundImage: `url(
              ${Background}
            )`,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
              style={{ color: '#fff', textShadow: '2px 2px #000' }}
            >
              {/* <b>JACODE CURSOS</b> */}
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
              style={{
                color: '#fff',
                textShadow: '2px 2px #000',
                boxShadow: '5px',
              }}
            >
              Bem vindo à <h1>JACODE CURSOS!</h1>
              <br />
              {/* Invista naquilo que mais importa, invista em você! */}
              Fale com o instrutor no telegram e whatsapp <h1>(018) 98172-8104</h1>
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
              style={{
                color: '#fff',
                textShadow: '2px 2px #000',
                boxShadow: '5px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Tooltip title="Facebook">
                <a
                  href="https://www.facebook.com/danieljacode"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FacebookIcon className={classe.icon} />
                </a>
              </Tooltip>
              <Tooltip title="Instagram">
                <a
                  href="https://www.instagram.com/danieldeandradelopes/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <InstagramIcon className={classe.icon} />
                </a>
              </Tooltip>
              <Tooltip title="LinkedIn">
                <a
                  href="https://www.linkedin.com/in/daniel-de-andrade-lopes-5242b4b1/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkedInIcon className={classe.icon} />
                </a>
              </Tooltip>
              <Tooltip title="Discord">
                <a
                  href="https://discord.gg/3Wmcp86"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={DiscordIcon}
                    alt="discord community"
                    className={classe.icon}
                  />
                </a>
              </Tooltip>
              <Tooltip title="Blog">
                <a
                  href="http://blog.jacode.com.br/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={BlogIcon} alt="blog" className={classe.icon} />
                </a>
              </Tooltip>
            </Typography>

            {!istAuthenticated() && (
              <div className={classe.heroButtons}>
                <Grid container spacing={3} justify="center">
                  <Grid item>
                    <Link to="/sign-in" style={{ textDecoration: 'none' }}>
                      <Button
                        size="large"
                        variant="contained"
                        style={{
                          backgroundColor: `${customizations?.primaryColor}`,
                          color: '#fff',
                        }}
                      >
                        Login
                      </Button>
                    </Link>
                  </Grid>

                  <Grid item>
                    <Link to="/sign-up" style={{ textDecoration: 'none' }}>
                      <Button
                        size="large"
                        variant="contained"
                        style={{
                          backgroundColor: `${customizations?.primaryColor}`,
                          color: '#fff',
                        }}
                      >
                        CADASTRO
                      </Button>
                    </Link>
                  </Grid>
                </Grid>
              </div>
            )}
          </Container>
          <Grid
            item
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 20,
            }}
          >
            <Link to="/workers" style={{ textDecoration: 'none' }}>
              <Button
                size="large"
                variant="contained"
                style={{
                  backgroundColor: `${customizations?.secondaryColor}`,
                  color: '#fff',
                }}
              >
                ENCONTRAR PROGRAMADORES
              </Button>
            </Link>
          </Grid>
        </div>
        {/* <h1 style={{ textAlign: "center", color: '#6d6d6d' }}>Nossos Cursos</h1> */}
        <Container className={classe.cardGrid} maxWidth="lg">
          {/* End hero unit */}
          <Grid
            container
            spacing={6}
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            <CoursesList buy={true} history={history} />
          </Grid>
        </Container>
      </main>
      <Footer />
    </>
  );
}
