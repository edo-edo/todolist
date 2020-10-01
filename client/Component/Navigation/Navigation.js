import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  AppBar,
  Toolbar,
  Button,
  Grid
} from '@material-ui/core';

import classes from './Navigation.css';
import ModalForSigningUp from '../Ui/ModalForSigningUp/ModalForSigningUp';
import ModalForLogIn from '../Ui/ModalForLogIn/ModalForLogIn';
import SignOut from '../Ui/SignOut/SignOut';
import * as actionTypes from '../../storage/constant';

const Navigation = ({
  user, isAuthenticated, logOut, clearError
}) => {
  const [isLogInOpen, setIsLogInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const history = useHistory();
  return (
    <div className={classes.AppBar}>
      <header>
        <Grid container spacing={3}>
          <AppBar position="static">
            <Toolbar className={classes.Nav}>
              <Grid item xs={3}>
                <Button color="inherit" onClick={() => history.push('/')}>Home</Button>
              </Grid>
              { isAuthenticated && (
                <SignOut firstName={user.firstName} logoutHandler={logOut} />
              )}
              { !isAuthenticated && (
                <Grid item xs={10} className={classes.Toolbar}>
                  <Button color="inherit" onClick={() => setIsLogInOpen(true)}>Log In</Button>
                  <Button color="inherit" onClick={() => setIsSignUpOpen(true)}>Sign up</Button>
                </Grid>
              )}

            </Toolbar>
          </AppBar>
        </Grid>
      </header>
      <ModalForSigningUp
        open={isSignUpOpen}
        handleClose={() => { setIsSignUpOpen(false); clearError(); }}
      />
      <ModalForLogIn
        open={isLogInOpen}
        handleClose={() => { setIsLogInOpen(false); clearError(); }}
      />
    </div>
  );
};

Navigation.propTypes = {
  user: PropTypes.objectOf(String, String).isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  logOut: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired
};

const mapStateToProps = ({ userReducer: state }) => ({
  user: state.user,
  isAuthenticated: state.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch({ type: actionTypes.LOG_OUT }),
  clearError: () => dispatch({ type: actionTypes.CLEAR_ERROR }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
