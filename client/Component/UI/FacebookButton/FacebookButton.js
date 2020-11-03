import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Chip } from '@material-ui/core/';

import FacebookIcon from '../../../assets/icons/facebook.jpg';

const FacebookButton = ({ link }) => (
  <Chip
    avatar={<Avatar alt="Facebook" src={FacebookIcon} />}
    label="Facebook"
    component="a"
    href={link}
    clickable
  />
);

FacebookButton.propTypes = {
  link: PropTypes.string.isRequired
};

export default FacebookButton;
