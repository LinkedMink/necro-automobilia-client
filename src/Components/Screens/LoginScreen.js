import React from 'react';
import { Redirect, Link as RouterLink } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/List';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
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

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  getLinkReference = (path) => {
    return React.forwardRef((props, ref) => (
      <RouterLink innerRef={ref} to={path} {...props} />
    ));
  }

  handleChange(event) {
    this.setState({[event.target.id]: event.target.value});
  }

  handleSubmit(event) {
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
      <Paper className={this.props.classes.paper}>
        <Typography variant="h5" component="h1">
          Login
        </Typography>
        <form className={this.props.classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password" />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me" />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={this.props.classes.submit}>
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link component={this.getLinkReference("/password-reset")} variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link component={this.getLinkReference("/register")} variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </Paper>
    );
  }
}

export default withStyles(styles)(LoginScreen);
