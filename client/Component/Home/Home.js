import React from 'react';
import { Typography, Grid, } from '@material-ui/core';

import classes from './Home.css';
import Image from '../../assets/images/back-ground.jpg';

const Home = () => (
  <div className={classes.Home}>
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h1" color="primary">Welcome</Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography variant="h4">
          You can
          handle all tasks
        </Typography>
      </Grid>
      <Grid item xs={5} className={classes.ImageGrid}>
        <img src={Image} alt="Problem" />
      </Grid>

    </Grid>
  </div>
);

export default Home;
