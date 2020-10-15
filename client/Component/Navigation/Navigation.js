import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import queryString from 'querystring';
import {
  useHistory,
  Route,
  Switch,
} from 'react-router-dom';
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
import ModalForForgotPass from '../Ui/ModalForForgotPass/ModalForForgotPass';
import ModalForResetPass from '../Ui/ModalForResetPass/ModalForResetPass';

const Navigation = ({
  user, isAuthenticated, logOut, clearError, signUpError, logInError
}) => {
  const [isLogInOpen, setIsLogInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isForgotPassOpen, setIsForgotPassOpen] = useState(false);

  const history = useHistory();

  useEffect(() => {
    const param = queryString.parse(history.location.search);
    if (param['?token']) {
      localStorage.setItem('jwtToken', `Bearer ${param['?token']}`);
      history.push('/');
    }
    if (param['?logInError']) {
      logInError(param['?logInError']);
      setIsLogInOpen(true);
    }
    if (param['?signUpError']) {
      signUpError(param['?signUpError']);
      setIsSignUpOpen(true);
    }
  }, []);

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
        openLogin={() => setIsLogInOpen(true)}
      />
      <ModalForLogIn
        open={isLogInOpen}
        handleClose={() => { setIsLogInOpen(false); clearError(); }}
        openSignUp={() => setIsSignUpOpen(true)}
        openForgotPass={() => setIsForgotPassOpen(true)}
      />
      <ModalForForgotPass
        open={isForgotPassOpen}
        handleClose={() => { setIsForgotPassOpen(false); clearError(); }}
      />
      <Switch>
        <Route exact path="/auth/reset-password">
          <ModalForResetPass handleClose={() => history.push('/')} />
        </Route>
      </Switch>
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
  signUpError: error => dispatch({ type: actionTypes.SIGN_UP_FAIL, payload: { message: error } }),
  logInError: error => dispatch({ type: actionTypes.LOG_IN_FAIL, payload: { message: error } })
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
