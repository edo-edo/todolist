import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { useLocation, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import {
  Typography,
  Grid,
  Button,
  OutlinedInput,
  InputLabel,
  FormControl,
} from '@material-ui/core/';
import queryString from 'querystring';

import classes from './ResetPassword.css';
import * as actionTypes from '../../../../../storage/constant';

const ForgotPass = ({
  error, clearError, resetPassword, isAuthenticated
}) => {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
    }
    return () => clearError();
  }, [isAuthenticated]);

  const formik = useFormik({
    initialValues: {
      password: '',
      passwordConfirmation: ''
    },
    validationSchema: Yup.object().shape({
      password: Yup.string().required().min(6)
        .matches('[a-zA-Z0-9]', 'password contains at least 1 uppercase letter 1 lowercase letter 1 number'),
      passwordConfirmation: Yup.string().required()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
    }),
    onSubmit: values => {
      const param = queryString.parse(location.search);
      resetPassword(values.password, values.passwordConfirmation, param['?resetToken']);
    },
  });
  return (
    <div className={classes.ForgotPass}>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2} className={classes.MainGrid}>

          <Grid item xs={12}>
            <Typography align="center" component="h6" variant="h5">
              Reset Password
            </Typography>
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

          <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="passwordConfirmation">
                Confirm Password
              </InputLabel>
              <OutlinedInput
                id="passwordConfirmation"
                type="password"
                name="passwordConfirmation"
                labelWidth={130}
                onChange={formik.handleChange}
                value={formik.values.passwordConfirmation}
              />
            </FormControl>
            {formik.touched.passwordConfirmation && formik.errors.passwordConfirmation && (
            <div className={classes.Error}>{formik.errors.passwordConfirmation}</div>
            )}
          </Grid>

          <Grid item xs={5}>
            <Button
              fullWidth
              color="primary"
              type="submit"
              variant="contained"
            >
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

ForgotPass.propTypes = {
  error: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  resetPassword: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired
};

const mapStateToProps = ({ userReducer: state }) => ({
  error: state.resetPassError,
  isAuthenticated: state.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  resetPassword: (password, rePassword, token) => dispatch({
    type: actionTypes.RESET_PASSWORD_START,
    payload: { password, rePassword, token }
  }),
  clearError: () => dispatch({ type: actionTypes.CLEAR_EMAIL_ERROR })
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPass);
