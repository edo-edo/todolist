import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
import PropTypes from 'prop-types';

import Router from './Component/Router/Router';
import Navigation from './Component/Navigation/Navigation';
import * as actionTypes from './storage/constant';
import setAuthToken from './storage/token/setAuthToken';

const App = ({ setCurrentUser, isAuthenticated }) => {
  useEffect(() => {
    try {
      if (localStorage.jwtToken) {
        const token = localStorage.getItem('jwtToken');
        const decoded = jwtDecode(token);
        setAuthToken(token);
        setCurrentUser(true, decoded.user);
      }
    } catch (error) {
      setCurrentUser(false, {});
    }
  });
  return (
    <div>
      <Navigation />
      { isAuthenticated && <Router /> }
    </div>
  );
};

App.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  setCurrentUser: PropTypes.func.isRequired
};

const mapStateToProps = ({ userReducer: state }) => ({
  isAuthenticated: state.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: (AuthStatus, user) => dispatch({
    type: actionTypes.SET_CURRENT_USER,
    payload: { AuthStatus, user }
  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
