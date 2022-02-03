import Links from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import React from 'react';

export default function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Links
        color="inherit"
        target="_blank"
        href="https://www.linkedin.com/in/daniel-de-andrade-lopes-5242b4b1/"
      >
        by Daniel Lopes
      </Links>{' '}
      {new Date().getFullYear()}
    </Typography>
  );
}
