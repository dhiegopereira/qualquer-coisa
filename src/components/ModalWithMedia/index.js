import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import React, { useRef } from 'react';
import { BigPlayButton, ControlBar, Player } from 'video-react';
import { customizations } from '../../configs/customizations';

const useStyles = makeStyles((theme) => ({
  appBar: {
    marginBottom: '20px',
    position: 'relative',
    backgroundColor: `${customizations?.primaryColor}`,
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  icon: {
    color: '#fff',
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalWithMedia({ open, handleClose, url, title }) {
  const classes = useStyles();

  const playerRef = useRef();

  if (open) {
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={() => {}}>
          Open full-screen dialog
        </Button>
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <AppBar className={classes.appBar}>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="primary"
                  onClick={handleClose}
                  aria-label="close"
                >
                  <CloseIcon className={classes.icon} />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                  Essa aula é gratuita - {title}
                </Typography>
                <Button autoFocus color="inherit" onClick={handleClose}>
                  Fechar
                </Button>
              </Toolbar>
            </AppBar>
            <Player
              key={url}
              src={url}
              playsInline
              fluid={false}
              width={800}
              height={450}
              ref={playerRef}
            >
              <ControlBar autoHide={false}></ControlBar>
              <BigPlayButton position="center" />
            </Player>
          </div>
        </Dialog>
      </div>
    );
  } else {
    return <></>;
  }
}
