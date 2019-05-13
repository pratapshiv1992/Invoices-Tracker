import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root:{
    margin:"auto"
    },
  link: {
    margin: theme.spacing.unit,
  },
});

const linkedin = 'https://www.linkedin.com/in/pratapshiv1992/';
const github =   'https://github.com/pratapshiv1992/';
const repo =   'https://github.com/pratapshiv1992/Invoices-Tracker';

function AboutDeveloper(props) {
  const { classes } = props;

  return (
      <div className={classes.link}>
    <Typography>
      <Link href={linkedin} className={classes.link} block underline='always' _blank >
      Linkedin
      </Link>
      <Link href={github}  className={classes.link}>
      Github
      </Link>
    </Typography>
    <Typography>
        Fork this repository if you like it.
        <Link href={repo}  className={classes.link}>Click here</Link>
    </Typography>
    </div>
  );
}

AboutDeveloper.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AboutDeveloper);
