import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Chip } from '@material-ui/core/';

import GoogleIcon from '../../../assets/icons/google.jpg';

const GoogleButton = ({ link }) => (
  <Chip
    avatar={<Avatar alt="Google" src={GoogleIcon} />}
    label="Google"
    component="a"
    // href={`${process.env.API_URL}/auth/signup/google`}
    href={link}
    clickable
  />
);

GoogleButton.propTypes = {
  link: PropTypes.string.isRequired
};

export default GoogleButton;
