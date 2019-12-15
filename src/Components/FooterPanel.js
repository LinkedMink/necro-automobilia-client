import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  footerBox: {
    padding: 0,
  },
});

class FooterPanel extends React.Component {
  render() {
    return (
      <Box pt={4} className={this.props.classes.footerBox}>
        <Typography variant="body1" color="textSecondary" align="center">
          {'Copyright © '}
          <Link color="inherit" href="#">
            Harlan Sang
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Box>
    );
  }
}

export default withStyles(styles)(FooterPanel);
