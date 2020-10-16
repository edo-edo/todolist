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
  FormControl,
} from '@material-ui/core/';

import classes from './ForgotPassword.css';
import * as actionTypes from '../../../../../storage/constant';

const ForgotPass = ({
  error, isEmail, addEmail, clearError, loading
}) => {
  useEffect(() => () => clearError(), []);

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
    }),
    onSubmit: values => {
      addEmail(values.email);
    },
  });
  if (isEmail) {
    return (
      <Typography>Please check your E-mail!</Typography>
    );
  }
  return (
    <div className={classes.ForgotPass}>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2} className={classes.MainGrid}>

          <Grid item xs={12}>
            <Typography align="center" component="h6" variant="h5">
              {' '}
              First, let
              {'\''}
              s find your account
            </Typography>
          </Grid>
          {
        loading && (
          <Grid item xs={12}>
            <Typography className={classes.Loading} align="center" component="h6" variant="h6">
              Sending...
            </Typography>
          </Grid>
        )
      }
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
          <Grid item xs={5}>
            <Button
              fullWidth
              color="primary"
              type="submit"
              variant="contained"
              disabled={loading}
            >
              Found
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

ForgotPass.propTypes = {
  error: PropTypes.string.isRequired,
  isEmail: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  addEmail: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired
};

const mapStateToProps = ({ userReducer: state }) => ({
  error: state.emailError,
  isEmail: state.isEmail,
  loading: state.loading
});

const mapDispatchToProps = dispatch => ({
  addEmail: email => dispatch({ type: actionTypes.FOUND_EMAIL_START, payload: { email } }),
  clearError: () => dispatch({ type: actionTypes.CLEAR_EMAIL_ERROR })
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPass);
