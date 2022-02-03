import Button from '@material-ui/core/Button';
import Step from '@material-ui/core/Step';
import StepConnector from '@material-ui/core/StepConnector';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import EmailAndPassword from '../../components/EmailAndPassword';
import NameAndPhone from '../../components/NameAndPhone';
import ResponsiveNavbar from '../../components/ResponsiveNavbar';
import SignInComponent from '../../components/SignInComponent';

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(199, 177, 206) 0%,rgb(169, 124, 183) 50%,rgba(126,64,144,0.9))',
    },
  },
  completed: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(199, 177, 206) 0%,rgb(169, 124, 183) 50%,rgba(126,64,144,0.9))',
    },
  },
  line: {
    height: 2,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundImage:
      'linear-gradient( 95deg,rgb(199, 177, 206) 0%,rgb(169, 124, 183) 50%,rgba(126,64,144,0.9))',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completed: {
    backgroundImage:
      'linear-gradient( 95deg,rgb(199, 177, 206) 0%,rgb(169, 124, 183) 50%,rgba(126,64,144,0.9))',
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <ContactMailIcon />,
    2: <ContactPhoneIcon />,
    3: <EmojiEmotionsIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
  icon: PropTypes.node,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return [
    'Informe e senha...',
    '... só falta nome e telefone',
    'Faça o login!',
  ];
}

export default function SignUpSteps(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  function getStepContent(step, props) {
    switch (step) {
      case 0:
        return <EmailAndPassword props={props} handleNext={handleNext} />;
      case 1:
        return (
          <NameAndPhone
            props={props}
            handleNext={handleNext}
            completData={false}
          />
        );
      case 2:
        return <SignInComponent props={props} />;
      default:
        return 'Unknown step';
    }
  }

  const handleNext = (step) => {
    setActiveStep(step);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <ResponsiveNavbar history={props?.history} />
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Limpar
            </Button>
          </div>
        ) : (
          <div>
            <div className={classes.instructions}>
              {getStepContent(activeStep, props)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
