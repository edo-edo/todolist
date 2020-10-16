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
import SigningUpModal from '../UI/Modal/SigningUpModal/SigningUpModal';
import LogInModal from '../UI/Modal/LogInModal/LogInModal';
import SignOut from '../UI/SignOut/SignOut';
import * as actionTypes from '../../storage/constant';
import ForgotPasswordModal from '../UI/Modal/ForgotPasswordModal/ForgotPasswordModal';
import ResetPasswordModal from '../UI/Modal/ResetPasswordModal/ResetPasswordModal';

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
      <SigningUpModal
        open={isSignUpOpen}
        handleClose={() => { setIsSignUpOpen(false); clearError(); }}
        openLogin={() => setIsLogInOpen(true)}
      />
      <LogInModal
        open={isLogInOpen}
        handleClose={() => { setIsLogInOpen(false); clearError(); }}
        openSignUp={() => setIsSignUpOpen(true)}
        openForgotPass={() => setIsForgotPassOpen(true)}
      />
      <ForgotPasswordModal
        open={isForgotPassOpen}
        handleClose={() => { setIsForgotPassOpen(false); clearError(); }}
      />
      <Switch>
        <Route exact path="/auth/reset-password">
          <ResetPasswordModal handleClose={() => history.push('/')} />
        </Route>
      </Switch>
    </div>
  );
};

Navigation.propTypes = {
  user: PropTypes.objectOf(String, String).isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  signUpError: PropTypes.func.isRequired,
  logInError: PropTypes.func.isRequired,
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
