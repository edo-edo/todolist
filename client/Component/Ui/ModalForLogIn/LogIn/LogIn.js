import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Typography,
  Grid,
  Button,
  OutlinedInput,
  InputLabel,
  FormControl
} from '@material-ui/core/';

import classes from './LogIn.css';
import * as actionTypes from '../../../../storage/constant';

const LogIn = ({
  checkUser, error, handleClose, clearError, authError, openSignUp
}) => {
  useEffect(() => {
    if (authError) {
      clearError();
      handleClose();
    }
  }, [authError, error]);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
    }),
    onSubmit: values => {
      checkUser(values);
    },
  });

  return (
    <div className={classes.LogIn}>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={4} className={classes.MainGrid}>

          <Grid item xs={12}>
            <Typography align="center" component="h6" variant="h5">Log In</Typography>
          </Grid>
          {
        error.length !== 0 && (
          <Grid item xs={12}>
            <Typography className={classes.Error} align="center" component="h6" variant="h6">
              {error}
            </Typography>
          </Grid>
        )
      }

          <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="email">
                E-mail
              </InputLabel>
              <OutlinedInput
                id="email"
                labelWidth={70}
                name="email"
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
                name="password"
                labelWidth={70}
                onChange={formik.handleChange}
                value={formik.values.password}
              />
            </FormControl>
            {formik.touched.password && formik.errors.password && (
            <div className={classes.Error}>{formik.errors.password}</div>
            )}
          </Grid>

          <Grid item xs={3} className={classes.LogInCustom}>
            <Button
              type="submit"
              variant="contained"
            >
              Log In
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button
              onClick={() => { handleClose(); openSignUp(); }}
              variant="contained"
              color="primary"
            >
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

LogIn.propTypes = {
  error: PropTypes.string.isRequired,
  authError: PropTypes.bool.isRequired,
  checkUser: PropTypes.func.isRequired,
  openSignUp: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired

};

const mapStateToProps = ({ userReducer: state }) => ({
  error: state.logInError,
  authError: state.authError
});

const mapDispatchToProps = dispatch => ({
  checkUser: date => dispatch({ type: actionTypes.LOG_IN_START, payload: { date } }),
  clearError: () => dispatch({ type: actionTypes.CLEAR_ERROR }),
});

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
