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
  checkUser, error, handleClose, clearError
}) => {
  useEffect(() => {
    if (error === 'done') {
      clearError();
      handleClose();
    }
  }, [error]);
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
      <Grid container spacing={4} className={classes.MainGrid}>

        <Grid item xs={12}>
          <Typography align="center" component="h6" variant="h5">Log In</Typography>
        </Grid>
        {
        error.length !== 0 && error !== 'done' && (
        <div className={classes.Error}>
          {error}
        </div>
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

        <Grid item xs={12}>
          <Button
            onClick={formik.handleSubmit}
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Log In
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

LogIn.propTypes = {
  error: PropTypes.string.isRequired,
  checkUser: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired

};

const mapStateToProps = ({ userReducer: state }) => ({
  error: state.logInError,
});

const mapDispatchToProps = dispatch => ({
  checkUser: date => dispatch({ type: actionTypes.LOG_IN_START, payload: { date } }),
  clearError: () => dispatch({ type: actionTypes.CLEAR_ERROR }),
});

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
