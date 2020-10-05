import React from 'react';
import { Button, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import classes from './SignOut.css';

const SignOut = ({ firstName, logoutHandler }) => (
  <Grid item xs={10} className={classes.SignOut}>
    <Button color="inherit">
      Welcome
      {` ${firstName}`}
    </Button>
    <Button color="inherit" onClick={logoutHandler}>Sign Out </Button>
  </Grid>
);

SignOut.propTypes = {
  firstName: PropTypes.string.isRequired,
  logoutHandler: PropTypes.func.isRequired
};

export default SignOut;
