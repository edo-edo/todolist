import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import {
  TextField,
  Typography,
  Grid,
  Button,
  OutlinedInput,
  InputLabel,
  FormControl,
} from '@material-ui/core/';

import classes from './SigningUp.css';
import * as actionTypes from '../../../../../storage/constant';
import GoogleButton from '../../../GoogleButton/GoogleButton';
import FacebookButton from '../../../FacebookButton/FacebookButton';

const SigningUp = ({
  addUser, handleClose, clearError, error, authError, openLogin
}) => {
  const history = useHistory();

  useEffect(() => {
    if (authError) {
      handleClose();
    }
    const path = history.location.pathname;

    return () => { clearError(); history.push(path); };
  }, [authError]);
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string()
        .min(1)
        .max(13)
        .required(),
      lastName: Yup.string()
        .min(5)
        .max(50)
        .required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6)
        .max(30)
        .matches('[a-zA-Z0-9]', 'password contains at least 1 uppercase letter 1 lowercase letter 1 number')
    }),
    onSubmit: values => {
      addUser(values);
    },
  });
  return (
    <div className={classes.SigningUp}>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2} className={classes.MainGrid}>

          <Grid item xs={12}>
            <Typography align="center" component="h6" variant="h5">Sign Up</Typography>
            {
        error.length !== 0 && error && (
          <Grid item xs={12}>
            <Typography className={classes.Error} align="center" component="h6" variant="h6">
              {error}
            </Typography>
          </Grid>
        )
      }
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="firstName"
              label="First name"
              variant="outlined"
              onChange={formik.handleChange}
              value={formik.values.firstName}
            />
            {formik.touched.firstName && formik.errors.firstName && (
            <div className={classes.Error}>{formik.errors.firstName}</div>
            )}
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="lastName"
              label="Last name"
              variant="outlined"
              onChange={formik.handleChange}
              value={formik.values.lastName}
            />
            {formik.touched.lastName && formik.errors.lastName && (
            <div className={classes.Error}>{formik.errors.lastName}</div>
            )}
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="email">
                E-mail
              </InputLabel>
              <OutlinedInput
                id="email"
                labelWidth={45}
                onChange={formik.handleChange}
                value={formik.values.email}
              />
            </FormControl>
            {formik.touched.email && formik.errors.email && (
            <div className={classes.Error}>{formik.errors.email}</div>
            )}
          </Grid>

          <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="password">
                Password
              </InputLabel>
              <OutlinedInput
                id="password"
                type="password"
                labelWidth={70}
                onChange={formik.handleChange}
                value={formik.values.password}
              />
            </FormControl>
            {formik.touched.password && formik.errors.password && (
            <div className={classes.Error}>{formik.errors.password}</div>
            )}
          </Grid>

          <Grid item xs={4}>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
            >
              Sign Up
            </Button>
          </Grid>

          <Grid item xs={3}>
            <GoogleButton link="/api/auth/signup/google" />
          </Grid>

          <Grid item xs={3}>
            <FacebookButton link="/api/auth/signup/facebook" />
          </Grid>
          <Grid item xs={12} className={classes.LogIn}>

            <Button
              onClick={() => { openLogin(); handleClose(); }}
              variant="contained"
            >
              Log In
            </Button>

          </Grid>
        </Grid>
      </form>
    </div>
  );
};

SigningUp.propTypes = {
  error: PropTypes.string.isRequired,
  authError: PropTypes.bool.isRequired,
  addUser: PropTypes.func.isRequired,
  openLogin: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired
};

const mapStateToProps = ({ userReducer: state }) => ({
  error: state.signUpError,
  authError: state.authError
});

const mapDispatchToProps = dispatch => ({
  addUser: user => dispatch({ type: actionTypes.SIGN_UP_START, payload: { user } }),
  clearError: () => dispatch({ type: actionTypes.CLEAR_ERROR }),
});

export default connect(mapStateToProps, mapDispatchToProps)(SigningUp);
