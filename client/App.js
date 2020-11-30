import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Router from './Component/Router/Router';
import Navigation from './Component/Navigation/Navigation';
import * as actionTypes from './storage/constant';
import Home from './Component/Home/Home';

const App = ({
  setCurrentUser, setCurrentUserError, isAuthenticated, logOut
}) => {
  useEffect(() => {
    try {
      if (localStorage.jwtToken) {
        const token = localStorage.jwtToken;
        setCurrentUser(token, logOut);
      }
    } catch (error) {
      setCurrentUserError('Unauthorized');
    }
  });
  return (
    <div>
      <Navigation />
      { isAuthenticated ? <Router /> : <Home /> }
    </div>
  );
};

App.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  setCurrentUser: PropTypes.func.isRequired,
  setCurrentUserError: PropTypes.func.isRequired,
  logOut: PropTypes.func.isRequired,
};

const mapStateToProps = ({ userReducer: state }) => ({
  isAuthenticated: state.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch({ type: actionTypes.LOG_OUT }),
  setCurrentUser: token => dispatch({
    type: actionTypes.LOG_IN_SUCCESS,
    payload: { token }
  }),
  setCurrentUserError: message => dispatch({
    type: actionTypes.LOG_IN_FAIL,
    payload: { message }
  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
