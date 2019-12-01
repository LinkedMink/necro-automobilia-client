import React from 'react';
import { Redirect, Link as RouterLink } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/List';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class SetPasswordScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      password: "",
      confirmPassword: "",
    };
  }

  getLinkReference = (path) => {
    return React.forwardRef((props, ref) => (
      <RouterLink innerRef={ref} to={path} {...props} />
    ));
  }

  handleChange = (event) => {
    this.setState({[event.target.id]: event.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.props.login) {
      this.props.login(this.state)
    }
  }

  render() {
    if (this.props.isLoggedIn) {
      return <Redirect to='/' />
    }

    return (
      <Container maxWidth="md">
        <Paper className={this.props.classes.paper}>
          <Typography variant="h5" component="h1">
            Reset Password
          </Typography>
          <form className={this.props.classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password" />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword" />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={this.props.classes.submit}>
              Reset Password
            </Button>
            <Grid container>
              <Grid item>
                <Link component={this.getLinkReference("/login")} variant="body2">
                  {"Already know your password? Login"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    );
  }
}

export default withStyles(styles)(SetPasswordScreen);
